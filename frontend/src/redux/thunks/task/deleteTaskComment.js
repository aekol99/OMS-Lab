import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteTaskComment = createAsyncThunk("task/deleteTaskComment", async ({ commentid }) => {
  const response = await axios.delete(`http://localhost:8000/api/taskcomment/deleteTaskComment/${commentid}/${localStorage.getItem('loggedin')}`);
  return response.data;
});