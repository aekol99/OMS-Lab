import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllNotifications = createAsyncThunk("notifications/getAllNotifications", async ({id}) => {
  const response = await axios.get(`http://localhost:8000/api/notifications/getAllNotifications/${id}`);
  return response.data;
});