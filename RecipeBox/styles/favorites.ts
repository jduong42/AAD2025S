import { StyleSheet } from "react-native";

export const favoriteStyles = StyleSheet.create({
  parallaxHeader: {
    height: 200,
    backgroundColor: "#CCFBF1",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerMain: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    fontWeight: "500",
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 16,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  searchButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
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
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  favoriteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIconBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 50,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
