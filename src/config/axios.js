import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dev-manager-server-production.up.railway.app/api",
});

export const axiosPrivateInstance = (token) =>
  axios.create({
    baseURL: "https://dev-manager-server-production.up.railway.app/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
