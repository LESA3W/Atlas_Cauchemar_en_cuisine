type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  isPending?: boolean;
};

export function SearchBar({ value, onChange, isPending = false }: SearchBarProps) {
  return (
    <label className="group relative block">
      <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-paper-soft">
        <svg
          aria-hidden="true"
          className="h-[14px] w-[14px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <input
        className="block w-full bg-transparent border-0 border-b border-rule-strong py-3 pl-7 pr-10 font-display italic text-paper text-lg placeholder:font-display placeholder:italic placeholder:text-paper-soft outline-none focus:border-rouge-bright"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Chercher une adresse, une ville…"
        type="search"
        value={value}
      />
      {isPending ? (
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-or" style={{ letterSpacing: "0.22em" }}>
          ···
        </span>
      ) : null}
    </label>
  );
}
