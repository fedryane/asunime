import axios from "axios";

export const API = axios.create({
  baseURL: "https://asunime-servers.vercel.app",
});

export const API2 = axios.create({
  baseURL: "https://gogoanime-js.vercel.app/api",
});
