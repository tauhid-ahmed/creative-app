import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Issue } from "@/db/schemas";
import { SortableColumn } from "./sortable-column";

const DESC = "desc";

type Props = {
  issues: Issue[];
  sort: string;
  searchParams: URLSearchParams;
} & React.PropsWithChildren;

export function IssuesTable({ issues, sort = "", searchParams }: Props) {
  const [currentSortName, direction] = sort.split(":");

  const sortedIssues = [...issues].sort((a, b) => {
    const aValue = String(a[currentSortName as keyof Issue]);
    const bValue = String(b[currentSortName as keyof Issue]);

    return direction === DESC
      ? bValue.localeCompare(aValue)
      : aValue.localeCompare(bValue);
  });

  return (
    <div className="border rounded overflow-hidden">
      <Table>
        <TableHeader className="bg-accent/60">
          <TableRow>
            {["title", "type", "status", "description", "created_at"].map(
              (key) => (
                <TableHead key={key}>
                  <SortableColumn
                    sortKey={key}
                    currentSort={sort}
                    searchParams={searchParams}
                  >
                    {getColumnLabel(key)}
                  </SortableColumn>
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedIssues.map((issue) => (
            <TableRow key={issue.id} className="relative">
              <TableCell className="font-medium px-5">
                {issue.title}
                <Link
                  href={`/issues/${issue.id}`}
                  className="absolute inset-0"
                />
              </TableCell>
              <TableCell className="px-5 hidden md:table-cell">
                <Badge variant="outline">Feature</Badge>
              </TableCell>
              <TableCell className="px-5 hidden md:table-cell">
                {issue.status}
              </TableCell>
              <TableCell className="max-w-xs truncate px-5 hidden md:table-cell">
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

// type SortableColumnProps = {
//   sortKey: string;
//   currentSort: string;
// } & React.PropsWithChildren;

// function SortableColumn({
//   children,
//   sortKey,
//   currentSort,
// }: SortableColumnProps) {
//   const [activeKey, direction] = currentSort.split(":");
//   const isActive = activeKey === sortKey;

//   const nextSort = !isActive
//     ? sortKey
//     : direction !== DESC
//     ? `${sortKey}:${DESC}`
//     : "";

//   return (
//     <Link
//       href={nextSort ? `?sort=${nextSort}` : "?"}
//       className="relative group px-3"
//     >
//       {children}
//       <span
//         className={cn(
//           "absolute -right-4 top-1/2 -translate-y-1/2 rounded",
//           isActive && "bg-primary/20"
//         )}
//       >
//         <LucideChevronDown
//           className={cn(
//             "size-4 text-primary opacity-0 group-hover:opacity-100 transition-[opacity_transform] duration-300",
//             {
//               "opacity-100": isActive,
//               "rotate-180": isActive && direction === DESC,
//             }
//           )}
//         />
//       </span>
//     </Link>
//   );
// }

function getColumnLabel(key: string): string {
  switch (key) {
    case "title":
      return "Issue";
    case "type":
      return "Type";
    case "status":
      return "Status";
    case "description":
      return "Description";
    case "created_at":
      return "Created At";
    default:
      return key;
  }
}
