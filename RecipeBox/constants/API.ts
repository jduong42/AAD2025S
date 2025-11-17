/**
 * API and Application Constants
 * Centralized configuration for the Recipe Box application
 */

// TheMealDB API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://www.themealdb.com/api/json/v1/1',
  TIMEOUT: 10000, // 10 seconds
  ENDPOINTS: {
    SEARCH: '/search.php',
    LOOKUP: '/lookup.php',
    RANDOM: '/random.php',
  },
} as const;

// AsyncStorage Keys
export const STORAGE_KEYS = {
  FAVORITES: '@RecipeBox:favorites',
  THEME_PREFERENCE: '@RecipeBox:theme',
  SEARCH_HISTORY: '@RecipeBox:search_history',
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Recipe Box',
  VERSION: '1.0.0',
  MAX_SEARCH_HISTORY: 10,
  MAX_FAVORITES: 100,
  DEBOUNCE_DELAY: 300, // ms for search debouncing
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SEARCH_ERROR: 'Failed to search recipes. Please try again.',
  DETAIL_ERROR: 'Failed to load recipe details. Please try again.',
  STORAGE_ERROR: 'Failed to save data. Please try again.',
  INVALID_QUERY: 'Search query must be between 1 and 100 characters.',
  INVALID_ID: 'Invalid recipe ID format.',
  NO_RESULTS: 'No recipes found. Try a different search term.',
} as const;

// Default Values
export const DEFAULTS = {
  SEARCH_PLACEHOLDER: 'Search for recipes...',
  EMPTY_FAVORITES_MESSAGE: 'No favorite recipes yet!',
  EMPTY_FAVORITES_SUBTITLE: 'Add recipes to your favorites to see them here.',
} as const;