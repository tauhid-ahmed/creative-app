import { ISSUE_FEATURES, ISSUE_STATUSES } from "@/constants";
import { type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const issueStatusEnum = pgEnum("issue_status", ISSUE_STATUSES);
export const issueFeaturesEnum = pgEnum("issue_feature", ISSUE_FEATURES);

export const issuesTable = pgTable("issues", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  status: issueStatusEnum("status").notNull().default("OPEN"),
  // features: issueFeaturesEnum("feature").notNull().default("Feature"),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export type Issue = InferSelectModel<typeof issuesTable>;
