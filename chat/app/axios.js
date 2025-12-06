import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

// console.log(token);
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${useCookie("token").value || ""}`;
  return config;
});

export default axiosClient;
