import { useAuth } from "@/context/AuthContext";
import indexStyles from "@/styles/appIndex";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={indexStyles.container}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  return <Redirect href="/(tabs)" />;
}
