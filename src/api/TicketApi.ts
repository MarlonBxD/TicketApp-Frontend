import axios from 'axios';



const TicketApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

TicketApi.interceptors.request.use((config) => {

  
  const token = localStorage.getItem('token');


  if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { TicketApi };