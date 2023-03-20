import axios from "axios";

export const API = axios.create({
  baseURL: "https://asu-nime-server.vercel.app",
});
