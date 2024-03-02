import { Recipe } from "./types";

export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", page.toString());

  const response = await fetch(baseUrl);
  if (!response.ok) throw new Error(`http error! Status: ${response.status}`);
  const recipes = await response.json();
  return recipes.results;
};

export const getRecipeSummary = async (recipeId: string) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/summary");
  baseUrl.searchParams.append("recipeId", recipeId);
  const response = await fetch(baseUrl);
  if (!response.ok) throw new Error(`http error! Status: ${response.status}`);
  const recipeSummary = await response.json();
  return recipeSummary;
};

export const getFavouriteRecipes = async () => {
  const url = new URL("http://localhost:5000/api/recipes/fabvourite");
  const response = await fetch(url);

  if (!response.ok) throw new Error(`http error! Status: ${response.status}`);
  const data = await response.json();
  return data.results;
};

export const addFavouriteRecipes = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/fabvourite");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeId: recipe.id,
    }),
  });
  if (!response.ok) throw new Error(`http error! Status: ${response.status}`);
};

export const removeFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/fabvourite");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeId: recipe.id,
    }),
  });
  if (!response.ok) throw new Error(`http error! Status: ${response.status}`);
};
