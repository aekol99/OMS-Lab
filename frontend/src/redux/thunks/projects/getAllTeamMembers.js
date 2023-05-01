import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllTeamMembers = createAsyncThunk("projects/getAllTeamMembers", async () => {
  const response = await axios.get("http://localhost:8000/api/projects/getAllTeamMembers");
  return response.data;
});