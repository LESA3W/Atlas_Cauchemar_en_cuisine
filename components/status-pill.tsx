import type { RestaurantStatus } from "@/types/restaurant";
import { formatStatus } from "@/utils/formatters";

type StatusPillProps = {
  status: RestaurantStatus | undefined;
  size?: "sm" | "md";
};

const ringStyles: Record<RestaurantStatus, string> = {
  open: "border-or text-or",
  closed: "border-rouge-bright text-rouge-bright",
  permanently_closed: "border-paper-soft text-paper-mute",
  unknown: "border-paper-ghost text-paper-soft"
};

export function StatusPill({ status, size = "sm" }: StatusPillProps) {
  const effective: RestaurantStatus = status ?? "unknown";
  const ring = ringStyles[effective];
  const padding = size === "md" ? "px-3 py-1.5 text-[11px]" : "px-2.5 py-1 text-[10px]";

  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-press border ${ring} ${padding}`}
      style={{ letterSpacing: "0.22em" }}
    >
      {formatStatus(effective)}
    </span>
  );
}
