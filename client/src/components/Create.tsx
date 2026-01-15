import { useState } from "react";
import { createTask } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);
      await createTask({ title });
      navigate("/");
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Create Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition
              ${loading 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="block w-full text-center text-sm text-gray-500 mt-4 hover:underline"
        >
          ← Back to Tasks
        </button>

      </div>
    </div>
  );
};

export default Create;
