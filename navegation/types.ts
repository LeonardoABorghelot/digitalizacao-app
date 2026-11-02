export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Vendas: undefined;
  Reports: undefined;

  Camera: {
    cd_vd: number;
    nr_ecf: number;
    dt_vd: string;
    modo?: "inicial" | "nova";
  };

  ViewImages: {
    cd_vd: number;
    nr_ecf: number;
    dt_vd: string;
  };
};
