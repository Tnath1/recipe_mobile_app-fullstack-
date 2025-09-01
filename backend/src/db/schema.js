 import {pgTable, serial, text, timestamp, integer} from "drizzle-orm/pg-core";

 export const favoritesTable = pgTable("favorites", {
   id: serial("id").primaryKey(),
   user_id: text("user_id").notNull(),
   recipe_id: integer("recipe_id").notNull(),
   title: text("title").notNull(),
   image: text("image"),
   cookTime: text("cook_time"),
   servings: text("servings"),
   created_at: timestamp("created_at").defaultNow(),
 });