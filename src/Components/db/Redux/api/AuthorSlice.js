import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  meta: {
    limit: 20,
    itemCount: 1,
    pageCount: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  status: "idle",
  error: null,
  progress: 0,
  loading: false,
};
// Create an async thunk for the GET request
export const getAuthors = createAsyncThunk(
  "getAuthor",
  async ({ limit, page }) => {
    const response = await AxiosInstance.get(
      `/authors?limit=${limit}&page=${page}`
    );
    return response.data;
  }
);
export const deleteAuthor = createAsyncThunk("deleteAuthor", async (id) => {
  const res = await AxiosInstance.delete(`/authors/${id}`);
  res.status === 204
    ? toast.success("Deleted Successfully")
    : toast.success("Error");
  const response = await AxiosInstance.get("/authors");
  response.data.data.filter((item) => item.id !== id);
  return response.data;
});
export const createAuthor = createAsyncThunk(
  "createAuthor",
  async (body, { dispatch }) => {
    const resp = await AxiosInstance.post("/authors", body, {
      onUploadProgress: (progressEvent) => {
        // Dispatch progress updates
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(setProgress(percentCompleted));
      },
    });

    resp.status == 201 ? toast.success(resp.statusText) : toast.warn("Error");

    const response = await AxiosInstance.get("/authors");
    return response.data;
  }
);
export const updateAuthor = createAsyncThunk(
  "updateAuthor",
  async (updatedItem) => {
    const body = new FormData();
    body.append("avatar", updatedItem.icon);
    body.append("name", updatedItem.name);
    const res = await AxiosInstance.put(`/authors/${updatedItem.id}`, body);
    res.data.name === updatedItem.name
      ? toast.success("Successfully updated")
      : toast.warn("Error");
    const response = await AxiosInstance.get("/authors");
    return response.data;
  }
);
// Create the slice

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getAuthors.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteAuthor.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //   //create

      .addCase(createAuthor.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateAuthor.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});
export const { setProgress } = dataSlice.actions;

export default dataSlice.reducer;
