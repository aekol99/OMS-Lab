import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const checkProjectMember = createAsyncThunk("project/checkProjectMember", async ({id}) => {
  const response = await axios.get(`http://localhost:8000/api/project/checkProjectMember/${id}`);
  return response.data;
});