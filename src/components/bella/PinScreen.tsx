import { useEffect, useState } from "react";
import { PIN } from "@/media/config";
import { Atmosphere } from "./Atmosphere";

const INTRO = ["Hey Bella... ❤️", "I made something for you.", "But you're going to have to unlock it first."];

export function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [step, setStep] = useState(0);
  const [entry, setEntry] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (step >= INTRO.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1400 : 1900);
    return () => clearTimeout(t);
  }, [step]);

  const press = (digit: string) => {
    if (unlocked || entry.length >= 4) return;
    const next = entry + digit;
    setError("");
    setEntry(next);
    if (next.length === 4) {
      if (next === PIN) {
        setUnlocked(true);
        setTimeout(onUnlock, 2100);
      } else {
        setTimeout(() => {
          setError("Hmm... nice try 😂❤️ Try again.");
          setEntry("");
        }, 420);
      }
    }
  };

  const showKeypad = step >= INTRO.length;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-14 text-center">
      <Atmosphere petals={10} particles={14} hearts={unlocked ? 10 : 0} />

      <div className="relative z-10 w-full max-w-sm">
        <div className="min-h-[9.5rem] space-y-3">
          {INTRO.slice(0, Math.min(step + 1, INTRO.length)).map((line, i) => (
            <p
              key={line}
              className={
                i === 0
                  ? "serif-title animate-fade-up text-4xl text-burgundy"
                  : "animate-fade-up text-base text-muted-foreground"
              }
              style={{ animationDelay: "0.05s" }}
            >
              {line}
            </p>
          ))}
        </div>

        {showKeypad ? (
          <div className="animate-soft-in mt-8 glass rounded-4xl px-6 py-7">
            {unlocked ? (
              <div className="py-8">
                <p className="script text-3xl shimmer-text">You got it... ❤️</p>
              </div>
            ) : (
              <>
                <p className="script text-xl text-burgundy/80">Enter our little code</p>
                <div className="mt-5 flex justify-center gap-4">
                  {[0, 1, 2, 3].map((i) => {
                    const filled = i < entry.length;
                    return (
                      <span
                        key={i}
                        className={`h-3.5 w-3.5 rounded-full ${filled ? "animate-pin-pop" : ""}`}
                        style={{
                          background: filled
                            ? "var(--gradient-rose)"
                            : "color-mix(in oklab, var(--rose) 18%, white)",
                          boxShadow: filled ? "var(--shadow-petal)" : "none",
                        }}
                      />
                    );
                  })}
                </div>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                    <KeyButton key={d} onClick={() => press(d)}>
                      {d}
                    </KeyButton>
                  ))}
                  <span />
                  <KeyButton onClick={() => press("0")}>0</KeyButton>
                  <KeyButton
                    onClick={() => {
                      setError("");
                      setEntry((e) => e.slice(0, -1));
                    }}
                    subtle
                  >
                    ⌫
                  </KeyButton>
                </div>

                <p className="mt-5 min-h-[1.25rem] text-sm text-burgundy/80">{error}</p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function KeyButton({
  children,
  onClick,
  subtle = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press mx-auto flex h-16 w-16 items-center justify-center rounded-full font-serif text-2xl ${
        subtle ? "text-burgundy/60" : "text-burgundy"
      }`}
      style={{
        background: subtle ? "transparent" : "oklch(1 0 0 / 78%)",
        border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
        boxShadow: subtle ? "none" : "var(--shadow-petal)",
      }}
    >
      {children}
    </button>
  );
}
