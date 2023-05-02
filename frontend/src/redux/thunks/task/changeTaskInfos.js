import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const changeTaskInfos = createAsyncThunk("task/changeTaskInfos", async ({taskid, target, value}) => {
  console.log({taskid, target, value});
  const response = await axios.put(`http://localhost:8000/api/task/changeTaskInfos/${taskid}`, {target, value, userid: localStorage.getItem('loggedin')});
  return response.data;
});