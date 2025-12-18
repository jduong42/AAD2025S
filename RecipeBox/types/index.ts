/**
 * TypeScript type definitions for Recipe Box Application
 * Ensures type safety across the entire application
 */

// Core Recipe interface based on TheMealDB API structure
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
  // Ingredients (up to 20 possible ingredients)
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  // Measures (corresponding to ingredients)
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}

// Simplified recipe for favorites and search results
export interface RecipeCard {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

// API Response types
export interface SearchResponse {
  meals: Recipe[] | null;
}

export interface DetailResponse {
  meals: Recipe[] | null;
}

// Application state types
export interface FavoriteRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  dateAdded: string; // ISO string
}

// Processed ingredient for display
export interface ProcessedIngredient {
  name: string;
  measure: string;
  combined: string; // "1 cup flour"
}

// API Error types
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

// Loading states
export type LoadingState = "idle" | "loading" | "success" | "error";

// Theme types
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  white: string;
  black: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeight: {
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
  };
}

// Navigation types
export type RootStackParamList = {
  index: undefined;
  "detail/[id]": { id: string };
  favorites: undefined;
};

// Component prop types
export interface RecipeCardProps {
  recipe: RecipeCard;
  onPress?: () => void;
  showCategory?: boolean;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export interface FavoriteButtonProps {
  recipeId: string;
  recipe?: FavoriteRecipe;
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

// Context types
export interface FavoritesContextType {
  favorites: FavoriteRecipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  loading: boolean;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
