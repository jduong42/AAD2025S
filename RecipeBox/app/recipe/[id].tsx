import type { Recipe } from "@/services/mealdb";
import { getRecipeById } from "@/services/mealdb";
import { idStyles } from "@/styles/idStyles";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRecipe = async () => {
    if (!id) {
      Alert.alert("Error", "Recipe ID is missing or is invalid.");
      router.back();
      return;
    }

    setLoading(true);

    const result = await getRecipeById(id as string);

    setLoading(false);

    if (!result.success) {
      Alert.alert("Error", result.error || "Failed to lead the recipe.");
      router.back();
      return;
    }

    setRecipe(result.data || null);
  };

  useEffect(() => {
    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading.." }} />
        <View style={idStyles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={idStyles.loadingText}>Loading...</Text>
        </View>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Stack.Screen options={{ title: "Recipe Not Found" }} />
        <View style={idStyles.centerContainer}>
          <Text style={idStyles.errorText}>Recipe not found.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{ title: recipe.name, headerBackTitle: "Search" }}
      />
      <ScrollView style={idStyles.container}>
        <Image
          source={{ uri: recipe.thumbnail }}
          style={idStyles.recipeImage}
          resizeMode="cover"
        />

        <View style={idStyles.contentContainer}>
          <Text style={idStyles.recipeName}>{recipe.name}</Text>
          <View style={idStyles.metaContainer}>
            {recipe.category && (
              <View style={idStyles.badge}>
                <Text style={idStyles.badgeText}>{recipe.category}</Text>
              </View>
            )}
            {recipe.area && (
              <View style={[idStyles.badge, idStyles.areaBadge]}>
                <Text style={idStyles.badgeText}>{recipe.area}</Text>
              </View>
            )}
          </View>

          <View style={idStyles.section}>
            <Text style={idStyles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={idStyles.ingredientItem}>
                <Text style={idStyles.ingredientBullet}>• </Text>
                <Text style={idStyles.ingredientText}>
                  {ingredient.measure} {ingredient.name}
                </Text>
              </View>
            ))}
          </View>

          <View style={idStyles.section}>
            <Text style={idStyles.sectionTitle}>Instructions</Text>
            {recipe.instructions
              .split("\r\n")
              .filter((step) => step.trim().length > 0)
              .map((step, index) => (
                <Text key={index} style={idStyles.instructionsParagraph}>
                  {step.trim()}
                </Text>
              ))}
          </View>
          {recipe.youtube && (
            <View style={idStyles.section}>
              <Text style={idStyles.sectionTitle}>Video Tutorial</Text>
              <Text style={idStyles.youtubeLink}>{recipe.youtube}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
