import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getProjectInfos = createAsyncThunk("projects/getProjectInfos", async ({projectid}) => {
  const response = await axios.get(`http://localhost:8000/api/projects/getProjectInfos/${projectid}`);
  return response.data;
});