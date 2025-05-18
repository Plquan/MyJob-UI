import axios from "axios";
import env from "../../constant/env";

const baseURL = String(env.API_URL);

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      console.log(error.response.data)
    }
    return Promise.reject(error);
  }
);

export default http;
