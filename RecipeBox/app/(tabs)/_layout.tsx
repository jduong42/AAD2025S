import { Tabs } from "expo-router";
import { HapticTab } from "@/components/haptic-tab";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme } from "@/styles/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: lightTheme.colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
