import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const issueStatusEnum = pgEnum("issue_status", [
  "OPEN",
  "IN_PROGRESS",
  "CLOSED",
]);

export const issuesTable = pgTable("issues", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  status: issueStatusEnum("status").notNull().default("OPEN"),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
