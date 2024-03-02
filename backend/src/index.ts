import express from "express";
import cors from "cors";
import "dotenv/config";
import * as RecipeApi from "./recipe-api";
import { PrismaClient } from "@prisma/client";

const app = express();

const prismaClient = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  if (!searchTerm) return res.json({});
  const page = parseInt(req.query.page as string);
  const result = await RecipeApi.searchRecipes(searchTerm, page);
  return res.json(result);
});

app.get("/api/recipes/summary", async (req, res) => {
  const recipeId = req.query.recipeId as string;
  if (!recipeId) return res.json({});
  const result = await RecipeApi.getRecipeSummary(recipeId);
  return res.json(result);
});

app.post("/api/recipes/fabvourite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    const fabvouriteRecipe = await prismaClient.favouriteRecipes.create({
      data: {
        recipeId: recipeId,
      },
    });

    return res.status(201).json(fabvouriteRecipe);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/recipes/fabvourite", async (req, res) => {
  try {
    const recipes = await prismaClient.favouriteRecipes.findMany();
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());
    const favorites = await RecipeApi.getFavouriteRecipesByIds(recipeIds);
    return res.json(favorites);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/recipes/fabvourite", async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    await prismaClient.favouriteRecipes.delete({
      where: {
        recipeId: recipeId,
      },
    });
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
