import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteRecipe } from '../types';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../constants/API';

interface FavoritesState {
  favorites: FavoriteRecipe[];
  loading: boolean;
  error: string | null;
}

type FavoritesAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_FAVORITES'; payload: FavoriteRecipe[] }
  | { type: 'ADD_FAVORITE'; payload: FavoriteRecipe }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'CLEAR_FAVORITES' };

interface FavoritesContextType {
  state: FavoritesState;
  addFavorite: (recipe: FavoriteRecipe) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  clearAllFavorites: () => Promise<void>;
  getFavoriteCount: () => number;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: true,
  error: null,
};

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOAD_FAVORITES':
      return { 
        ...state, 
        favorites: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'ADD_FAVORITE':
      const existingIndex = state.favorites.findIndex(fav => fav.idMeal === action.payload.idMeal);
      if (existingIndex >= 0) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        error: null,
      };
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.idMeal !== action.payload),
        error: null,
      };
    
    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: [],
        error: null,
      };
    
    default:
      return state;
  }
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  const loadFavoritesFromStorage = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      
      if (storedFavorites) {
        const parsedFavorites: FavoriteRecipe[] = JSON.parse(storedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: parsedFavorites });
      } else {
        dispatch({ type: 'LOAD_FAVORITES', payload: [] });
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: ERROR_MESSAGES.STORAGE_ERROR 
      });
    }
  };

  const saveFavoritesToStorage = async (favorites: FavoriteRecipe[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: ERROR_MESSAGES.STORAGE_ERROR 
      });
    }
  };

  const addFavorite = async (recipe: FavoriteRecipe): Promise<void> => {
    try {
      const favoriteWithTimestamp = {
        ...recipe,
        dateAdded: new Date().toISOString()
      };

      dispatch({ type: 'ADD_FAVORITE', payload: favoriteWithTimestamp });
      
      const updatedFavorites = [...state.favorites, favoriteWithTimestamp];
      await saveFavoritesToStorage(updatedFavorites);
    } catch (error) {
      console.error('Error adding favorite:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to add favorite. Please try again.' 
      });
    }
  };

  const removeFavorite = async (recipeId: string): Promise<void> => {
    try {
      dispatch({ type: 'REMOVE_FAVORITE', payload: recipeId });
      
      const updatedFavorites = state.favorites.filter(fav => fav.idMeal !== recipeId);
      await saveFavoritesToStorage(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to remove favorite. Please try again.' 
      });
    }
  };

  const isFavorite = (recipeId: string): boolean => {
    return state.favorites.some(fav => fav.idMeal === recipeId);
  };

  const clearAllFavorites = async (): Promise<void> => {
    try {
      dispatch({ type: 'CLEAR_FAVORITES' });
      await AsyncStorage.removeItem(STORAGE_KEYS.FAVORITES);
    } catch (error) {
      console.error('Error clearing favorites:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to clear favorites. Please try again.' 
      });
    }
  };

  const getFavoriteCount = (): number => {
    return state.favorites.length;
  };

  const contextValue: FavoritesContextType = {
    state,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearAllFavorites,
    getFavoriteCount,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};

export type { FavoritesState, FavoritesContextType };