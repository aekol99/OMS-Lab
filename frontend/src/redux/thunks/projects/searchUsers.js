import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const searchUsers = createAsyncThunk("settings/searchUsers", async ({pattern}) => {
  const response = await axios.post("http://localhost:8000/api/settings/searchUsers", { pattern });
  return response.data;
});