import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useFavorites } from "@/context/FavoritesContext";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getRecipeDetails } from "@/services/mealdbAPI";
import { lightTheme } from "@/styles/theme";
import { Recipe, FavoriteRecipe } from "@/types";
import styles from "@/styles/id";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { headerStyles } from "@/styles/commonStyles";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite } = useFavorites();
  const theme = lightTheme;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadRecipeDetails();
    }
  }, [id]);

  const loadRecipeDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const recipeData = await getRecipeDetails(id!);
      setRecipe(recipeData);
    } catch (err) {
      console.error("Error loading recipe details:", err);
      setError("Failed to load recipe details");
      Alert.alert("Error", "Failed to load recipe details. Please try again.", [
        { text: "OK" },
        { text: "Go Back", onPress: () => router.back() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const convertToFavoriteRecipe = (recipe: Recipe): FavoriteRecipe => {
    return {
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strCategory: recipe.strCategory,
      strArea: recipe.strArea,
      strMealThumb: recipe.strMealThumb,
      dateAdded: new Date().toISOString(),
    };
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          style={[styles.loadingText, { color: theme.colors.textSecondary }]}
        >
          Loading recipe...
        </Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error || "Recipe not found"}
        </Text>
      </View>
    );
  }

  const favoriteRecipe = convertToFavoriteRecipe(recipe);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={headerStyles.headerBar}>
        <Pressable
          onPress={() => router.back()}
          style={headerStyles.backButton}
          hitSlop={8}
        >
          <IconSymbol name="chevron.left" size={28} color={theme.colors.text} />
        </Pressable>
      </View>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.favoriteButtonContainer}>
            <FavoriteButton recipe={favoriteRecipe} size={32} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {recipe.strMeal}
            </Text>
            <View style={styles.tags}>
              <Text
                style={[
                  styles.tag,
                  {
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                  },
                ]}
              >
                {recipe.strCategory}
              </Text>
              <Text
                style={[
                  styles.tag,
                  {
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.white,
                  },
                ]}
              >
                {recipe.strArea}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Instructions
            </Text>
            <Text
              style={[
                styles.instructions,
                { color: theme.colors.textSecondary },
              ]}
            >
              {recipe.strInstructions}
            </Text>
          </View>

          {recipe.strYoutube && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Video Tutorial
              </Text>
              <Text style={[styles.link, { color: theme.colors.primary }]}>
                Watch on YouTube
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
