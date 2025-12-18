import { StyleSheet, Platform } from "react-native";
import { lightTheme, dimensions } from "./theme";

export const searchStyles = StyleSheet.create({
  header: {
    paddingHorizontal: lightTheme.spacing.lg,
    paddingTop: lightTheme.spacing.md,
    paddingBottom: lightTheme.spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: lightTheme.colors.textSecondary,
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: lightTheme.spacing.lg,
    paddingVertical: lightTheme.spacing.md,
  },
  searchInput: {
    height: 56,
    fontSize: 18,
  },
  helperText: {
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
    marginTop: lightTheme.spacing.sm,
    paddingHorizontal: lightTheme.spacing.lg,
    fontStyle: "italic",
  },
});

export const searchInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: lightTheme.borderRadius.md,
    borderWidth: 2,
    paddingHorizontal: lightTheme.spacing.md,
    minHeight: dimensions.buttonHeight.medium,
    marginBottom: lightTheme.spacing.md,
  },
  searchIconContainer: {
    marginRight: lightTheme.spacing.sm,
    width: 20,
    height: 20,
    position: "relative",
  },
  searchIconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: lightTheme.colors.textSecondary,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 2,
    height: 8,
    backgroundColor: lightTheme.colors.textSecondary,
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ rotate: "45deg" }],
  },
  input: {
    flex: 1,
    fontSize: lightTheme.fontSize.md,
    paddingVertical:
      Platform.OS === "ios" ? lightTheme.spacing.sm : lightTheme.spacing.xs,
  },
  rightIconContainer: {
    marginLeft: lightTheme.spacing.sm,
  },
  clearButton: {
    marginLeft: lightTheme.spacing.sm,
    padding: lightTheme.spacing.xs,
  },
  clearIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  clearIconLine: {
    width: 10,
    height: 2,
    backgroundColor: lightTheme.colors.white,
    position: "absolute",
  },
  clearIconLine1: {
    transform: [{ rotate: "45deg" }],
  },
  clearIconLine2: {
    transform: [{ rotate: "-45deg" }],
  },
});
