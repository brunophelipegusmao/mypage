import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL_DIRECT or DATABASE_URL must be defined to run Drizzle tooling.",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
  verbose: true,
});
