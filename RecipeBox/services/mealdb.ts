import axios from "axios";

const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const ENDPOINTS = {
  SEARCH: `${MEALDB_BASE_URL}/search.php?`,
  LOOKUP: `${MEALDB_BASE_URL}/lookup.php?`,
  RANDOM: `${MEALDB_BASE_URL}/random.php`,
};

export interface Ingredient {
  name: string;
  measure: string;
}

export interface RecipeSummary {
  id: string;
  name: string;
  thumbnail: string;
  category?: string;
  area?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtube?: string;
  ingredients: Ingredient[];
  source?: string;
}

// API Response from TheMealDB (raw format)
interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
}

interface MealDBResponse {
  meals: MealDBRecipe[] | null;
}

const extractIngredients = (meal: MealDBRecipe): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof MealDBRecipe;
    const measureKey = `strMeasure${i}` as keyof MealDBRecipe;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
};

const transformToRecipe = (meal: MealDBRecipe): Recipe => {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
    youtube: meal.strYoutube || undefined,
    ingredients: extractIngredients(meal),
    source: meal.strSource,
  };
};

const transformToRecipeSummary = (meal: MealDBRecipe): RecipeSummary => {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumbnail: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
  };
};

export const searchRecipes = async (
  keyword: string
): Promise<{ success: boolean; data?: RecipeSummary[]; error?: string }> => {
  try {
    if (!keyword || keyword.trim() === "") {
      return {
        success: false,
        error: "Please enter a search keyword.",
      };
    }

    const response = await axios.get<MealDBResponse>(ENDPOINTS.SEARCH, {
      params: { s: keyword.trim() },
    });

    if (!response.data.meals) {
      return {
        success: true,
        data: [],
      };
    }

    const recipes = response.data.meals.map(transformToRecipeSummary);

    return {
      success: true,
      data: recipes,
    };
  } catch (error) {
    console.log("Search recipes error:", error);

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        return {
          success: false,
          error: "Request timed out. Please try again.",
        };
      }

      if (!error.response) {
        return {
          success: false,
          error: "Network error. Please check your connection.",
        };
      }

      if (error.response.status >= 500) {
        return {
          success: false,
          error: "Server error. Please try again later.",
        };
      }
    }

    return {
      success: false,
      error: "Failed to search recipes. Please try again.",
    };
  }
};

export const getRecipeById = async (
  id: string
): Promise<{ success: boolean; data?: Recipe; error?: string }> => {
  try {
    if (!id || id.trim() === "") {
      return {
        success: false,
        error: "Valid recipe ID is required.",
      };
    }

    const response = await axios.get<MealDBResponse>(ENDPOINTS.LOOKUP, {
      params: { i: id.trim() },
    });

    if (!response.data.meals || response.data.meals.length === 0) {
      return {
        success: false,
        error: "Recipe not found.",
      };
    }

    const recipe = transformToRecipe(response.data.meals[0]);

    return {
      success: true,
      data: recipe,
    };
  } catch (error) {
    console.log("Get recipe by ID eror:", error);

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        return {
          success: false,
          error: "Request timed out. Please try again.",
        };
      }

      if (!error.response) {
        return {
          success: false,
          error: "Network error. Please check your connection.",
        };
      }

      if (error.response.status >= 500) {
        return {
          success: false,
          error: "Server error. Please try again later.",
        };
      }

      if (error.response.status === 404) {
        return {
          success: false,
          error: "Recipe not found.",
        };
      }
    }

    return {
      success: false,
      error: "Failed to retrieve recipe. Please try again.",
    };
  }
};
