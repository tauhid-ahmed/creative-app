import { Container } from "@/components/layout/container";
import { db } from "@/db";
import { issuesTable, type Issue } from "@/db/schemas";
import React from "react";
import { IssuesTable } from "./_components/issues-table";
import { count } from "drizzle-orm";
import { Pagination } from "./_components/pagination";

type Props = {
  searchParams: Promise<{ sort: string; page: string }>;
};

const ITEMS_PER_PAGE = 1;

export default async function IssuesPage({ searchParams }: Props) {
  // await new Promise((resolve) => setTimeout(resolve, 500000));
  const { sort, page } = await searchParams;
  const [{ count: totalLength }] = await db
    .select({ count: count() })
    .from(issuesTable);
  const issues: Issue[] = await db.query.issuesTable.findMany();

  const urlSearchParams = new URLSearchParams();
  if (page) urlSearchParams.set("page", page);
  if (sort) urlSearchParams.set("sort", sort);

  return (
    <Container>
      <IssuesTable issues={issues} sort={sort} searchParams={urlSearchParams} />
      <div className="">
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalLength={totalLength}
          searchParams={urlSearchParams}
        />
      </div>
    </Container>
  );
}
