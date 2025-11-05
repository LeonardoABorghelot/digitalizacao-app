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

export const deletarImagem = async (
  nome: string,
  cd_vd: number,
  cd_filial: number,
  nr_ecf: number,
  dt_vd: string,
) => {
  const token = await getToken();

  const payload = {
    nome,
    cd_vd,
    cd_filial,
    nr_ecf,
    dt_vd,
  };

  const res = await axios.post(`${API_URL}/deleteImage`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};
