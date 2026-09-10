import axios from "axios";
import env from "../config/env";
import { getAccessToken, clearAccessToken } from "../utils/tokenStorage";

const api = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30_000,
});

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            clearAccessToken();
        }

        return Promise.reject(error);
    }
);

export default api;