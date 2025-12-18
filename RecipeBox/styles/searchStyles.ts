import { StyleSheet } from "react-native";
import { lightTheme } from "./theme";

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
