import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteBoard = createAsyncThunk("boards/deleteBoard", async ({ id, projectid }) => {
  const response = await axios.delete(`http://localhost:8000/api/boards/deleteBoard/${id}/${projectid}/${localStorage.getItem('loggedin')}`);
  return response.data;
});