"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: URLSearchParams;
} & React.PropsWithChildren;

export function Search({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  return (
    <div>
      <Input
        onChange={(e) => {
          params.set("search", e.currentTarget.value);
          router.push(`?${params.toString()}`);
        }}
        placeholder="Search"
      />
    </div>
  );
}
