import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { RecipeCardProps } from '../types';
import { lightTheme, shadows, dimensions } from '../styles/theme';

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  showCategory = true,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const theme = lightTheme;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Recipe: ${recipe.strMeal}`}
      accessibilityHint="Tap to view recipe details"
    >
      <View style={styles.imageContainer}>
        {!imageError ? (
          <>
            <Image
              source={{ uri: recipe.strMealThumb }}
              style={styles.image}
              resizeMode="cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              accessibilityLabel={`Photo of ${recipe.strMeal}`}
            />
            {imageLoading && (
              <View style={styles.imageLoadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
            )}
          </>
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
              No Image
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[styles.title, { color: theme.colors.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {recipe.strMeal}
        </Text>

        {showCategory && (
          <View style={styles.metaContainer}>
            <Text style={[styles.category, { color: theme.colors.primary }]}>
              {recipe.strCategory}
            </Text>
            <Text style={[styles.separator, { color: theme.colors.textSecondary }]}>
              {' • '}
            </Text>
            <Text style={[styles.area, { color: theme.colors.textSecondary }]}>
              {recipe.strArea}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: lightTheme.borderRadius.md,
    marginBottom: lightTheme.spacing.sm,
    overflow: 'hidden',
    ...shadows.light.ios,
    elevation: shadows.light.android.elevation,
  },
  imageContainer: {
    width: '100%',
    height: dimensions.imageSize.medium,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.surface,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: lightTheme.fontSize.sm,
    fontWeight: lightTheme.fontWeight.medium,
  },
  infoContainer: {
    padding: lightTheme.spacing.md,
  },
  title: {
    fontSize: lightTheme.fontSize.lg,
    fontWeight: lightTheme.fontWeight.semibold,
    marginBottom: lightTheme.spacing.xs,
    lineHeight: lightTheme.fontSize.lg * 1.3,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: lightTheme.spacing.xs,
  },
  category: {
    fontSize: lightTheme.fontSize.sm,
    fontWeight: lightTheme.fontWeight.medium,
  },
  separator: {
    fontSize: lightTheme.fontSize.sm,
  },
  area: {
    fontSize: lightTheme.fontSize.sm,
  },
});

export default RecipeCard;
