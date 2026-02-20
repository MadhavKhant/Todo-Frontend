export default function TodoList({ todos, onEdit, onDelete }) {
  if (!todos.length) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow">
        <p className="text-gray-400 text-lg">No tasks yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Add your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {todos.map((todo) => {
        const isCompleted = todo.status === "Completed";

        return (
          <div
            key={todo._id}
            className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${
              isCompleted ? "border-green-500" : "border-yellow-500"
            }`}
          >
            <div className="p-5 flex justify-between items-start gap-4">
              {/* Left Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {todo.title}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {todo.status}
                  </span>
                </div>

                {todo.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {todo.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 opacity-80 group-hover:opacity-100 transition">
                <button
                  onClick={() => onEdit(todo)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(todo._id)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* subtle hover glow */}
            <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-transparent group-hover:ring-gray-200 transition"></div>
          </div>
        );
      })}
    </div>
  );
}