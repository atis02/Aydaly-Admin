import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  meta: {
    limit: 20,
    itemCount: 0,
    pageCount: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const getgiftCard = createAsyncThunk(
  "getgiftCard",
  async ({ limit, page }) => {
    const response = await AxiosInstance.get(
      `/gift-cards?limit=${limit}&page=${page}`
    );
    return response.data;
  }
);
export const deleteGiftCard = createAsyncThunk("deleteGiftCard", async (id) => {
  await AxiosInstance.delete(`/gift-cards/${id}`);
  const response = await AxiosInstance.get("/gift-cards");
  response.data.data.filter((item) => item.id !== id);
  response.status === 200
    ? toast.success("Deleted Successfully")
    : toast.success("Error");

  return response.data;
});
export const createGiftCard = createAsyncThunk(
  "createGiftCard",
  async (body) => {
    const resp = await AxiosInstance.post("/gift-cards", body);
    resp.status == 201 ? toast.success(resp.statusText) : toast.warn("Error");
    const response = await AxiosInstance.get("/gift-cards");
    return response.data;
  }
);
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (updatedItem) => {
    const body = new FormData();
    body.append("icon", updatedItem.icon);
    body.append("name", updatedItem.name);
    const res = await AxiosInstance.put(`/categories/${updatedItem.id}`, body);

    const response = await AxiosInstance.get("/categories");
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
      .addCase(getgiftCard.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getgiftCard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getgiftCard.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteGiftCard.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteGiftCard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteGiftCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createGiftCard.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createGiftCard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createGiftCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default giftCard.reducer;
