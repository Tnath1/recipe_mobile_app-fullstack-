import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 3001,
  DB_URL: process.env.DB_URL, 
};
