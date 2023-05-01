import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getUserInfos = createAsyncThunk("profile/getUserInfos", async ({userid}) => {
  const response = await axios.get(`http://localhost:8000/api/profile/getUserInfos/${userid}`);
  return response.data;
});