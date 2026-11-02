import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 30,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 15,
    color: colors.textSecondary,
  },

  opcoesContainer: {
    gap: 18,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 22,
    elevation: 3,
  },

  iconeContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },

  cardDescricao: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
    marginBottom: 18,
  },

  cardAcao: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default styles;
