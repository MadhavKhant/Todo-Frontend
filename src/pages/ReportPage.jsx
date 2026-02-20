import { useEffect, useState } from "react";
import {
  getTodayReportService,
  getStoredReportService,
} from "../services/reportService";

export default function ReportPage() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);

        let data;

        if (date === today) {
          data = await getTodayReportService();
        } else {
          data = await getStoredReportService(date);
        }

        setReport(data);
      } catch (err) {
        console.error(err);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [date, today]);

  const isReportEmpty =
    report &&
    (report.totalTasks === 0 ||
      ((report.completedTasks?.length || 0) === 0 &&
        (report.pendingTasks?.length || 0) === 0));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Daily Report</h1>

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
      />

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading report...</p>
      )}

      {/* Empty Report */}
      {!loading && (!report || isReportEmpty) && (
        <div className="bg-gray-100 text-gray-600 p-4 rounded">
          Report not found for this date.
        </div>
      )}

      {/* Report Data */}
      {report && !isReportEmpty && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded p-4 text-center">
              <p className="text-gray-500 text-sm">Total</p>
              <p className="text-xl font-bold">
                {report.totalTasks}
              </p>
            </div>

            <div className="bg-green-50 shadow rounded p-4 text-center">
              <p className="text-green-600 text-sm">Completed</p>
              <p className="text-xl font-bold">
                {report.completedCount}
              </p>
            </div>

            <div className="bg-yellow-50 shadow rounded p-4 text-center">
              <p className="text-yellow-600 text-sm">Pending</p>
              <p className="text-xl font-bold">
                {report.pendingCount}
              </p>
            </div>

            <div className="bg-blue-50 shadow rounded p-4 text-center">
              <p className="text-blue-600 text-sm">Completion</p>
              <p className="text-xl font-bold">
                {report.completionPercentage}%
              </p>
            </div>
          </div>

          {/* Completed Tasks */}
          <div>
            <h2 className="text-lg font-semibold text-green-600 mb-3">
              Completed Tasks
            </h2>

            {report.completedTasks?.length === 0 ? (
              <p className="text-gray-400">
                No completed tasks
              </p>
            ) : (
              <div className="space-y-2">
                {report.completedTasks.map((task, index) => (
                  <div
                    key={task._id || task.taskId || index}
                    className="border rounded p-3 bg-green-50"
                  >
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Tasks */}
          <div>
            <h2 className="text-lg font-semibold text-yellow-600 mb-3">
              Pending Tasks
            </h2>

            {report.pendingTasks?.length === 0 ? (
              <p className="text-gray-400">
                No pending tasks
              </p>
            ) : (
              <div className="space-y-2">
                {report.pendingTasks.map((task, index) => (
                  <div
                    key={task._id || task.taskId || index}
                    className="border rounded p-3 bg-yellow-50"
                  >
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}