import z from "zod";
import { ISSUE_FEATURES, ISSUE_STATUSES } from "./constants";

export const validationSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5),
  status: z.enum(ISSUE_STATUSES),
  feature: z.enum(ISSUE_FEATURES),
});

export type FormData = z.infer<typeof validationSchema>;
