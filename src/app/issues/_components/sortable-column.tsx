import { cn } from "@/lib/utils";
import { LucideChevronDown } from "lucide-react";
import Link from "next/link";

type SortableColumnProps = {
  sortKey: string;
  currentSort: string;
  searchParams: URLSearchParams;
} & React.PropsWithChildren;

const DESC = "desc";

export function SortableColumn({
  children,
  sortKey,
  currentSort = "",
  searchParams,
}: SortableColumnProps) {
  const [activeKey, direction] = currentSort.split(":");
  const isActive = activeKey === sortKey;
  const nextSort = !isActive
    ? sortKey
    : direction !== DESC
    ? `${sortKey}:${DESC}`
    : "";

  const params = new URLSearchParams(searchParams);

  if (nextSort) {
    params.set("sort", nextSort);
  } else {
    params.delete("sort");
  }

  return (
    <Link href={`?${params.toString()}`} className="relative group px-3">
      {children}
      <span
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2 rounded",
          isActive && "bg-primary/20"
        )}
      >
        <LucideChevronDown
          className={cn(
            "size-4 text-primary opacity-0 group-hover:opacity-100 transition-[opacity_transform] duration-300",
            {
              "opacity-100": isActive,
              "rotate-180": isActive && direction === DESC,
            }
          )}
        />
      </span>
    </Link>
  );
}
