import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const searchProjects = createAsyncThunk("projects/searchProjects", async ({pattern}) => {
  const response = await axios.post("http://localhost:8000/api/projects/searchProjects", { pattern, id: localStorage.getItem('loggedin')});
  return response.data;
});