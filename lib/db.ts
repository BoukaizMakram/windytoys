import { neon } from "@neondatabase/serverless";

type SqlClient = ReturnType<typeof neon>;

let client: SqlClient | null = null;

export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL_NON_POOLING
  );
}

export function getSql() {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  client ??= neon(databaseUrl);
  return client;
}
