import axios from 'axios';
import { mapApiRecipe } from '../utils/format';

const API_KEY =
  import.meta.env.VITE_SPOONACULAR_KEY ||
  import.meta.env.VITE_API_NINJAS_KEY ||
  'c2faf35cc971465b84a6cdce82bf9d90';

const spoonacularClient = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: API_KEY,
  },
});

export const searchRemoteRecipes = async ({ ingredient, cuisine, recipeName }) => {
  const params = {
    addRecipeInformation: true,
    instructionsRequired: true,
    fillIngredients: true,
    addRecipeInstructions: true,
    number: 12,
    sort: 'popularity',
  };

  if (recipeName) {
    params.query = recipeName;
  } else if (ingredient) {
    params.query = ingredient;
  }

  if (ingredient) {
    params.includeIngredients = ingredient;
  }

  if (cuisine) params.cuisine = cuisine;

  const { data } = await spoonacularClient.get('/recipes/complexSearch', { params });
  
  // Fetch full details for each recipe to get ingredients and instructions
  const recipesWithDetails = await Promise.all(
    (data.results || []).slice(0, 12).map(async (recipe) => {
      try {
        const { data: details } = await spoonacularClient.get(`/recipes/${recipe.id}/information`);
        return details;
      } catch (error) {
        console.warn(`Failed to fetch details for recipe ${recipe.id}:`, error);
        return recipe; // Fallback to basic info
      }
    })
  );
  
  return recipesWithDetails.map((entry, index) => mapApiRecipe(entry, index));
};

