import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteTask = createAsyncThunk("task/deleteTask", async ({ taskid }) => {
  const response = await axios.delete(`http://localhost:8000/api/task/deleteTask/${taskid}/${localStorage.getItem('loggedin')}`);
  return response.data;
});