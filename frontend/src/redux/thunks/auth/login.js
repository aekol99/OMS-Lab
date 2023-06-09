import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  const response = await axios.post("/api/auth/login", { username, password });
  return response.data;
});