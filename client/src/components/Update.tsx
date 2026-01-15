import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, updateTask } from "../api/axios";
import type { Task, UpdateTaskData } from "../api/axios";

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // load existing task
  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await getTasks();
        const task = res.data.find((t: Task) => t._id === id);

        if (!task) {
          alert("Task not found");
          navigate("/");
          return;
        }

        setTitle(task.title);
        setCompleted(task.completed);
      } catch (err) {
        alert("Failed to load task");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: UpdateTaskData = {
      title,
      completed,
    };

    try {
      await updateTask(id!, data);
      navigate("/");
    } catch (err) {
      alert("Failed to update task");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading task...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Update Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 accent-indigo-600"
            />
            Completed
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg 
                       hover:bg-indigo-700 transition"
          >
            Update Task
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

export default Update;
