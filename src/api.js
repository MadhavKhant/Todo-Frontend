
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const TODO_API = {
    ADD_TODO: `${BACKEND_URL}/todo/addTodo`,
    EDIT_TODO: `${BACKEND_URL}/todo/editTodo`,
    DELETE_TODO: `${BACKEND_URL}/todo/deleteTodo`,
}

export const REPORT_API = {
    GET_TODAY_REPORT: `${BACKEND_URL}/report/getTodayReport`,
    GET_STORED_REPORT: `${BACKEND_URL}/report/getStoredReport`,
}