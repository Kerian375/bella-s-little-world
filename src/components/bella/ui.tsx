import { useEffect, useState, type ReactNode } from "react";

export function Scene({
  children,
  className = "",
  center = true,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section
      className={`relative z-10 mx-auto flex min-h-[100svh] w-full max-w-lg flex-col px-6 py-16 ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Btn({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "soft" | "ghost";
}) {
  const base =
    "press mx-auto inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 font-serif text-lg";
  if (variant === "primary") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} text-primary-foreground`}
        style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-soft)" }}
      >
        {children}
      </button>
    );
  }
  if (variant === "soft") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} glass gold-hairline text-burgundy`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} text-burgundy/70 underline decoration-rose/40 underline-offset-4`}
    >
      {children}
    </button>
  );
}

export function Ornament() {
  return (
    <div aria-hidden className="mx-auto my-6 flex items-center justify-center gap-3">
      <span className="h-px w-12" style={{ background: "color-mix(in oklab, var(--gold) 60%, transparent)" }} />
      <span className="text-sm text-rose">✿</span>
      <span className="h-px w-12" style={{ background: "color-mix(in oklab, var(--gold) 60%, transparent)" }} />
    </div>
  );
}

/** Reveals a list of lines one at a time, with an optional completion callback. */
export function useSequence(count: number, delay = 1800, startDelay = 500) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= count) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? startDelay : delay);
    return () => clearTimeout(t);
  }, [shown, count, delay, startDelay]);
  return shown;
}
