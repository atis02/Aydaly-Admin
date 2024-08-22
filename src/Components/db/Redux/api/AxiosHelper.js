import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_KEY;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-master-key": import.meta.env.VITE_X_MASTER_KEY,
    Accept: "application/json",
  },
});

export default AxiosInstance;
