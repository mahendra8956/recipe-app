import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavorite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} />
      <div className="recipe-card-title">
        <span
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        >
          {isFavorite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
