import axios from 'axios';

const api = axios.create({
  baseURL: 'https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default api;
