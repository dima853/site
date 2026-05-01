import axios from "axios";
export const baseURL = "http://localhost:8088";
export const httpClient = axios.create({
  baseURL: baseURL,
});
