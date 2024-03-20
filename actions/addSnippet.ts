"use server";

// import { db } from "@/db/drizzle/db";
import { InsertSnippet, snippet } from "@/db/drizzle/schema";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { revalidatePath } from "next/cache";

export const addSnippet = async (data: InsertSnippet) => {
  const poolConnection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  });
  const db = drizzle(poolConnection);

  const res = await db.insert(snippet).values(data);
  revalidatePath("/");
  return { response: 200 };
};
