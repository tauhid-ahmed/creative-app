import { Container } from "@/components/layout/container";
import { db } from "@/db";
import { type Issue } from "@/db/schemas";
import React from "react";
import { IssuesTable } from "./_components/issues-table";

type Props = {
  searchParams: Promise<{ sort: string }>;
};

export default async function IssuesPage({ searchParams }: Props) {
  // await new Promise((resolve) => setTimeout(resolve, 500000));
  const { sort } = await searchParams;

  const issues: Issue[] = await db.query.issuesTable.findMany();
  return (
    <Container>
      <IssuesTable issues={issues} sort={sort} />
    </Container>
  );
}
