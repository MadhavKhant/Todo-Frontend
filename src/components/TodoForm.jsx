import { useState, useEffect } from "react";

export default function TodoForm({ onSubmit, editData, cancelEdit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: false,
  });

  
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        status: editData.status === "Completed",
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: false,
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      status: form.status ? "Completed" : "Pending",
    });

    setForm({
      title: "",
      description: "",
      status: false,
    });
  };

  return (
    <div className="relative">
      {/* Glow background */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full"></div>

      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-xl bg-white/80 border border-gray-200 shadow-xl rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
          <h2 className="text-lg font-semibold tracking-wide">
            {editData ? "Edit Task" : "Create New Task"}
          </h2>
          <p className="text-sm opacity-90">
            {editData
              ? "Update your task details"
              : "Add a new task to your list"}
          </p>
        </div>

        {/* Form body */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Task Title
            </label>
            <input
              required
              placeholder="Enter task title..."
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Write something about this task..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Task Status
              </p>
              <p className="text-xs text-gray-500">
                Mark as completed if finished
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({ ...form, status: !form.status })
              }
              className={`relative w-14 h-7 rounded-full transition ${
                form.status ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                  form.status ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium shadow hover:shadow-lg hover:scale-[1.02] transition"
            >
              {editData ? "Update Task" : "Add Task"}
            </button>

            {editData && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}