import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
// console.log(process.env.NEXT_PUBLIC_BASE_URL);

export default apiClient;
