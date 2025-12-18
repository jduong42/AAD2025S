import { useState, useEffect } from "react";
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
import { FavoriteButton } from "@/components/FavoriteButton";
import { getRecipeDetails } from "@/services/mealdbAPI";
import { lightTheme } from "@/styles/theme";
import { Recipe, FavoriteRecipe } from "@/types";
import styles from "@/styles/id";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { headerStyles } from "@/styles/commonStyles";
import { extractIngredients, formatInstructions } from "@/utils/recipeHelpers";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
      strInstructions: recipe.strInstructions,
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
  const ingredients = extractIngredients(recipe);
  const steps = formatInstructions(recipe.strInstructions);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header Bar */}
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
        showsVerticalScrollIndicator={false}
      >
        {/* Recipe Image with Favorite Button */}
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

        {/* Content Section */}
        <View style={styles.content}>
          {/* Recipe Title */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {recipe.strMeal}
            </Text>

            {/* Category Tags */}
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

          {/* Ingredients Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Ingredients
            </Text>
            <View
              style={[
                styles.ingredientsContainer,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View
                    style={[
                      styles.ingredientBullet,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                  <Text
                    style={[
                      styles.ingredientText,
                      { color: theme.colors.text },
                    ]}
                  >
                    {ingredient.measure && (
                      <Text
                        style={[
                          styles.ingredientMeasure,
                          { color: theme.colors.primary },
                        ]}
                      >
                        {ingredient.measure}{" "}
                      </Text>
                    )}
                    {ingredient.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Instructions
            </Text>
            <View style={styles.instructionsContainer}>
              {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepNumber,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumberText,
                        { color: theme.colors.white },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={[styles.stepText, { color: theme.colors.text }]}>
                    {step}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* YouTube Video Link (if available) */}
          {recipe.strYoutube && (
            <View style={styles.section}>
              <Pressable
                style={[
                  styles.youtubeButton,
                  { backgroundColor: theme.colors.error },
                ]}
                onPress={() => {
                  console.log("Open YouTube:", recipe.strYoutube);
                  // You can add Linking.openURL(recipe.strYoutube) here
                }}
              >
                <IconSymbol
                  name="play.circle.fill"
                  size={24}
                  color={theme.colors.white}
                />
                <Text
                  style={[
                    styles.youtubeButtonText,
                    { color: theme.colors.white },
                  ]}
                >
                  Watch Video Tutorial
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
