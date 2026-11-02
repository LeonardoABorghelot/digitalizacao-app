import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: colors.text,
  },

  dateBox: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
  },

  item: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 10,
    marginTop: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },

  itemComImagem: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.secondary,
    borderWidth: 2,
  },

  nr_ecf: {
    fontWeight: "bold",
    fontSize: 17,
    color: colors.text,
  },

  data: {
    color: colors.textSecondary,
    marginBottom: 4,
  },

  textoVerde: {
    color: colors.primary,
    fontWeight: "bold",
  },

  textoVermelho: {
    color: colors.danger,
    fontWeight: "bold",
  },

  botaoBuscar: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  textoBotaoBuscar: {
    color: colors.card,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },

  itemImagemIncompleta: {
    backgroundColor: "#FFF8E1",
    borderColor: colors.warning,
    borderWidth: 1,
  },

  textoAmarelo: {
    color: "#856404",
    fontWeight: "bold",
  },
});

export default styles;
