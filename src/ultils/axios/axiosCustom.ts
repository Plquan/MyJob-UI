import axios from "axios";
import env from "../../constant/env";
import { getAccessToken } from "../functions/accessToken";
const baseURL = String(env.API_URL);
const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
http.interceptors.request.use((config) => {
  if (getAccessToken() !== undefined) {
    config.headers.Authorization = "Bearer " + String(getAccessToken());
  }
  // Nếu là FormData thì không set Content-Type để browser tự set với boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
      const res =  await axios.post(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true });
      localStorage.setItem("accessToken",  res.data)
        return http(originalRequest);
      } catch (error: any) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default http;
