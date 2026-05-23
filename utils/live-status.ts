import type { OpeningHour, Restaurant, RestaurantStatus } from "@/types/restaurant";

const PARIS_TZ = "Europe/Paris";
const PARTS_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: PARIS_TZ,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

const WEEKDAY_TO_INDEX: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6
};

export function getParisDayAndMinutes(now: Date): { dayIndex: number; minutes: number } {
  const parts = PARTS_FORMATTER.formatToParts(now);
  let weekday = "Mon";
  let hour = 0;
  let minute = 0;
  for (const p of parts) {
    if (p.type === "weekday") weekday = p.value;
    else if (p.type === "hour") hour = Number(p.value);
    else if (p.type === "minute") minute = Number(p.value);
  }
  const dayIndex = WEEKDAY_TO_INDEX[weekday] ?? 0;
  return { dayIndex, minutes: hour * 60 + minute };
}

function parseSlot(slot: string): { start: number; end: number } | null {
  const m = slot.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const start = Number(m[1]) * 60 + Number(m[2]);
  let end = Number(m[3]) * 60 + Number(m[4]);
  if (end === 0) end = 24 * 60; // 00:00 = end of day
  if (end <= start) end += 24 * 60; // overnight
  return { start, end };
}

function slotsFromHourString(value: string): { start: number; end: number }[] {
  return value
    .split(/\s*[\/|]\s*/)
    .map((s) => parseSlot(s.trim()))
    .filter(Boolean) as { start: number; end: number }[];
}

export function isCurrentlyOpen(
  openingHours: OpeningHour[],
  now: Date
): boolean {
  const { dayIndex, minutes } = getParisDayAndMinutes(now);
  const today = openingHours[dayIndex];
  if (!today || today.closed) return false;
  const slots = slotsFromHourString(today.hours);
  for (const slot of slots) {
    if (minutes >= slot.start && minutes < slot.end) return true;
  }

  // also check overnight slot from the previous day that wraps past midnight
  const prev = openingHours[(dayIndex + 6) % 7];
  if (prev && !prev.closed) {
    const prevSlots = slotsFromHourString(prev.hours);
    for (const slot of prevSlots) {
      if (slot.end > 24 * 60 && minutes < slot.end - 24 * 60) return true;
    }
  }

  return false;
}

export function computeLiveStatus(
  restaurant: Restaurant,
  now: Date
): RestaurantStatus {
  if (restaurant.status === "permanently_closed") return "permanently_closed";
  if (restaurant.status === "unknown") return "unknown";
  if (!restaurant.openingHours || restaurant.openingHours.length === 0) {
    return "permanently_closed";
  }
  return isCurrentlyOpen(restaurant.openingHours, now) ? "open" : "closed";
}

export function applyLiveStatus(
  restaurants: Restaurant[],
  now: Date
): Restaurant[] {
  return restaurants.map((r) => ({
    ...r,
    status: computeLiveStatus(r, now)
  }));
}
