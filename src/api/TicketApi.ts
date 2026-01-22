import axios from 'axios';

const API_URL = 'https://ticketapp-backend-production.up.railway.app'

const TicketApi = axios.create({
  baseURL: API_URL,
});

TicketApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TicketApi };