import { API_URL } from '@env';
import { getToken } from '../utils/authStorage';

console.log('API_URL:', API_URL);


type UploadParams = {
  fileUri: string;
  fileName: string;
  cd_vd: number;
  nr_ecf: number;
  dt_vd: string;
};

export const uploadImagem = async ({
  fileUri,
  fileName,
  cd_vd,
  nr_ecf,
  dt_vd,
}: UploadParams): Promise<boolean> => {
  const token = await getToken();

  console.log('TOKEN:', token);

  if (!token) {
    console.error('Token não encontrado!');
    return false;
  }

  const formData = new FormData();

  formData.append('imagem', {
    uri: fileUri,
    name: fileName,
    type: 'image/jpeg',
  }as any);

  formData.append('cd_vd', cd_vd.toString());
  formData.append('nr_ecf', nr_ecf.toString());
  formData.append('dt_vd', dt_vd);
  formData.append('nome', fileName);
  formData.append('token', token?.toString() ?? '');

  try {
    const res = await fetch(`${API_URL}/Upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      console.log('Upload imagem:', json);
      return res.ok;
    } catch (e) {
      console.error('Resposta não é JSON:', text);
      return false;
    }
  } catch (err) {
    console.error('Erro ao fazer upload:', err);
    return false;
  }
};