import { API_URL } from "@env";
import axios from "axios";
import { getToken } from "../utils/authStorage";

export const buscarImagens = async (
  cd_vd: number,
  nr_ecf: number,
  dt_vd: string,
  cd_filial?: number,
) => {
  const token = await getToken();

  const payload = {
    cd_vd,
    dt_vd,
    nr_ecf,
    cd_filial,
  };

  const res = await axios.post(`${API_URL}/getImage`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data.data;
};

export const excluirImagem = async (id: number): Promise<boolean> => {
  const token = await getToken();

  if (!token) {
    console.error("Token não encontrado.");
    return false;
  }

  try {
    await axios.post(
      `${API_URL}/deleteImage`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return true;
  } catch (error) {
    console.error("Erro ao excluir imagem:", error);

    return false;
  }
};
