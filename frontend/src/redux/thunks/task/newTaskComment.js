import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const newTaskComment = createAsyncThunk("task/newTaskComment", async ({taskid, content}) => {
  console.log({taskid, userid: localStorage.getItem('loggedin'), content});
  const response = await axios.post("http://localhost:8000/api/taskcomment/newTaskComment", {taskid, userid: localStorage.getItem('loggedin'), content});
  return response.data;
});