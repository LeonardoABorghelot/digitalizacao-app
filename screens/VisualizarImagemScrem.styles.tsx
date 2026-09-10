import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  pagerView: {
    flex: 1,
  },

  page: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },

  nome: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  imagem: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  botaoExcluir: {
    backgroundColor: "#d32f2f",
    height: 46,
    minWidth: 180,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoExcluir: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  emptyText: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});

export default styles;
