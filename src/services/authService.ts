import axios from 'axios';
import { API_URL } from '../config/api';

export const login = async (cd_fun: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/login`, { cd_fun, password });

  if (response.data?.success && response.data?.data?.token) {
    return response.data.data.token;
  }

  throw new Error('Falha no login');
};
