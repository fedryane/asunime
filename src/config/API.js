import axios from "axios";

export const API = axios.create({
  baseURL: "https://asu-nime-server.vercel.app",
});

export const API2 = axios.create({
  baseURL: "https://asu-nime-server-2.up.railway.app",
});
