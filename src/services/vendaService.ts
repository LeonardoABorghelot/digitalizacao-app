import axios from 'axios';
import { API_URL } from '../config/api';
import { getToken } from '../utils/authStorage';

export const buscarVendas = async (dt_vd: string) => {
  const token = await getToken();

  const res = await axios.post(
    `${API_URL}/getVendas`,
    { dt_vd },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return res.data.data;
};
