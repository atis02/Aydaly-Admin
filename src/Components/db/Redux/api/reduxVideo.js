import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AxiosInstance from "./AxiosHelper";

const initialState = {
  video: [],
  meta: {
    limit: 20,
    itemCount: 0,
    pageCount: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  status: "idlee",
  error: null,
  progress: 0,
  downloadProgress: 0,
  loading: false,
};
// Create an async thunk for the GET request
export const getVideo = createAsyncThunk(
  "getVideo",
  async ({ limit, page }) => {
    const response = await AxiosInstance.get(
      `/videos?limit=${limit}&page=${page}`
    );
    return response.data;
  }
);
export const getOneVideo = createAsyncThunk("getOneVideo", async (id) => {
  const response = await AxiosInstance.get(`/videos/${id}`);

  return response.data;
});
export const createVideo = createAsyncThunk(
  "createVideo",
  async (body, { dispatch }) => {
    const resp = await AxiosInstance.post("/videos", body, {
      onUploadProgress: (progressEvent) => {
        // Dispatch progress updates
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(setProgress(percentCompleted));
      },
    });
    resp.status == 201 ? toast.success(resp.statusText) : toast.warn("Error");
    const response = await AxiosInstance.get("/videos");
    return response.data;
  }
);
export const deleteVideo = createAsyncThunk("deleteVideo", async (id) => {
  const res = await AxiosInstance.delete(`/videos/${id}`);

  res.status === 204
    ? toast.success("Deleted Successfully")
    : toast.success("Error");
  const response = await AxiosInstance.get("/videos");
  response.data.data.filter((item) => item.id !== id);

  return response.data;
});
export const updateVideo = createAsyncThunk(
  "updateVideo",
  async (updatedItem) => {
    const res = await AxiosInstance.put(
      `/categories/${updatedItem.id2}`,
      updatedItem.body
    );

    const response = await AxiosInstance.get("/categories");
    return response.data;
  }
);
// Create the slice

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setDownloadProgress: (state, action) => {
      state.downloadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getVideo.pending, (state) => {
        state.progress = 0;
        state.status = "loading...";
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      // getOne
      .addCase(getOneVideo.pending, (state) => {
        state.progress = 0;
        state.status = "loading...";
      })
      .addCase(getOneVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload;
      })
      .addCase(getOneVideo.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      // create
      .addCase(createVideo.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload;
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete
      .addCase(deleteVideo.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload;
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update
      .addCase(updateVideo.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setProgress, setDownloadProgress } = videoSlice.actions;

export default videoSlice.reducer;
