import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const newUser = createAsyncThunk("settings/newUser", async ({ username, firstname, lastname, password }) => {
  const response = await axios.post("http://localhost:8000/api/settings/newUser", { username, firstname, lastname, password });
  return response.data;
});