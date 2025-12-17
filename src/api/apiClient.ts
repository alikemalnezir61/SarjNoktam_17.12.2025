import axios from 'axios';
import { tokenStorage } from '../screens/auth/tokenStorage';

// Axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
});

// 🔹 Request: token varsa header'a ekle
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response: 401 yakala → token temizle
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // Token geçersiz/expired
      tokenStorage.clear();

      // Uygulama state’ini resetlemek için hard redirect
      // (react-router yokken en güvenlisi)
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);