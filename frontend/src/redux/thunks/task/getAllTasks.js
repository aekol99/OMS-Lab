import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllTasks = createAsyncThunk("task/getAllTasks", async ({projectid, boardid}) => {
  const response = await axios.get(`http://localhost:8000/api/task/getAllTasks/${projectid}/${boardid}`);
  return response.data;
});