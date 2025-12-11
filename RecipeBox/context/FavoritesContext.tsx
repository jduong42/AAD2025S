import type { RecipeSummary } from "@/services/mealdb";
import { createContext, ReactNode, useContext, useState } from "react";

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
