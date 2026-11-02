import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  message: {
    textAlign: "center",
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },

  camera: {
    flex: 1,
  },

  previewContainer: {
    position: "absolute",
    bottom: 170,
    left: 0,
    right: 0,
    paddingVertical: 2,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 10,
  },

  previewScroll: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },

  preview: {
    width: 56,
    height: 56,
    marginHorizontal: 3,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },

  previewItem: {
    position: "relative",
    marginHorizontal: 5,
  },

  deleteButton: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    padding: 2,
    zIndex: 2,
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "transparent",
    zIndex: 20,
  },

  captureButtonAbsolute: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -30 }],
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: colors.secondary,
    zIndex: 21,
  },

  sendButtonAbsolute: {
    position: "absolute",
    right: 24,
    bottom: 18,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 21,
  },

  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    maxWidth: "90%",
    maxHeight: "80%",
  },

  fullImage: {
    width: 300,
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },

  closeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  modalCloseArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
