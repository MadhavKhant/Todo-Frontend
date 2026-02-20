import axios from "axios";
import { TODO_API } from "../api";

// Add Todo
export const addTodoService = async (data) => {
  try {
    const res = await axios.post(TODO_API.ADD_TODO, data);
    return res.data.todo;
  } catch (error) {
    console.error("Add Todo Error:", error);
    throw error;
  }
};

// Edit Todo
export const editTodoService = async ({ id, ...data }) => {
  try {
    const res = await axios.put(`${TODO_API.EDIT_TODO}/${id}`, data);
    return res.data.updatedTodo;
  } catch (error) {
    console.error("Edit Todo Error:", error);
    throw error;
  }
};

// Delete Todo
export const deleteTodoService = async (id) => {
  try {
    const res = await axios.delete(`${TODO_API.DELETE_TODO}/${id}`);
    return res.data.deletedTodo;
  } catch (error) {
    console.error("Delete Todo Error:", error);
    throw error;
  }
};