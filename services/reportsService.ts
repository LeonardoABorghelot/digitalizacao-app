import { API_URL } from "@env";
import axios from "axios";
import { getToken } from "../utils/authStorage";

export type ReportSummary = {
  totalVendas: number;
  totalDigitalizadas: number;
  totalPendentes: number;
  percentualDigitalizado: number;
};

export type ReportSale = {
  cd_vd: number;
  dt_vd: string;
  nr_ecf: number;
  nome_cliente: string;
  quantidade_imagens: number;
  dias_pendente?: number;
  atrasada?: boolean | number;
};

const api = async (endpoint: string, mes: number, ano: number) => {
  const token = await getToken();

  const response = await axios.post(
    `${API_URL}/${endpoint}`,
    { mes, ano },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.data;
};

export const buscarResumoRelatorio = (
  mes: number,
  ano: number,
): Promise<ReportSummary> => {
  return api("getReportSummary", mes, ano);
};

export const buscarVendasPendentes = (
  mes: number,
  ano: number,
): Promise<ReportSale[]> => {
  return api("getPendingSales", mes, ano);
};

export const buscarVendasDigitalizadas = (
  mes: number,
  ano: number,
): Promise<ReportSale[]> => {
  return api("getDigitizedSales", mes, ano);
};
