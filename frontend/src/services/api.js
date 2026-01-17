import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

const PostgresAPI = axios.create({
  baseURL: "http://localhost:5002/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

PostgresAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { API, PostgresAPI };
export default API;
