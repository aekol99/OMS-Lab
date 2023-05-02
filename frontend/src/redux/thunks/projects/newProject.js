import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const newProject = createAsyncThunk("projects/newProject", async ({ owner, name, description, members }) => {
  const response = await axios.post("http://localhost:8000/api/projects/newProject", { owner, name, description, members });
  return response.data;
});