import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllBoards = createAsyncThunk("boards/getAllBoards", async ({id}) => {
  const response = await axios.get(`http://localhost:8000/api/boards/getAllBoards/${id}`);
  return response.data;
});