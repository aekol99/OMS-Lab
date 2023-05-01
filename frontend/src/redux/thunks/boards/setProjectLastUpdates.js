import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const setProjectLastUpdates = createAsyncThunk("boards/setProjectLastUpdates", async ({ userid, projectid, taskTab, board }) => {
  const response = await axios.put(`http://localhost:8000/api/boards/setProjectLastUpdates`, { userid, projectid, taskTab, board });
  return response.data;
});