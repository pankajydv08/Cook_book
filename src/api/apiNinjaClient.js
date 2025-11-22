import axios from 'axios';
import { mapApiRecipe } from '../utils/format';

const API_KEY = import.meta.env.VITE_API_NINJAS_KEY || '';

const apiNinjaClient = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': API_KEY,
  },
});

export const searchRemoteRecipes = async ({ ingredient, cuisine, recipeName }) => {
  const queryParts = [recipeName, ingredient, cuisine].filter(Boolean);
  const query = queryParts.join(' ').trim();

  if (!query) {
    return [];
  }

  try {
    const { data } = await apiNinjaClient.get('/recipe', {
      params: { query },
    });

    if (!Array.isArray(data)) {
      return [];
    }

    return data.slice(0, 12).map((entry, index) => mapApiRecipe(entry, index));
  } catch (error) {
    console.error('API Ninjas request failed:', error);
    throw error;
  }
};
