import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer kjhkj`;
  return config;
});

export default axiosClient;
