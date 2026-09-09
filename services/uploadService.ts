import { API_URL } from "@env";
import { File } from "expo-file-system";
import { fetch } from "expo/fetch";

import { getToken } from "../utils/authStorage";

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

  if (!token) {
    console.error("Token não encontrado!");
    return false;
  }

  try {
    const imageFile = new File(fileUri);

    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("cd_vd", cd_vd.toString());
    formData.append("nr_ecf", nr_ecf.toString());
    formData.append("dt_vd", dt_vd);
    formData.append("nome", fileName);
    formData.append("token", token);

    const res = await fetch(`${API_URL}/Upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");

      console.error("Falha no upload:", res.status, text);

      return false;
    }

    return true;
  } catch (err) {
    console.error("Erro ao fazer upload:", err);

    return false;
  }
};
