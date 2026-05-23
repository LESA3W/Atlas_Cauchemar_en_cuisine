type StatsBarProps = {
  total: number;
  open: number;
  closed: number;
  filtered: number;
  totalEpisodes: number;
};

function Cell({
  label,
  value,
  accent
}: {
  label: string;
  value: string | number;
  accent?: "rouge" | "or" | "paper";
}) {
  const accentClass =
    accent === "rouge" ? "text-rouge-bright" : accent === "or" ? "text-or" : "text-paper";
  return (
    <div className="flex flex-1 items-center justify-between gap-4 border-r border-rule px-4 py-3 last:border-r-0 md:px-6">
      <p
        className="font-mono text-[10px] uppercase text-paper-soft"
        style={{ letterSpacing: "0.22em" }}
      >
        {label}
      </p>
      <p className={`font-display text-2xl leading-none md:text-3xl ${accentClass}`}>
        {value}
      </p>
    </div>
  );
}

export function StatsBar({ total, open, closed, filtered, totalEpisodes }: StatsBarProps) {
  return (
    <footer className="relative z-[1200] flex w-full items-stretch overflow-x-auto border-t border-rule-strong bg-ink/95 backdrop-blur thin-scrollbar">
      <Cell label="Adresses" value={`${open}/${totalEpisodes}`} accent="paper" />
      <Cell label="Ouverts" value={open} accent="or" />
      <Cell label="Fermés" value={total - open} accent="rouge" />
      <Cell label="Résultats" value={filtered} accent="paper" />
    </footer>
  );
}
