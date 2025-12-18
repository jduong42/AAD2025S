import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { welcomeStyles } from "@/styles/commonStyles";

export default function WelcomeScreen() {
  const [pressed, setPressed] = React.useState(false);

  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={welcomeStyles.container}>
      <View style={welcomeStyles.content}>
        <Image
          source={require("@/assets/images/welcome.png")} // Update with your logo
          style={welcomeStyles.logo}
          resizeMode="contain"
          accessibilityLabel="Recipe Box App Logo"
        />

        <Text
          style={welcomeStyles.title}
          accessibilityRole="header"
          accessibilityLabel="Recipe Box - Discover Delicious Recipes"
        >
          Recipe Box
        </Text>

        <Text
          style={welcomeStyles.tagline}
          accessibilityLabel="Find and save your favorite recipes from around the world"
        >
          Discover, save, and enjoy delicious recipes from around the world.
        </Text>

        <Pressable
          style={({ pressed }) => [
            welcomeStyles.button,
            pressed && welcomeStyles.buttonPressed,
          ]}
          onPress={handleGetStarted}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          accessibilityRole="button"
          accessibilityLabel="Get Started"
          accessibilityHint="Opens the recipe search screen"
        >
          <Text style={welcomeStyles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
