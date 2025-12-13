import type { RecipeSummary } from "@/services/mealdb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const FAVORITES_STORAGE_KEY = "@recipebox_favorites";

type FavoriteRecipe = RecipeSummary;

type FavoritesContextType = {
  favorites: FavoriteRecipe[];
  addFavorite: (recipe: FavoriteRecipe) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  const loadFavortites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        const parsedFavorites: FavoriteRecipe[] = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error("Failed to load favorites from the storage:", error);
    }
  };

  const saveFavorites = async (favoritesToSave: FavoriteRecipe[]) => {
    try {
      const jsonValue = JSON.stringify(favoritesToSave);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error("Failed to save favorites to the storage:", error);
    }
  };

  useEffect(() => {
    loadFavortites();
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = (recipe: RecipeSummary) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.find((fav) => fav.id === recipe.id);
      if (exists) {
        return currentFavorites;
      }
      return [...currentFavorites, recipe];
    });
  };

  const removeFavorite = (recipeId: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((fav) => fav.id !== recipeId)
    );
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
