import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const changePassword = createAsyncThunk("settings/changePassword", async ({ id, oldpassword, newpassword }) => {
  const response = await axios.put(`http://localhost:8000/api/settings/changePassword/${id}`, { oldpassword, newpassword });
  return response.data;
});