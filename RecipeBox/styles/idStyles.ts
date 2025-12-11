import { StyleSheet } from "react-native";

export const idStyles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#999",
  },

  // Main container
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Recipe image
  recipeImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
  },

  // Content container
  contentContainer: {
    padding: 16,
  },

  instructionsParagraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
  },

  favoriteButton: {
    marginRight: 8,
    fontSize: 28,
  },

  favoriteText: {
    fontSize: 28,
  },
  // Recipe name
  recipeName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  // Meta container (category & area badges)
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  areaBadge: {
    backgroundColor: "#34C759",
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  // Ingredients
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  ingredientBullet: {
    fontSize: 18,
    color: "#007AFF",
    marginRight: 8,
    marginTop: 2,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    lineHeight: 24,
  },

  // Instructions
  instructionsText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },

  // YouTube link
  youtubeLink: {
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
