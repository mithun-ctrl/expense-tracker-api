import { configDotenv } from "dotenv";
import { neon } from "@neondatabase/serverless";
configDotenv();

export const sql = neon(process.env.DATABASE_URL);