import { API_URL } from '@env';
import { getToken } from '../utils/authStorage';

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

  const formData = new FormData();

  formData.append('file', {
    uri: fileUri,
    name: fileName,
    type: 'image/jpeg',
  } as any);

  formData.append('values', JSON.stringify({
    cd_vd,
    nr_ecf,
    dt_vd,
    nome: fileName,
  }));

  try {
    const res = await fetch(`${API_URL}/uploadImage`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const json = await res.json();
    console.log('Upload imagem:', json);
    return res.ok;
  } catch (err) {
    console.error('Erro ao fazer upload:', err);
    return false;
  }
};