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

  const getNavigationLink = (direction: typeof PREV | typeof NEXT) => {
    const params = new URLSearchParams(searchParams);

    const targetPage =
      direction === PREV
        ? currentPage - 1
        : Math.min(currentPage + 1, totalPages);

    if (targetPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", targetPage.toString());
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "/issues";
  };

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <span className="text-sm text-muted-foreground">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <Button asChild variant="outline">
        <Link
          className={cn(isFirstPage && "pointer-events-none opacity-50")}
          href={getNavigationLink(PREV)}
        >
          ← Previous
        </Link>
      </Button>

      <PageNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />

      <Button asChild variant="outline">
        <Link
          className={cn(isLastPage && "pointer-events-none opacity-50")}
          href={getNavigationLink(NEXT)}
        >
          Next →
        </Link>
      </Button>
    </div>
  );
}

function PageNumbers({
  currentPage,
  totalPages,
  visible = 5,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  visible?: number;
  searchParams: URLSearchParams;
}) {
  const halfWindow = Math.floor(visible / 2);
  let start = Math.max(1, currentPage - halfWindow);
  let end = Math.min(totalPages, start + visible - 1);

  if (end - start + 1 < visible) {
    start = Math.max(1, end - visible + 1);
  }

  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const generateLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="flex gap-1">
      {pageNumbers.map((page) => (
        <Button size="icon" key={page} asChild>
          <Link
            className={cn(
              currentPage === page && "bg-green-500! scale-110 inline-block"
            )}
            href={generateLink(page)}
          >
            {page}
          </Link>
        </Button>
      ))}
    </div>
  );
}
