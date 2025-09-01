import { drzzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js ";
import * as schema from "../db/schema.js";

const sql = neon(ENV.DB_URL);
export const db = drzzle(sql, { schema });
