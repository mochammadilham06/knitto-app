import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});
