import express from "express";
import { ENV } from "./config/env.js";

const app = express();
const PORT = ENV.PORT || 3001;

app.get("/api/recipes", (req, res) => {
  res.json({ message: "List of recipes" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
