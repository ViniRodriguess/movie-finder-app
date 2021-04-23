import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonmock.hackerrank.com/api',
  headers: {
    Accept: 'aplication/json',
    'Content-Type': 'aplication/json',
  },
});

export default api;
