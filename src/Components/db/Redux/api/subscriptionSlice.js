import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  meta: {
    limit: 20,
    itemCount: 0,
    pageCount: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  loading: false,
};
// Create an async thunk for the GET request
export const getSubscription = createAsyncThunk(
  "getSubscription",
  async ({ limit, page }) => {
    const response = await AxiosInstance.get(
      `/subscriptions?limit=${limit}&page=${page}`
    );
    return response.data;
  }
);
export const deleteSubscription = createAsyncThunk(
  "deleteSubscription",
  async (id) => {
    await AxiosInstance.delete(`/subscriptions/${id}`);
    const response = await AxiosInstance.get("/subscriptions");
    response.data.data.filter((item) => item.id !== id);
    response.status === 200
      ? toast.success("Deleted Successfully")
      : toast.success("Error");

    return response.data;
  }
);
export const createSubscription = createAsyncThunk(
  "createSubscription",
  async (body) => {
    const resp = await AxiosInstance.post("/subscriptions", body);
    resp.status == 201 ? toast.success(resp.statusText) : toast.warn("Error");
    const response = await AxiosInstance.get("/subscriptions");
    return response.data;
  }
);
export const updateSubscription = createAsyncThunk(
  "updateSubscription",
  async (updatedItem) => {
    const body = {
      duration: Number(updatedItem.duration),
      name: updatedItem.name,
      price: Number(updatedItem.price),
    };

    const res = await AxiosInstance.put(
      `/subscriptions/${updatedItem.id}`,
      body
    );

    const response = await AxiosInstance.get("/subscriptions");
    return response.data;
  }
);
// Create the slice

const giftCard = createSlice({
  name: "giftCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSubscription.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteSubscription.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createSubscription.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateSubscription.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default giftCard.reducer;
