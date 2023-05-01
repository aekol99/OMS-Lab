import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteProject = createAsyncThunk("projects/deleteProject", async ({ projectid }) => {
  const response = await axios.delete(`http://localhost:8000/api/projects/deleteProject/${projectid}`);
  return response.data;
});