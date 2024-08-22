import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const getSms = createAsyncThunk("getSms", async () => {
  const response = await AxiosInstance.get(`/sms-phones/first`);
  return response.data;
});

export const createSms = createAsyncThunk("createSms", async (body) => {
  const resp = await AxiosInstance.post("/sms-phones/set", body);
  resp.status == 200 ? toast.success("Success") : toast.error("Error");
  const response = await AxiosInstance.get("/sms-phones/first");
  return response.data;
});

// Create the slice

const giftCard = createSlice({
  name: "giftCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSms.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getSms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(getSms.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })

      //create

      .addCase(createSms.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createSms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createSms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default giftCard.reducer;
