import { cn } from "@/lib/utils";

type Props = {} & React.ComponentProps<"div">;

export function Container({ className, children }: Props) {
  return (
    <div className={cn("container mx-auto px-layout", className)}>
      {children}
    </div>
  );
}
