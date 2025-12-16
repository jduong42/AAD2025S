import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFavorites } from '@/context/FavoritesContext';
import { FavoriteButton } from '@/components/FavoriteButton';
import { getRecipeDetails } from '@/services/mealdbAPI';
import { lightTheme } from '@/styles/theme';
import { Recipe, FavoriteRecipe } from '@/types';

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
      console.error('Error loading recipe details:', err);
      setError('Failed to load recipe details');
      Alert.alert(
        'Error',
        'Failed to load recipe details. Please try again.',
        [
          { text: 'OK' },
          { text: 'Go Back', onPress: () => router.back() },
        ]
      );
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
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading recipe...
        </Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error || 'Recipe not found'}
        </Text>
      </View>
    );
  }

  const favoriteRecipe = convertToFavoriteRecipe(recipe);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.favoriteButtonContainer}>
          <FavoriteButton
            recipe={favoriteRecipe}
            size={32}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {recipe.strMeal}
          </Text>
          <View style={styles.tags}>
            <Text style={[styles.tag, { backgroundColor: theme.colors.primary, color: theme.colors.white }]}>
              {recipe.strCategory}
            </Text>
            <Text style={[styles.tag, { backgroundColor: theme.colors.secondary, color: theme.colors.white }]}>
              {recipe.strArea}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Instructions
          </Text>
          <Text style={[styles.instructions, { color: theme.colors.textSecondary }]}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButtonContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 34,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});