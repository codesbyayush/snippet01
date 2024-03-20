"use server";

import { InsertSnippet, snippet } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const getSnippetById = async (id: number) => {
  const poolConnection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  });
  const db = drizzle(poolConnection);

  const itemNum = Number(id);
  const data = await db.select().from(snippet).where(eq(snippet.id, itemNum));
  return { data };
};
