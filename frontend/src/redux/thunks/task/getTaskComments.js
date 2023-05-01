import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getTaskComments = createAsyncThunk("task/getTaskComments", async ({taskid}) => {
  const response = await axios.get(`http://localhost:8000/api/taskcomment/getTaskComments/${taskid}`);
  return response.data;
});