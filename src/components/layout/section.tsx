import { cn } from "@/lib/utils";

type Props = {} & React.ComponentProps<"div">;

export function Section({ className, children }: Props) {
  return <div className={cn("", className)}>{children}</div>;
}
