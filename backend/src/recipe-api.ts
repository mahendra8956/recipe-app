const apiKey = process.env.API_KEY;
console.log(apiKey);

export const searchRecipes = async (searchTerm: string, pageNo: number) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  const url = new URL(process.env.SEARCH_RECIPE_API || "");
  const params = {
    apiKey: apiKey,
    query: searchTerm,
    number: "10",
    offset: (pageNo * 10).toString(),
  };

  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );

  const params = {
    apiKey,
  };

  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getFavouriteRecipesByIds = async (ids: string[]) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const params = {
    ids: ids.join(","),
    apiKey,
  };

  url.search = new URLSearchParams(params).toString();
  const searchResponse = await fetch(url);
  const json = await searchResponse.json();
  return { results: json };
};
