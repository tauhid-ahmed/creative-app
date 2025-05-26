"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <Input
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          const value = e.currentTarget.value;

          if (value) {
            params.set("search", value);
          } else {
            params.delete("search");
          }

          router.push(`?${params.toString()}`);
        }}
        placeholder="Search"
        defaultValue={searchParams.get("search") || ""}
      />
    </div>
  );
}
