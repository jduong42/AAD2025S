import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Home</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
