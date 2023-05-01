import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const renameBoard = createAsyncThunk("boards/renameBoard", async ({ id, newname, projectid }) => {
  const response = await axios.put(`http://localhost:8000/api/boards/renameBoard/${id}`, { newname, userid: localStorage.getItem('loggedin'), projectid });
  return response.data;
});