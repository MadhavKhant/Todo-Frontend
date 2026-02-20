import axios from "axios";
import { REPORT_API } from "../api";

// Get today's live report
export const getTodayReportService = async () => {
  try {
    const res = await axios.get(REPORT_API.GET_TODAY_REPORT);
    return res.data;
  } catch (error) {
    console.error("Today Report Error:", error);
    throw error;
  }
};

// Get stored report by date
export const getStoredReportService = async (date) => {
  try {
    const res = await axios.get(
      `${REPORT_API.GET_STORED_REPORT}?date=${date}`
    );
    return res.data;
  } catch (error) {
    console.error("Stored Report Error:", error);
    throw error;
  }
};