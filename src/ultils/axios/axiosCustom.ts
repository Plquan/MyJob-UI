import axios from "axios";
import env from "../../constant/env";

const baseURL = String(env.API_URL);
const http = axios.create({
  baseURL,
  withCredentials: true,
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
        await axios.post(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true });

        return http(originalRequest);
      } catch (error:any) {

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
