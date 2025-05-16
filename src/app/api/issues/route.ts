import { NextRequest } from "next/server";
import z from "zod";
import { db } from "@/db";
import { issuesTable } from "@/db/schemas";

const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return new Response(JSON.stringify(validation.error.errors), {
      status: 400,
    });
  }

  await db.insert(issuesTable).values({
    title: validation.data.title,
    description: validation.data.description,
  });

  return new Response(JSON.stringify(validation.data));
}
