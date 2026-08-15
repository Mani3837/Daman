import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("min-w-0", align === "center" && "max-w-2xl")}>
        {eyebrow && (
          <div
            className={cn(
              "mb-4 flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="text-[11px] tracking-[0.25em] text-gold">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-sm leading-loose text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
