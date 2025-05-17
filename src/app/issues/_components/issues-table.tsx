import { LucideChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import React from "react";
import { type Issue } from "@/db/schemas";
import Link from "next/link";

const DESC = "desc";

type Props = { issues: Issue[]; sort: string } & React.PropsWithChildren;

export function IssuesTable({ issues, sort = "" }: Props) {
  const [currentSortName, currentSortType] = sort.split(":");
  const sortedIssues = issues.sort((a: Issue, b: Issue) =>
    currentSortType === DESC
      ? String(b[currentSortName as keyof Issue]).localeCompare(
          String(a[currentSortName as keyof Issue])
        )
      : String(a[currentSortName as keyof Issue]).localeCompare(
          String(b[currentSortName as keyof Issue])
        )
  );
  return (
    <div className="border rounded overflow-hidden">
      <Table>
        <TableHeader className="bg-accent/60">
          <TableRow>
            <TableHead>
              <SortedColumn sortProp="title" currentSortProp={sort}>
                Issue
              </SortedColumn>
            </TableHead>
            <TableHead>
              <SortedColumn sortProp="type" currentSortProp={sort}>
                Type
              </SortedColumn>
            </TableHead>
            <TableHead>
              <SortedColumn sortProp="status" currentSortProp={sort}>
                Status
              </SortedColumn>
            </TableHead>
            <TableHead>
              <SortedColumn sortProp="description" currentSortProp={sort}>
                Description
              </SortedColumn>
            </TableHead>
            <TableHead>
              <SortedColumn sortProp="created_at" currentSortProp={sort}>
                Created At
              </SortedColumn>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedIssues.map((issue) => (
            <TableRow key={issue.id} className="relative">
              <TableCell className="font-medium px-5">
                {issue.title}{" "}
                <Link
                  className="absolute inset-0"
                  href={`/issues/${issue.id}`}
                />
              </TableCell>
              <TableCell className="px-5 hidden md:table-cell">
                <Badge variant="outline">Feature</Badge>
              </TableCell>
              <TableCell className="px-5 hidden md:table-cell">
                Status
              </TableCell>
              <TableCell className="max-w-xs truncate px-5 hidden md:table-cell ">
                {issue.description}
              </TableCell>
              <TableCell className="px-5 hidden md:table-cell">
                {new Date(issue.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

type SortedColumn = {
  sortProp: string;
  currentSortProp: string;
} & React.PropsWithChildren;

function SortedColumn({ children, sortProp, currentSortProp }: SortedColumn) {
  const [currentSortName, currentSortType] = currentSortProp.split(":");
  let newSort;

  if (currentSortName !== sortProp) {
    newSort = sortProp;
  } else if (currentSortName === sortProp && !(currentSortType === DESC)) {
    newSort = `${sortProp}:${DESC}`;
  } else {
    newSort = "";
  }

  return (
    <Link
      className="relative group px-3"
      href={newSort ? `?sort=${newSort}` : "?"}
    >
      {children}
      <span
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2 rounded",
          currentSortName.includes(sortProp) && "bg-primary/20"
        )}
      >
        <LucideChevronDown
          className={cn(
            "size-4 rounded opacity-0 text-primary group-hover:opacity-100 transition-[opacity_transform] duration-300",
            {
              "opacity-100": sortProp === currentSortName,
              "rotate-180 opacity-100":
                sortProp === currentSortName && currentSortType === DESC,
            }
          )}
        />
      </span>
    </Link>
  );
}
