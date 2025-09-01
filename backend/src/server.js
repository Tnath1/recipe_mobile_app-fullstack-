import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT || 3001;
app.use(express.json());

app.get("/api/recipes", (req, res) => {
  res.json({ message: "List of recipes" });
});

app.post("/api/favourites", async (req, res) => {
  try {
    const { user_id, recipe_id, title, image, cookTime, servings } = req.body;

    if (!user_id || !recipe_id || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavourite = await db
      .insert(favoritesTable)
      .values({
        user_id,
        recipe_id,
        title,
        image,
        cookTime,
        servings,
      })
      .returning(favoritesTable);
    // Proceed with creating the recipe
    res.status(201).json(newFavourite[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
