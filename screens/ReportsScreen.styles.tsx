import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  conteudo: {
    padding: 16,
    paddingBottom: 30,
  },

  titulo: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 20,
  },

  periodoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },

  botaoMes: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F1F3",
    borderRadius: 10,
  },

  setaMes: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#333333",
  },

  periodoTexto: {
    alignItems: "center",
    flex: 1,
  },

  mesTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
  },

  anoTexto: {
    fontSize: 14,
    color: "#777777",
    marginTop: 3,
  },

  loading: {
    marginTop: 35,
  },

  secaoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#292929",
    marginBottom: 14,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 25,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  cardValor: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333333",
  },

  cardDescricao: {
    fontSize: 11,
    color: "#777777",
    marginTop: 7,
    textAlign: "center",
  },

  valorVerde: {
    color: "#239B56",
  },

  valorVermelho: {
    color: "#D64545",
  },

  progressoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
    elevation: 2,
  },

  progressoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  percentual: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#239B56",
  },

  progressoFundo: {
    height: 12,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressoPreenchido: {
    height: "100%",
    backgroundColor: "#239B56",
    borderRadius: 10,
  },

  abasContainer: {
    flexDirection: "row",
    backgroundColor: "#E9EAED",
    borderRadius: 10,
    padding: 4,
    marginBottom: 15,
  },

  aba: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },

  abaAtiva: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },

  abaTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777777",
  },

  abaTextoAtivo: {
    color: "#222222",
  },

  vendaItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  vendaHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  vendaCupom: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#292929",
  },

  vendaStatus: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    overflow: "hidden",
  },

  statusCompleto: {
    color: "#1E8449",
    backgroundColor: "#D5F5E3",
  },

  statusAtrasado: {
    color: "#B03A2E",
    backgroundColor: "#FADBD8",
  },

  statusPendente: {
    color: "#9A7D0A",
    backgroundColor: "#FCF3CF",
  },

  vendaCliente: {
    fontSize: 14,
    color: "#444444",
    marginBottom: 6,
  },

  vendaData: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 6,
  },

  vendaImagens: {
    fontSize: 13,
    color: "#555555",
    fontWeight: "600",
    marginBottom: 10,
  },

  vendaAcao: {
    fontSize: 12,
    color: "#2874A6",
    fontWeight: "600",
    marginTop: 3,
  },

  semVendas: {
    textAlign: "center",
    color: "#777777",
    marginTop: 25,
    marginBottom: 20,
    fontSize: 14,
  },
});

export default styles;
