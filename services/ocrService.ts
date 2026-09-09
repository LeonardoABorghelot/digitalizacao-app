import { API_URL } from "@env";
import { File } from "expo-file-system";
import { fetch } from "expo/fetch";
import { getToken } from "../utils/authStorage";

type OCRParams = {
  fileUri: string;
  fileName: string;
  cd_vd: number;
};

export type OCRResponse = {
  nome: string | null;
  cpf: string | null;

  cliente: {
    cd_cli: number;
    nome: string;
    cpf: string;
  };

  documentoValido: boolean;

  textoExtraido: string;
};

export const processarDocumentoOCR = async ({
  fileUri,
  fileName,
  cd_vd,
}: OCRParams): Promise<OCRResponse | null> => {
  const token = await getToken();

  if (!token) {
    console.error("Token não encontrado.");
    return null;
  }

  try {
    const imageFile = new File(fileUri);

    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("cd_vd", cd_vd.toString());
    formData.append("token", token);

    const response = await fetch(`${API_URL}/OCR/process`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");

      console.error("Erro ao processar OCR:", response.status, text);

      return null;
    }

    const data = await response.json();

    if (!data.success) {
      console.error("OCR retornou erro:", data.message);

      return null;
    }

    return data.data as OCRResponse;
  } catch (error) {
    console.error("Erro ao enviar documento para OCR:", error);

    return null;
  }
};
