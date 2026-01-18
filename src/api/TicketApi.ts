import { useAuthStore } from '@/auth/store/AuthStore';
import axios from 'axios';

const TicketApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

TicketApi.interceptors.request.use((config) => {
  const {token} = useAuthStore();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {TicketApi} ;



