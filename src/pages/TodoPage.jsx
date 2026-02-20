import { useState, useEffect } from "react";
import {
  addTodoService,
  editTodoService,
  deleteTodoService,
} from "../services/todoService";

import { getTodayReportService } from "../services/reportService";

import DeleteModal from "../components/DeleteModal";
import TodoList from "../components/todoList";
import TodoForm from "../components/todoForm";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch todos on reload
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const report = await getTodayReportService();

        // combine pending + completed
        const combinedTodos = [
          ...report.pendingTasks,
          ...report.completedTasks,
        ];

        setTodos(combinedTodos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        const updated = await editTodoService({
          id: editData._id,
          ...data,
        });

        setTodos((prev) =>
          prev.map((t) => (t._id === editData._id ? updated : t))
        );

        setEditData(null);
      } else {
        const newTodo = await addTodoService(data);
        setTodos((prev) => [newTodo, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteTodoService(deleteId);

      setTodos((prev) => prev.filter((t) => t._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="p-6">Loading todos...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Todo Manager</h1>

      <TodoForm
        onSubmit={handleSubmit}
        editData={editData}
        cancelEdit={() => setEditData(null)}
      />

      <TodoList
        todos={todos}
        onEdit={setEditData}
        onDelete={(id) => setDeleteId(id)}
      />

      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}