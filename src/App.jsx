import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import ReportPage from "./pages/ReportPage";

export default function App() {
  return (
    <>
      <div className="p-4 flex gap-6 border-b">
        <Link to="/" className="font-semibold">
          Todos
        </Link>
        <Link to="/report" className="font-semibold">
          Reports
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </>
  );
}
