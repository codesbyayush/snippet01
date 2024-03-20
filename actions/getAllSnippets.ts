"use server";

// import { db } from "@/db/drizzle/db";
import { InsertSnippet, SelectSnippet, snippet } from "@/db/drizzle/schema";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { sql } from "drizzle-orm";

export const getAllSnippets = async () => {
  const poolConnection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  });
  const db = drizzle(poolConnection);

  const data = (
    await db.execute(sql`
  SELECT *
  FROM snippet
  ORDER BY created_at DESC;
`)
  )[0];
  return { data };
};
