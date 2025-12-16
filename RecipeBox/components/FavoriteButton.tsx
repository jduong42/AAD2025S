import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { lightTheme } from '../styles/theme';
import { FavoriteRecipe } from '../types';

interface FavoriteButtonProps {
  recipe: FavoriteRecipe;
  size?: number;
  onToggle?: (isFavorite: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipe,
  size = 24,
  onToggle
}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const theme = lightTheme;
  
  const isCurrentlyFavorite = isFavorite(recipe.idMeal);
  
  const iconName = isCurrentlyFavorite ? 'heart' : 'heart-outline';
  const iconColor = isCurrentlyFavorite 
    ? theme.colors.error
    : theme.colors.text;

  const handlePress = async () => {
    if (isAnimating) return;

    try {
      setIsAnimating(true);
      
      if (Platform.OS === 'ios') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      if (isCurrentlyFavorite) {
        await removeFavorite(recipe.idMeal);
        onToggle?.(false);
      } else {
        await addFavorite(recipe);
        onToggle?.(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      
      Alert.alert(
        'Error',
        'Failed to update favorites. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isCurrentlyFavorite 
            ? 'rgba(239, 68, 68, 0.1)'
            : 'rgba(0, 0, 0, 0.05)',
        },
        isAnimating && styles.animating
      ]}
      onPress={handlePress}
      disabled={isAnimating}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={
        isCurrentlyFavorite 
          ? `Remove ${recipe.strMeal} from favorites`
          : `Add ${recipe.strMeal} to favorites`
      }
      accessibilityHint={
        isCurrentlyFavorite
          ? 'Removes this recipe from your favorites'
          : 'Adds this recipe to your favorites'
      }
    >
      <Ionicons
        name={iconName}
        size={size}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animating: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});