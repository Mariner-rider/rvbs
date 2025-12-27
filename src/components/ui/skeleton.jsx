import { cn } from "../../lib/utils.js";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#f1f5f9]", className)}
      {...props}
    />
  );
}

export { Skeleton };
