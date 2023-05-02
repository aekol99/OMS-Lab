import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getProjectMembers = createAsyncThunk("project/getProjectMembers", async ({projectid}) => {
  const response = await axios.get(`http://localhost:8000/api/project/getProjectMembers/${projectid}`);
  return response.data;
});