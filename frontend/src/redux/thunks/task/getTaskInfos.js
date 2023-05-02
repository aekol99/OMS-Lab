import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getTaskInfos = createAsyncThunk("task/getTaskInfos", async ({taskid}) => {
  const response = await axios.get(`http://localhost:8000/api/task/getTaskInfos/${taskid}`);
  return response.data;
});