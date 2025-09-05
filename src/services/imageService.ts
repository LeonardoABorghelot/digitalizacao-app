import axios from 'axios';
import { API_URL } from '../config/api';
import { getToken } from '../utils/authStorage';

export const buscarImagens = async (
  cd_vd: number,
  nr_ecf: number,
  dt_vd: string,
  cd_filial?: number,
) => {
  const token = await getToken();

  const payload = {
    dt_vd,
    nr_ecf,
    cd_filial,
  };

  const res = await axios.post(`${API_URL}/getImage`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return res.data.data;
};
