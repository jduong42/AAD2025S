/**
 * TheMealDB API Service
 * Handles all HTTP requests to TheMealDB API with proper error handling
 * Follows clean architecture principles with separation of concerns
 */

import axios, { AxiosResponse, AxiosError } from 'axios';
import { 
  Recipe, 
  SearchResponse, 
  DetailResponse, 
  APIError, 
  RecipeCard,
  ProcessedIngredient 
} from '../types';
import { API_CONFIG, ERROR_MESSAGES } from '../constants/API';

// API Configuration
const BASE_URL = API_CONFIG.BASE_URL;
const TIMEOUT = API_CONFIG.TIMEOUT;

// Create axios instance with common configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for logging (development only)
apiClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error('🚨 API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`✅ API Response: ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error(`❌ API Error: ${error.config?.url} - ${error.message}`);
    }
    return Promise.reject(createAPIError(error));
  }
);

/**
 * Creates standardized API error objects
 */
function createAPIError(error: AxiosError): APIError {
  if (error.code === 'ECONNABORTED') {
    return {
      message: ERROR_MESSAGES.TIMEOUT_ERROR,
      code: 'TIMEOUT',
    };
  }
  
  if (!error.response) {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: 'NETWORK_ERROR',
    };
  }

  return {
    message: (error.response.data as any)?.message || 'An unexpected error occurred.',
    status: error.response.status,
    code: error.code || 'UNKNOWN_ERROR',
  };
}

/**
 * Validates search query
 */
function validateSearchQuery(query: string): boolean {
  return query.trim().length > 0 && query.trim().length <= 100;
}

/**
 * Validates meal ID
 */
function validateMealId(id: string): boolean {
  return /^\d+$/.test(id);
}

/**
 * Transforms full Recipe to simplified RecipeCard
 */
function transformToRecipeCard(recipe: Recipe): RecipeCard {
  return {
    idMeal: recipe.idMeal,
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb,
    strCategory: recipe.strCategory,
    strArea: recipe.strArea,
  };
}

/**
 * Processes recipe ingredients into a clean format
 */
export function processIngredients(recipe: Recipe): ProcessedIngredient[] {
  const ingredients: ProcessedIngredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
    const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
    
    if (ingredient && ingredient.trim() !== '' && ingredient.trim() !== 'null') {
      const cleanIngredient = ingredient.trim();
      const cleanMeasure = measure ? measure.trim() : '';
      const combined = cleanMeasure 
        ? `${cleanMeasure} ${cleanIngredient}`
        : cleanIngredient;
      
      ingredients.push({
        name: cleanIngredient,
        measure: cleanMeasure,
        combined,
      });
    }
  }
  
  return ingredients;
}

/**
 * Searches for recipes by keyword
 * @param query - Search term (e.g., "chicken", "beef", "pasta")
 * @returns Promise<RecipeCard[]> - Array of simplified recipe cards
 * @throws APIError - When request fails or validation fails
 */
export async function searchRecipes(query: string): Promise<RecipeCard[]> {
  // Input validation
  if (!validateSearchQuery(query)) {
    throw {
      message: ERROR_MESSAGES.INVALID_QUERY,
      code: 'INVALID_QUERY',
    } as APIError;
  }

  try {
    const response: AxiosResponse<SearchResponse> = await apiClient.get(
      `/search.php?s=${encodeURIComponent(query.trim())}`
    );

    // Handle empty results
    if (!response.data.meals) {
      return [];
    }

    // Transform and return recipe cards
    return response.data.meals.map(transformToRecipeCard);
    
  } catch (error) {
    // Re-throw API errors, wrap other errors
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    throw {
      message: 'Failed to search recipes. Please try again.',
      code: 'SEARCH_ERROR',
    } as APIError;
  }
}

/**
 * Gets detailed recipe information by ID
 * @param id - Recipe ID from TheMealDB
 * @returns Promise<Recipe | null> - Full recipe details or null if not found
 * @throws APIError - When request fails or validation fails
 */
export async function getRecipeDetails(id: string): Promise<Recipe | null> {
  // Input validation
  if (!validateMealId(id)) {
    throw {
      message: 'Invalid recipe ID format.',
      code: 'INVALID_ID',
    } as APIError;
  }

  try {
    const response: AxiosResponse<DetailResponse> = await apiClient.get(
      `/lookup.php?i=${id}`
    );

    // Return null if recipe not found
    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return response.data.meals[0];
    
  } catch (error) {
    // Re-throw API errors, wrap other errors
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    throw {
      message: 'Failed to load recipe details. Please try again.',
      code: 'DETAIL_ERROR',
    } as APIError;
  }
}

/**
 * Gets a random recipe (bonus feature)
 * @returns Promise<Recipe | null> - Random recipe or null
 * @throws APIError - When request fails
 */
export async function getRandomRecipe(): Promise<Recipe | null> {
  try {
    const response: AxiosResponse<DetailResponse> = await apiClient.get('/random.php');
    
    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return response.data.meals[0];
    
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    throw {
      message: 'Failed to load random recipe. Please try again.',
      code: 'RANDOM_ERROR',
    } as APIError;
  }
}

/**
 * Searches recipes by first letter (bonus feature)
 * @param letter - Single letter (a-z)
 * @returns Promise<RecipeCard[]> - Array of recipe cards
 * @throws APIError - When request fails or validation fails
 */
export async function searchRecipesByLetter(letter: string): Promise<RecipeCard[]> {
  if (!/^[a-zA-Z]$/.test(letter)) {
    throw {
      message: 'Letter must be a single alphabetic character.',
      code: 'INVALID_LETTER',
    } as APIError;
  }

  try {
    const response: AxiosResponse<SearchResponse> = await apiClient.get(
      `/search.php?f=${letter.toLowerCase()}`
    );

    if (!response.data.meals) {
      return [];
    }

    return response.data.meals.map(transformToRecipeCard);
    
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    throw {
      message: 'Failed to search recipes by letter. Please try again.',
      code: 'LETTER_SEARCH_ERROR',
    } as APIError;
  }
}

// Export the API client for testing purposes
export { apiClient };