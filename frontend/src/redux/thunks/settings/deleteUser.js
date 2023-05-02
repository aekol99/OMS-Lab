import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteUser = createAsyncThunk("settings/deleteUser", async ({id}) => {
  const response = await axios.delete(`http://localhost:8000/api/settings/deleteUser/${id}`);
  return response.data;
});