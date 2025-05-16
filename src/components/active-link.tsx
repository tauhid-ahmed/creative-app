"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {} & React.ComponentProps<"a">;

export default function ActiveLink({
  children,
  className,
  href,
  ...props
}: Props) {
  const currentPath = usePathname();
  return (
    <Link
      className={cn(
        "hover:text-foreground transition-colors duration-300",
        currentPath === href && "text-foreground",
        className
      )}
      href={href || ""}
      {...props}
    >
      {children}
    </Link>
  );
}
