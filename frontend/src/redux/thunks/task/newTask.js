import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const newTask = createAsyncThunk("task/newTask", async ({projectid, boardid, userid, status, order, name}) => {
  const response = await axios.post("http://localhost:8000/api/task/newTask", {projectid, boardid, userid, status, order, name});
  return response.data;
});