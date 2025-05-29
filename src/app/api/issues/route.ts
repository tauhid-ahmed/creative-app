import { NextRequest } from "next/server";
import { db } from "@/db";
import { issuesTable } from "@/db/schemas";
import { validationSchema } from "@/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = validationSchema.safeParse(body);
  if (!validation.success) {
    return new Response(JSON.stringify(validation.error.errors), {
      status: 400,
    });
  }

  await db.insert(issuesTable).values({
    title: validation.data.title,
    description: validation.data.description,
    status: validation.data.status,
  });

  return new Response(JSON.stringify(validation.data));
}
