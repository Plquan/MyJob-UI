import axios from "axios";
import { getAccessToken } from "../functions/accessToken";
import env from "../../constant/env";
const baseURL = String(env.API_URL);
const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
http.interceptors.request.use((config:any) => {
  if (getAccessToken() !== undefined) {
    config.headers.Authorization = "Bearer " + String(getAccessToken());
  }
  return config;
});
http.interceptors.response.use(
  (response:any) => {
    return response.data;
  },
  async (error:any) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
    }
    return await Promise.reject(error);
  }
);
export default http;