import { useEffect, useRef, useState } from "react";
import * as api from "./api";
import "./App.css";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModel from "./components/RecipeModel";
import { AiOutlineSearch } from "react-icons/ai";

type Tabs = "search" | "favorites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef<number>(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await api.getFavouriteRecipes();
        console.log("ssssssssssssss", favoriteRecipes);
        setFavouriteRecipes(favoriteRecipes);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFavoriteRecipes();
  }, []);

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipes(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (e) {
      console.log(e);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      setFavouriteRecipes(favouriteRecipes.filter((r) => r.id !== recipe.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    pageNumber.current = 1;
    try {
      const recipes = await api.searchRecipes(searchTerm, pageNumber.current);
      setRecipes(recipes);
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    pageNumber.current = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(
        searchTerm,
        pageNumber.current
      );
      setRecipes([...recipes, ...nextRecipes]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="/food.jpg" />
        <div className="title">My Recipe App</div>
      </div>
      <div className="tabs">
        <h1
          className={selectedTab == "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab == "favorites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favorites")}
        >
          Favourites
        </h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={(e) => handleSearch(e)}>
            <input
              type="text"
              required
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch size={40} />
            </button>
          </form>
          <div className="recipe-grid">
            {recipes?.map((recipe) => {
              const isFavorite = favouriteRecipes.some(
                (favRecipe) => favRecipe.id === recipe.id
              );
              return (
                <RecipeCard
                  recipe={recipe}
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavouriteButtonClick={
                    !isFavorite ? addFavouriteRecipe : removeFavouriteRecipe
                  }
                  isFavorite={isFavorite}
                />
              );
            })}
          </div>

          {recipes?.length > 0 && (
            <button className="view-more" onClick={handleViewMoreClick}>
              View More
            </button>
          )}
        </>
      )}

      {selectedTab === "favorites" && (
        <div className="recipe-grid">
          {favouriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={removeFavouriteRecipe}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModel
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      )}
    </div>
  );
};

export default App;
