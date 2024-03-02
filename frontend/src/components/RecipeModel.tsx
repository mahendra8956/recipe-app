import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import { getRecipeSummary } from "../api";

interface Props {
  recipeId: string;
  onClose: () => void;
}

const RecipeModel = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const data = await getRecipeSummary(recipeId);
        setRecipeSummary(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);

  if (!recipeSummary) return <></>;
  return (
    <>
      <div className="overlay"></div>
      <div className="model">
        <div className="model-content">
          <div className="model-header">
            <h2>{recipeSummary?.title}</h2>
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }}></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModel;
