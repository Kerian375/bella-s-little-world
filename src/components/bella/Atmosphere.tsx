import { useMemo } from "react";

type Props = {
  petals?: number;
  particles?: number;
  hearts?: number;
  tone?: "light" | "dark";
};

function seeded(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const r = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const r2 = (Math.sin(i * 78.233) * 12345.6789) % 1;
    return { a: Math.abs(r), b: Math.abs(r2) };
  });
}

/** Slowly floating petals, subtle glowing particles and sparing hearts. */
export function Atmosphere({ petals = 12, particles = 16, hearts = 0, tone = "light" }: Props) {
  const petalList = useMemo(() => seeded(petals), [petals]);
  const particleList = useMemo(() => seeded(particles).reverse(), [particles]);
  const heartList = useMemo(() => seeded(hearts), [hearts]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petalList.map((p, i) => (
        <span
          key={`p${i}`}
          className="absolute top-0 block"
          style={{
            left: `${(p.a * 100).toFixed(2)}%`,
            width: `${8 + p.b * 8}px`,
            height: `${10 + p.a * 8}px`,
            borderRadius: "60% 0 60% 0",
            background:
              tone === "dark"
                ? "color-mix(in oklab, var(--blush) 75%, transparent)"
                : "color-mix(in oklab, var(--rose) 55%, white)",
            opacity: 0.55,
            animation: `petal-fall ${16 + p.b * 16}s linear ${(-p.a * 20).toFixed(1)}s infinite`,
          }}
        />
      ))}

      {particleList.map((p, i) => (
        <span
          key={`s${i}`}
          className="absolute block rounded-full"
          style={{
            left: `${(p.b * 100).toFixed(2)}%`,
            top: `${(p.a * 100).toFixed(2)}%`,
            width: `${3 + p.a * 3}px`,
            height: `${3 + p.a * 3}px`,
            background: "color-mix(in oklab, var(--gold) 80%, white)",
            boxShadow: "0 0 12px 2px color-mix(in oklab, var(--gold) 45%, transparent)",
            animation: `twinkle ${4 + p.b * 6}s ease-in-out ${(p.a * 5).toFixed(1)}s infinite`,
          }}
        />
      ))}

      {heartList.map((p, i) => (
        <span
          key={`h${i}`}
          className="absolute bottom-0 block text-lg"
          style={{
            left: `${(p.a * 100).toFixed(2)}%`,
            color: "color-mix(in oklab, var(--rose) 80%, white)",
            opacity: 0.7,
            animation: `float-up ${13 + p.b * 10}s linear ${(p.b * 8).toFixed(1)}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

/** One-shot celebration layer: confetti + hearts + petals. */
export function Celebration() {
  const bits = useMemo(() => seeded(70), []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {bits.map((p, i) => {
        const palette = [
          "var(--rose)",
          "var(--gold)",
          "var(--blush)",
          "var(--burgundy)",
          "white",
        ] as const;
        const color = palette[i % palette.length];
        const heart = i % 6 === 0;
        return (
          <span
            key={i}
            className="absolute top-0 block"
            style={{
              left: `${(p.a * 100).toFixed(2)}%`,
              width: heart ? "auto" : `${5 + p.b * 6}px`,
              height: heart ? "auto" : `${9 + p.a * 9}px`,
              borderRadius: heart ? undefined : "2px",
              background: heart ? undefined : color,
              color: heart ? color : undefined,
              fontSize: heart ? `${12 + p.b * 12}px` : undefined,
              ["--drift" as string]: `${(p.b * 24 - 12).toFixed(1)}vw`,
              animation: `confetti-drop ${3.5 + p.b * 3.5}s cubic-bezier(0.25,0.6,0.4,1) ${(p.a * 2.5).toFixed(2)}s forwards`,
            }}
          >
            {heart ? "♥" : null}
          </span>
        );
      })}
    </div>
  );
}
