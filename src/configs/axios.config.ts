import { config as env } from '@/config';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const axiosClient = axios.create({
  baseURL: env.API_BACKEND,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(env.TOKEN_STORAGE);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Aquí puedes realizar acciones adicionales, como redireccionar a la página de inicio de sesión.
      toast.error("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
    }
    return Promise.reject(error);
  }
);
