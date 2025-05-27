import axios from "axios";

// const BASE_URL = "http://112.150.251.179:8080/";
const BASE_URL = "http://localhost:8090";

// local vue api axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true,
});

export default api;
