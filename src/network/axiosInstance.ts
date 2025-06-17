import axios from 'axios';

let userId: string | null = null;

export const setUserId = (id: string) => {
  userId = id;
};

export const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_SERVER_URL
});

axiosInstance.interceptors.request.use((config) => {
  if (userId) {
    config.headers = config.headers || {};
    config.headers['user-id'] = userId;
  }
  return config;
});
