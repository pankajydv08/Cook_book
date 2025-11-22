import axios from 'axios';

export const jsonServerClient = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_URL || 'http://localhost:4000',
});

export const fetchLocalRecipes = () => jsonServerClient.get('/recipes').then((res) => res.data);
export const fetchLocalRecipeById = (id) => jsonServerClient.get(`/recipes/${id}`).then((res) => res.data);
export const createLocalRecipe = (payload) => jsonServerClient.post('/recipes', payload).then((res) => res.data);
export const updateLocalRecipe = (id, payload) => jsonServerClient.put(`/recipes/${id}`, payload).then((res) => res.data);
export const deleteLocalRecipe = (id) => jsonServerClient.delete(`/recipes/${id}`);

