import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { useFavorites } from '@/context/FavoritesContext';
import { RecipeCard } from '@/components/RecipeCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { lightTheme } from '@/styles/theme';
import { FavoriteRecipe } from '@/types';

export default function FavoritesScreen() {
  const { state, removeFavorite, clearAllFavorites } = useFavorites();
  const theme = lightTheme;
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRecipePress = (recipe: FavoriteRecipe) => {
    router.push(`/detail/${recipe.idMeal}`);
  };

  const handleRemoveFavorite = (recipe: FavoriteRecipe) => {
    Alert.alert(
      'Remove Favorite',
      `Remove "${recipe.strMeal}" from your favorites?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFavorite(recipe.idMeal),
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (state.favorites.length === 0) return;

    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all favorites? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => clearAllFavorites(),
        },
      ]
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderRecipeItem = ({ item }: { item: FavoriteRecipe }) => (
    <RecipeCard
      recipe={item}
      onPress={() => handleRecipePress(item)}
      showCategory={true}
    />
  );

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyState}>
      <ThemedText type="subtitle" style={styles.emptyTitle}>
        No Favorites Yet
      </ThemedText>
      <ThemedText style={styles.emptyDescription}>
        Start exploring recipes and add them to your favorites to see them here.
      </ThemedText>
      <Pressable
        style={({ pressed }) => [
          styles.searchButton,
          { opacity: pressed ? 0.6 : 1 }
        ]}
        onPress={() => router.push('/explore')}
      >
        <ThemedText style={styles.searchButtonText}>
          Explore Recipes
        </ThemedText>
      </Pressable>
    </ThemedView>
  );

  if (state.loading) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FF6B35', dark: '#FF8A5B' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#FFFFFF"
            name="heart.fill"
            style={styles.headerImage}
          />
        }>
        <ThemedView style={styles.centered}>
          <LoadingSpinner />
          <ThemedText style={styles.loadingText}>
            Loading favorites...
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    );
  }

  if (state.error) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FF6B35', dark: '#FF8A5B' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#FFFFFF"
            name="heart.fill"
            style={styles.headerImage}
          />
        }>
        <ThemedView style={styles.centered}>
          <ThemedText type="subtitle" style={styles.errorText}>
            {state.error}
          </ThemedText>
          <Pressable
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => window.location.reload()}
          >
            <ThemedText style={[styles.retryButtonText, { color: theme.colors.white }]}>
              Retry
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#CCFBF1', dark: '#134E4A' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#14B8A6"
          name="heart.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerMain}>
          <ThemedText type="title">
            My Favorites
          </ThemedText>
          <ThemedText style={styles.count}>
            {state.favorites.length} recipe{state.favorites.length !== 1 ? 's' : ''}
          </ThemedText>
        </ThemedView>
        
        {state.favorites.length > 0 && (
          <Pressable
            style={[styles.clearButton, { borderColor: theme.colors.error }]}
            onPress={handleClearAll}
          >
            <ThemedText style={[styles.clearButtonText, { color: theme.colors.error }]}>
              Clear All
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>

      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderRecipeItem}
        contentContainerStyle={[
          styles.listContainer,
          state.favorites.length === 0 && styles.emptyListContainer
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ParallaxScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerMain: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 16,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});