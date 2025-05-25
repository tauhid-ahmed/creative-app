import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PaginationProps = {
  itemsPerPage: number;
  totalLength: number;
  searchParams: URLSearchParams;
};

const PREV = "prev" as const;
const NEXT = "next" as const;

export function Pagination({
  totalLength,
  itemsPerPage,
  searchParams,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalLength / itemsPerPage));

  const rawPage = Number(searchParams.get("page"));
  const currentPage =
    isNaN(rawPage) || rawPage < 1
      ? 1
      : rawPage > totalPages
      ? totalPages
      : rawPage;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageLink = (direction: typeof PREV | typeof NEXT) => {
    const params = new URLSearchParams(searchParams);

    const nextPage =
      direction === PREV
        ? currentPage - 1
        : Math.min(currentPage + 1, totalPages);

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", nextPage.toString());
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "/issues";
  };

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <Button asChild variant="outline">
        <Link
          className={cn(isFirstPage && "pointer-events-none opacity-50")}
          href={`${getPageLink(PREV)}`}
        >
          ← Previous
        </Link>
      </Button>

      <span className="text-sm text-muted-foreground">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <Button asChild variant="outline" disabled={isLastPage}>
        <Link
          className={cn(isLastPage && "pointer-events-none opacity-50")}
          href={getPageLink(NEXT)}
        >
          Next →
        </Link>
      </Button>
    </div>
  );
}
