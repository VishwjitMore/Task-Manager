import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/axios";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // delete task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks(); // refresh list
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // UI states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Task Manager
          </h1>

          <a
            href="/tasks"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Add Task
          </a>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">
              No tasks found
            </p>
          )}

          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {task.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Status: {task.completed ? "Completed" : "Pending"}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`/tasks/${task._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tasks;
