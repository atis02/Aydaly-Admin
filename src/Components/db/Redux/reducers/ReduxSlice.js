import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const LoggedInUser = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")).user
  : null;
const LoggedInToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")).token
  : null;

// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async (credentials) => {
//     const request = axios
//   }
// )

const initialState = {
  loading: "false",
  user: LoggedInUser,
  token: LoggedInToken,
  refreshToken: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setToken(state) {
      state.token = action.payload;
    },
  },
});

export const { loginSuccess, logout, setToken, setRefreshToken } =
  authSlice.actions;
export default authSlice.reducer;
