import { api } from './api';

export const login = async (cd_fun: string, password: string): Promise<string> => {
  const response = await api.post('/login', { cd_fun, password });

  if (response.data?.success && response.data?.data?.token) {
    return response.data.data.token;
  }

  throw new Error('Falha no login');
};