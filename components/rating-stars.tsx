type RatingStarsProps = {
  rating: number | undefined;
  compact?: boolean;
};

export function RatingStars({ rating, compact = false }: RatingStarsProps) {
  if (rating === undefined) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-press text-paper-soft" style={{ letterSpacing: "0.22em" }}>
        Note N.C.
      </span>
    );
  }

  const segments = 5;
  const filled = Math.max(0, Math.min(segments, rating));

  if (compact) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="font-display italic text-paper text-sm">
          {rating.toFixed(1)}<span className="text-paper-soft"> / 5</span>
        </span>
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="font-display italic text-paper text-3xl leading-none">
          {rating.toFixed(1)}
        </span>
        <span className="font-mono text-[11px] uppercase text-paper-soft" style={{ letterSpacing: "0.22em" }}>
          / 5
        </span>
      </div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: segments }, (_, index) => {
          const fillPct = Math.max(0, Math.min(1, filled - index)) * 100;
          return (
            <span
              key={index}
              className="relative block h-[3px] w-[18px] bg-paper-ghost"
              aria-hidden="true"
            >
              <span
                className="absolute inset-y-0 left-0 bg-or"
                style={{ width: `${fillPct}%` }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
