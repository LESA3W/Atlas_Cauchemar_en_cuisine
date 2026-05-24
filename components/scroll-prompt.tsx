"use client";

import { useEffect, useState } from "react";

export function ScrollPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Avoid SSR/hydration mismatch — only show after mount
    setVisible(true);

    function onScroll() {
      if (window.scrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroller vers le bas pour découvrir l'à propos"
      className="scroll-prompt group fixed bottom-[5.5rem] left-1/2 z-[1150] -translate-x-1/2 inline-flex flex-col items-center gap-2 transition-opacity duration-300"
    >
      <span
        className="font-mono text-[10px] uppercase text-paper-mute group-hover:text-paper"
        style={{ letterSpacing: "0.28em" }}
      >
        Découvrir
      </span>
      <span className="scroll-prompt-icon inline-flex h-12 w-12 items-center justify-center rounded-full border border-rouge bg-ink/85 text-paper shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur transition group-hover:bg-rouge group-hover:text-white">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="m6 9 6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
