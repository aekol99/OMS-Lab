import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllProjects = createAsyncThunk("projects/getAllProjects", async ({filter, order}) => {
  const response = await axios.get(`http://localhost:8000/api/projects/getAllProjects/${filter}/${order}/${localStorage.getItem('loggedin')}`);
  return response.data;
});