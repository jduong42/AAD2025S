import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  imageStyles,
  layoutStyles,
  welcomeStyles,
} from "@/styles/commonStyles";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={layoutStyles.container}>
      <View style={layoutStyles.content}>
        <Image
          source={require("@/assets/images/welcome.png")}
          style={imageStyles.logo}
          resizeMode="contain"
        />

        <Text style={welcomeStyles.title}>Recipe Box</Text>
        <Text style={welcomeStyles.tagline}>
          Discover & Save Your Favorite Recipes
        </Text>

        <Pressable
          style={({ pressed }) => [
            welcomeStyles.button,
            { opacity: pressed ? 0.7 : 1.0 },
          ]}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={welcomeStyles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
