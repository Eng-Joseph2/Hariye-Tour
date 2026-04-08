import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9005/api",
});

export default API;
