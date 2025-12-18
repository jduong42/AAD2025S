import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Platform, View, Animated } from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { lightTheme } from "../styles/theme";
import { FavoriteRecipe } from "../types";
import { favoriteStyles } from "../styles/favorites";
import { AccessibleAlert } from "./AccessibleAlert"; // ← Import

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

  // Add state for alert
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    buttons: any[];
  } | null>(null);

  const isCurrentlyFavorite = isFavorite(recipe.idMeal);

  const iconName = isCurrentlyFavorite ? "heart" : "heart-outline";
  const iconColor = isCurrentlyFavorite
    ? theme.colors.error
    : theme.colors.textSecondary;

  useEffect(() => {
    if (isAnimating) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.3,
          useNativeDriver: true,
          speed: 50,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
        }),
      ]).start(() => setIsAnimating(false));
    }
  }, [isAnimating]);

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

        setAlertConfig({
          visible: true,
          title: "Remove Favorite",
          message: `Remove ${recipe.strMeal} from your favorites?`,
          buttons: [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {},
            },
            {
              text: "Remove",
              style: "destructive",
              onPress: async () => {
                setIsAnimating(true);
                await removeFavorite(recipe.idMeal);
                onToggle?.(false);
                setIsAnimating(false);

                setAlertConfig({
                  visible: true,
                  title: "Removed",
                  message: `${recipe.strMeal} has been removed from your favorites.`,
                  buttons: [
                    { text: "OK", style: "default", onPress: () => {} },
                  ],
                });
              },
            },
          ],
        });
      } else {
        await addFavorite(recipe);
        onToggle?.(true);

        setAlertConfig({
          visible: true,
          title: "Added to Favorites! ❤️",
          message: `${recipe.strMeal} has been added to your favorites.`,
          buttons: [{ text: "OK", style: "default", onPress: () => {} }],
        });

        setIsAnimating(false);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);

      setAlertConfig({
        visible: true,
        title: "Error",
        message: "Failed to update favorites. Please try again.",
        buttons: [{ text: "OK", style: "default", onPress: () => {} }],
      });

      setIsAnimating(false);
    }
  };

  return (
    <>
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
      >
        <View style={favoriteStyles.favoriteIconBackground}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons name={iconName} size={size} color={iconColor} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {alertConfig && (
        <AccessibleAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onClose={() => setAlertConfig(null)}
        />
      )}
    </>
  );
};
