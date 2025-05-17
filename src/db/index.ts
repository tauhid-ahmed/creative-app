import { env } from "@/env";
import { drizzle } from "drizzle-orm/neon-http";
import * as issueSchema from "./schemas";

export const db = drizzle({
  connection: env.DATABASE_URL,
  schema: { ...issueSchema },
});
