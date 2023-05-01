import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const updateTaskData = createAsyncThunk("task/updateTaskData", async ({taskid, projectid, boardid, status, position}) => {
  const response = await axios.put(`http://localhost:8000/api/task/updateTaskData/${taskid}`, {status, position, projectid, boardid, userid: localStorage.getItem('loggedin')});
  return response.data;
});