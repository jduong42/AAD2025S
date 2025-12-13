import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  // Title
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  // Search input
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },

  // Search button
  searchButton: {
    height: 45,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  searchButtonDisabled: {
    backgroundColor: "#cccccc",
  },

  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  // FlatList container
  listContainer: {
    paddingBottom: 20,
  },

  // Recipe card
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  // Recipe image
  recipeImage: {
    width: 120,
    height: 120,
    backgroundColor: "#f0f0f0",
  },

  // Recipe info container
  recipeInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },

  // Recipe name
  recipeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },

  // Recipe category
  recipeCategory: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 4,
  },

  // Recipe area
  recipeArea: {
    fontSize: 14,
    color: "#666",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 200,
  },

  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default searchStyles;
