import { StyleSheet } from "react-native";
import { lightTheme } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButtonContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 34,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
  },
  section: {
    marginBottom: 24,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    margin: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.md,
    marginTop: lightTheme.spacing.lg,
  },
  ingredientsContainer: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.borderRadius.lg,
    padding: lightTheme.spacing.lg,
    marginBottom: lightTheme.spacing.xl,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: lightTheme.spacing.sm,
    paddingVertical: lightTheme.spacing.xs,
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: lightTheme.colors.primary,
    marginTop: 8,
    marginRight: lightTheme.spacing.sm,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
    color: lightTheme.colors.text,
    lineHeight: 24,
  },
  ingredientMeasure: {
    fontWeight: "600",
    color: lightTheme.colors.primary,
  },
  instructionsContainer: {
    marginBottom: lightTheme.spacing.xl,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: lightTheme.spacing.lg,
    paddingRight: lightTheme.spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: lightTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: lightTheme.spacing.md,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "700",
    color: lightTheme.colors.white,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: lightTheme.colors.text,
  },
  youtubeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightTheme.colors.error,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: lightTheme.borderRadius.lg,
    marginTop: lightTheme.spacing.lg,
    gap: 8,
  },
  youtubeButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: lightTheme.colors.white,
  },
});

export default styles;
