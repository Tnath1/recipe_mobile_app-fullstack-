import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { eq, and } from "drizzle-orm";

const app = express();
const PORT = ENV.PORT || 3001;
app.use(express.json());

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

app.delete("/api/favourites/:user_id/:recipe_id", async (req, res) => {
  const { user_id, recipe_id } = req.params;

  if (!user_id || !recipe_id) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.user_id, user_id),
          eq(favoritesTable.recipe_id, Number(recipe_id))
        )
      );

    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/favourites/:user_id", async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id parameter" });
  }

  try {
    const favourites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.user_id, user_id));

    res.status(200).json(favourites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
