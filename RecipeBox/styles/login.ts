import { StyleSheet } from "react-native";
import { lightTheme } from "./theme";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: lightTheme.spacing.lg,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: lightTheme.spacing.xxl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: lightTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: lightTheme.spacing.md,
  },
  logoText: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightTheme.colors.primary,
    marginBottom: lightTheme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: lightTheme.colors.textSecondary,
    textAlign: "center",
  },
  formSection: {
    width: "100%",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: lightTheme.spacing.md,
    color: lightTheme.colors.text,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: lightTheme.spacing.lg,
  },
  toggleText: {
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
  },
  toggleLink: {
    fontSize: 14,
    color: lightTheme.colors.primary,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: lightTheme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: lightTheme.colors.border,
  },
  dividerText: {
    marginHorizontal: lightTheme.spacing.sm,
    color: lightTheme.colors.textSecondary,
    fontSize: 12,
  },
});
