import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  meta: {
    limit: 20,
    itemCount: 0,
    pageCount: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const getCategory = createAsyncThunk(
  "getCategory",
  async ({ limit, page }) => {
    const response = await AxiosInstance.get(
      `/categories?limit=${limit}&page=${page}`
    );
    return response.data;
  }
);
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
  await AxiosInstance.delete(`/categories/${id}`);
  const response = await AxiosInstance.get("/categories");
  response.data.data.filter((item) => item.id !== id);
  response.status === 200
    ? toast.success("Deleted Successfully")
    : toast.success("Error");

  return response.data;
});
export const createCategory = createAsyncThunk(
  "createCategory",
  async (body) => {
    const resp = await AxiosInstance.post("/categories", body);
    resp.status == 201 ? toast.success(resp.statusText) : toast.warn("Error");
    const response = await AxiosInstance.get("/categories");
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

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
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

export default dataSlice.reducer;
