import { StyleSheet } from "react-native";

export const accessibilityStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay (70% opacity)
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  alertContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 28,
  },
  message: {
    fontSize: 17,
    fontWeight: "500",
    color: "#1F2937", // Very dark gray (WCAG AAA: 12.63:1 contrast)
    lineHeight: 26,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    minHeight: 52,
  },
  destructiveButton: {
    backgroundColor: "#DC2626",
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "#6B7280",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  destructiveText: {
    color: "#FFFFFF",
  },
  cancelText: {
    color: "#111827",
    fontWeight: "700",
  },
});
