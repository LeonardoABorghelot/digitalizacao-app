import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    minHeight: "100%",
  },

  card: {
    width: "85%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  title: {
    fontSize: 25,
    color: colors.text,
  },

  icon: {
    paddingRight: 5,
  },

  button: {
    borderRadius: 8,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: colors.card,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },

  message: {
    textAlign: "center",
    color: colors.danger,
    fontSize: 18,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    width: "85%",
  },
});
