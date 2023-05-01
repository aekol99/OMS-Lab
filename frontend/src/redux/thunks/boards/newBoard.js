import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const newBoard = createAsyncThunk("boards/newBoard", async ({ name, projectid }) => {
  const response = await axios.post("http://localhost:8000/api/boards/newBoard", { name, projectid, userid: localStorage.getItem("loggedin") });
  return response.data;
});