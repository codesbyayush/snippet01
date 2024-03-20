import { InsertSnippet, snippet } from "@/db/drizzle/schema";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  });
  const db = drizzle(connection);
  const data = await req.json();
  await db.insert(snippet).values(data);
  revalidatePath("/");
  return Response.json({ response: 201 });
}
