import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllUsers = createAsyncThunk("settings/getAllUsers", async () => {
  const response = await axios.get("http://localhost:8000/api/settings/getAllUsers");
  return response.data;
});