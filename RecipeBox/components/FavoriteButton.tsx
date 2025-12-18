import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  View,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { lightTheme } from "../styles/theme";
import { FavoriteRecipe } from "../types";
import { favoriteStyles } from "../styles/favorites";

interface FavoriteButtonProps {
  recipe: FavoriteRecipe;
  size?: number;
  onToggle?: (isFavorite: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipe,
  size = 24,
  onToggle,
}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const theme = lightTheme;

  const isCurrentlyFavorite = isFavorite(recipe.idMeal);

  const iconName = isCurrentlyFavorite ? "heart" : "heart-outline";
  const iconColor = isCurrentlyFavorite
    ? theme.colors.error
    : theme.colors.text;

  const handlePress = async () => {
    if (isAnimating) return;

    try {
      setIsAnimating(true);

      if (Platform.OS === "ios") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      if (isCurrentlyFavorite) {
        setIsAnimating(false);

        Alert.alert(
          "Remove Favorite",
          `Remove "${recipe.strMeal}" from your favorites?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Remove",
              style: "destructive",
              onPress: async () => {
                setIsAnimating(true);
                await removeFavorite(recipe.idMeal);
                onToggle?.(false);
                setIsAnimating(false);

                Alert.alert(
                  "Removed",
                  `"${recipe.strMeal}" has been removed from your favorites.`,
                  [{ text: "OK" }]
                );
              },
            },
          ]
        );
      } else {
        // Adding favorite
        await addFavorite(recipe);
        onToggle?.(true);

        Alert.alert(
          "Added to Favorites! ❤️",
          `"${recipe.strMeal}" has been added to your favorites.`,
          [{ text: "OK" }]
        );

        setIsAnimating(false);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);

      Alert.alert("Error", "Failed to update favorites. Please try again.", [
        { text: "OK" },
      ]);

      setIsAnimating(false);
    }
  };

  return (
    <TouchableOpacity
      style={favoriteStyles.favoriteButtonContainer}
      onPress={handlePress}
      disabled={isAnimating}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel={
        isCurrentlyFavorite
          ? `Remove ${recipe.strMeal} from favorites`
          : `Add ${recipe.strMeal} to favorites`
      }
      accessibilityHint={
        isCurrentlyFavorite
          ? "Removes this recipe from your favorites"
          : "Adds this recipe to your favorites"
      }
    >
      <View style={favoriteStyles.favoriteIconBackground}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons name={iconName} size={size} color={iconColor} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
