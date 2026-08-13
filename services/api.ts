import { API_URL } from '@env';
import axios from 'axios';
import { getToken } from '../utils/authStorage';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});