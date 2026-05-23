import type { RestaurantStatus } from "@/types/restaurant";
import { formatStatus } from "@/utils/formatters";

type StatusPillProps = {
  status: RestaurantStatus | undefined;
  size?: "sm" | "md";
  variant?: "outline" | "filled";
};

const outlineStyles: Record<RestaurantStatus, string> = {
  open: "border border-or text-or",
  closed: "border border-rouge-bright text-rouge-bright",
  permanently_closed: "border border-paper-soft text-paper-mute",
  unknown: "border border-paper-ghost text-paper-soft"
};

const filledStyles: Record<RestaurantStatus, string> = {
  open: "border border-transparent bg-[#A5780A] text-white",
  closed: "border border-transparent bg-rouge text-white",
  permanently_closed: "border border-transparent bg-[#5c5c5c] text-white",
  unknown: "border border-transparent bg-paper-ghost text-paper"
};

export function StatusPill({ status, size = "sm", variant = "outline" }: StatusPillProps) {
  const effective: RestaurantStatus = status ?? "unknown";
  const styles = variant === "filled" ? filledStyles[effective] : outlineStyles[effective];
  const padding = size === "md" ? "px-3 py-1.5 text-[11px]" : "px-2.5 py-1 text-[10px]";

  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-press ${styles} ${padding}`}
      style={{ letterSpacing: "0.22em" }}
    >
      {formatStatus(effective)}
    </span>
  );
}
