import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export default function IssuesTableLoading() {
  return (
    <Container>
      <div className="border rounded overflow-hidden">
        <Table>
          <TableHeader className="bg-accent/60">
            <TableRow>
              <TableHead className="px-5">Issue</TableHead>
              <TableHead className="px-5 hidden md:table-cell">Type</TableHead>
              <TableHead className="px-5 hidden md:table-cell">
                Status
              </TableHead>
              <TableHead className="max-w-xs truncate px-5 hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="px-5 hidden md:table-cell">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 14 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium px-5">
                  <Skeleton className="h-7 rounded" />
                </TableCell>
                <TableCell className="px-5 hidden md:table-cell">
                  <Skeleton className="h-7 rounded" />
                </TableCell>
                <TableCell className="px-5 hidden md:table-cell">
                  <Skeleton className="h-7 rounded" />
                </TableCell>
                <TableCell className="max-w-xs truncate px-5 hidden md:table-cell">
                  <Skeleton className="h-7 rounded" />
                </TableCell>
                <TableCell className="px-5 hidden md:table-cell">
                  <Skeleton className="h-7 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
