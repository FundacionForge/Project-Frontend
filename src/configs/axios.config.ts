import { config as env } from '@/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const axiosClient = axios.create({
  baseURL: `${env.API_BACKEND}`,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(env.TOKEN_STORAGE);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json'
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



axiosClient.interceptors.response.use(
  (response) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Aquí puedes realizar acciones adicionales, como redireccionar a la página de inicio de sesión.
      toast.error(error.response.data?.message);
    }
    return Promise.reject(error);
  }
);
