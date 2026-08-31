import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Atmosphere, Celebration } from "@/components/bella/Atmosphere";
import { BellaVideoCard } from "@/components/bella/BellaVideo";
import { MusicPlayer } from "@/components/bella/MusicPlayer";
import { PinScreen } from "@/components/bella/PinScreen";
import { Btn, Ornament, Scene, useSequence } from "@/components/bella/ui";
import {
  BUILDUP_LINES,
  COUNTER_START,
  FEATURED,
  FINAL_LETTER,
  LETTER,
  SCRAPBOOK,
  THINGS,
} from "@/media/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Bella ❤️ — Something I Made For You" },
      {
        name: "description",
        content:
          "A private little world made just for Bella — a letter, her videos, her songs, and one question I've been keeping to myself.",
      },
      { property: "og:title", content: "For Bella ❤️" },
      {
        property: "og:description",
        content: "Something I quietly made for you. Unlock it and see.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BellaExperience,
});

type Stage =
  | "pin"
  | "reveal"
  | "surprise"
  | "letter"
  | "things"
  | "scrapbook"
  | "songs"
  | "counter"
  | "buildup"
  | "finalVideo"
  | "question"
  | "needTime"
  | "yes"
  | "finalLetter"
  | "funny"
  | "end";

function BellaExperience() {
  const [stage, setStage] = useState<Stage>("pin");
  const [saidYes, setSaidYes] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  const go = (next: Stage) => setStage(next);

  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      {stage === "pin" ? <PinScreen onUnlock={() => go("reveal")} /> : null}
      {stage === "reveal" ? <FirstReveal onNext={() => go("surprise")} /> : null}
      {stage === "surprise" ? <VideoSurprise onNext={() => go("letter")} /> : null}
      {stage === "letter" ? <LetterScene onNext={() => go("things")} /> : null}
      {stage === "things" ? <ThingsScene onNext={() => go("scrapbook")} /> : null}
      {stage === "scrapbook" ? <Scrapbook onNext={() => go("songs")} /> : null}
      {stage === "songs" ? <SongsScene onNext={() => go("counter")} /> : null}
      {stage === "counter" ? <CounterScene onNext={() => go("buildup")} /> : null}
      {stage === "buildup" ? <BuildUp onNext={() => go("finalVideo")} /> : null}
      {stage === "finalVideo" ? <FinalVideo onNext={() => go("question")} /> : null}
      {stage === "question" ? (
        <TheQuestion
          onYes={() => {
            setSaidYes(true);
            go("yes");
          }}
          onWait={() => go("needTime")}
        />
      ) : null}
      {stage === "needTime" ? <NeedTime onBack={() => go("question")} /> : null}
      {stage === "yes" ? <YesScene onNext={() => go("finalLetter")} /> : null}
      {stage === "finalLetter" ? <FinalLoveMessage onNext={() => go("funny")} /> : null}
      {stage === "funny" ? <FunnyEnding onNext={() => go("end")} /> : null}
      {stage === "end" ? <FinalScreen saidYes={saidYes} /> : null}
    </main>
  );
}

/* ---------------- 4. First reveal ---------------- */

function FirstReveal({ onNext }: { onNext: () => void }) {
  const shown = useSequence(2, 1800, 600);
  return (
    <>
      <Atmosphere petals={12} particles={14} hearts={3} />
      <Scene className="text-center">
        <p className="serif-title animate-fade-up text-4xl text-burgundy">Okay... you made it. 🥹</p>
        {shown >= 2 ? (
          <p className="animate-fade-up mt-5 text-base text-muted-foreground">
            Now I can finally show you what I've been working on.
          </p>
        ) : null}
        <Ornament />
        {shown >= 2 ? (
          <div className="animate-fade-up mt-2">
            <Btn onClick={onNext}>Let's go ❤️</Btn>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 5. Interactive video surprise ---------------- */

function VideoSurprise({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const video = FEATURED.surprise;

  return (
    <>
      <Atmosphere petals={10} particles={12} />
      <Scene className="text-center">
        <h1 className="serif-title animate-fade-up text-3xl text-burgundy">Before we continue...</h1>
        <p className="animate-fade-up mt-3 text-sm text-muted-foreground">
          I couldn't make this without including a little bit of you.
        </p>

        <div className="relative mt-8">
          {revealed ? (
            <div className="animate-soft-in">
              <BellaVideoCard video={video} eager caption={undefined} />
            </div>
          ) : (
            <div
              className="relative overflow-hidden rounded-3xl gold-hairline"
              style={{ aspectRatio: "9 / 16", boxShadow: "var(--shadow-soft)" }}
            >
              <img
                src={video.poster}
                alt="A covered video, waiting to be revealed"
                className="h-full w-full scale-110 object-cover blur-2xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-cream/45 px-6">
                <p className="script text-2xl text-burgundy">There's something here for you...</p>
                <Btn onClick={() => setRevealed(true)}>Reveal it ❤️</Btn>
              </div>
            </div>
          )}
        </div>

        {revealed ? (
          <div className="animate-fade-up mt-7">
            <p className="text-base text-burgundy/85">
              Okay... now you know why I had to include you in this. ❤️
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              (Tap the little speaker in the controls if you want sound.)
            </p>
            <div className="mt-6">
              <Btn onClick={onNext}>Continue →</Btn>
            </div>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 6. Personal letter ---------------- */

function LetterScene({ onNext }: { onNext: () => void }) {
  const shown = useSequence(LETTER.length, 2100, 700);
  return (
    <>
      <Atmosphere petals={9} particles={12} />
      <Scene center={false} className="justify-center">
        <h1 className="serif-title text-center text-3xl text-burgundy">
          Bella, let me tell you something...
        </h1>
        <Ornament />
        <article
          className="glass rounded-4xl px-6 py-8"
          style={{
            background:
              "linear-gradient(180deg, oklch(1 0 0 / 78%), color-mix(in oklab, var(--blush) 30%, oklch(1 0 0 / 70%)))",
          }}
        >
          <div className="space-y-5">
            {LETTER.slice(0, shown).map((line, i) => (
              <p
                key={line}
                className={
                  i === 0
                    ? "animate-fade-up font-serif text-xl leading-relaxed text-ink"
                    : "animate-fade-up font-serif text-lg leading-relaxed text-ink/90"
                }
              >
                {line}
              </p>
            ))}
          </div>
          {shown >= LETTER.length ? (
            <p className="script animate-fade-up mt-8 text-right text-2xl text-burgundy">
              — me, obviously ❤️
            </p>
          ) : null}
        </article>

        {shown >= LETTER.length ? (
          <div className="animate-fade-up mt-8 text-center">
            <Btn onClick={onNext}>Continue →</Btn>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 7. Things about you ---------------- */

function ThingsScene({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState<number | null>(0);
  const [touched, setTouched] = useState<number[]>([0]);

  return (
    <>
      <Atmosphere petals={9} particles={12} />
      <Scene center={false} className="justify-center">
        <h1 className="serif-title text-center text-3xl text-burgundy">Things About You...</h1>
        <p className="mt-2 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">
          tap each one
        </p>
        <Ornament />

        <div className="space-y-3.5">
          {THINGS.map((t, i) => {
            const isOpen = open === i;
            return (
              <div
                key={t.title}
                className={`overflow-hidden rounded-3xl ${isOpen ? "glass gold-hairline" : "border border-border bg-card/70"}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    setTouched((p) => (p.includes(i) ? p : [...p, i]));
                  }}
                  className="press flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="font-serif text-xl text-burgundy">{t.title}</span>
                  <span className="text-rose/70">{isOpen ? "—" : "+"}</span>
                </button>
                {isOpen ? (
                  <div className="animate-fade-up px-5 pb-5">
                    <p className="text-[15px] leading-relaxed text-ink/85">{t.body}</p>
                    {t.video ? (
                      <div className="mx-auto mt-4 max-w-[15rem]">
                        <BellaVideoCard video={t.video} caption={undefined} />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-9 text-center">
          <Btn onClick={onNext} variant={touched.length >= 3 ? "primary" : "soft"}>
            Continue →
          </Btn>
        </div>
      </Scene>
    </>
  );
}

/* ---------------- 8. Video scrapbook ---------------- */

function Scrapbook({ onNext }: { onNext: () => void }) {
  return (
    <>
      <Atmosphere petals={11} particles={14} hearts={2} />
      <Scene center={false} className="justify-center">
        <h1 className="serif-title text-center text-3xl text-burgundy">
          A Few Little Pieces Of You ❤️
        </h1>
        <p className="script mt-2 text-center text-xl text-burgundy/70">my favorite little clips</p>
        <Ornament />

        <div className="space-y-10">
          {SCRAPBOOK.map((v, i) => (
            <div
              key={v.id}
              className="mx-auto w-full max-w-[19rem]"
              style={{ transform: `rotate(${i % 2 === 0 ? -1.4 : 1.4}deg)` }}
            >
              <BellaVideoCard video={v} caption={v.caption} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Btn onClick={onNext}>Continue →</Btn>
        </div>
      </Scene>
    </>
  );
}

/* ---------------- 9. Songs ---------------- */

function SongsScene({ onNext }: { onNext: () => void }) {
  return (
    <>
      <Atmosphere petals={9} particles={14} />
      <Scene center={false} className="justify-center">
        <h1 className="serif-title text-center text-3xl text-burgundy">
          A Little Soundtrack For This Moment ♡
        </h1>
        <Ornament />
        <MusicPlayer />
        <p className="mt-7 text-center text-[15px] text-ink/85">
          You like these songs... so I thought they deserved to be here too. ❤️
        </p>
        <p className="script mt-2 text-center text-xl text-burgundy/80">
          Maybe they'll sound a little different while you're going through this.
        </p>
        <div className="mt-9 text-center">
          <Btn onClick={onNext}>Continue →</Btn>
        </div>
      </Scene>
    </>
  );
}

/* ---------------- 10. Counter ---------------- */

function useElapsed(start: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, now - start.getTime());
    const s = Math.floor(diff / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  }, [now, start]);
}

function CounterScene({ onNext }: { onNext: () => void }) {
  const t = useElapsed(COUNTER_START);
  const cells = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ] as const;

  return (
    <>
      <Atmosphere petals={10} particles={16} />
      <Scene className="text-center">
        <h1 className="serif-title text-3xl text-burgundy">
          Time Since You Became Someone Special To Me ♡
        </h1>
        <Ornament />
        <div className="grid grid-cols-2 gap-3.5">
          {cells.map(([label, value]) => (
            <div key={label} className="glass rounded-3xl px-3 py-6">
              <p className="font-serif text-4xl text-burgundy tabular-nums">{value}</p>
              <p className="mt-1 text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-ink/85">
          And somehow, in all that time, I kept finding more reasons to like you.
        </p>
        <p className="script mt-3 text-xl text-burgundy">
          So I think it's time I stopped keeping this question to myself.
        </p>
        <div className="mt-8">
          <Btn onClick={onNext}>Next → ❤️</Btn>
        </div>
      </Scene>
    </>
  );
}

/* ---------------- 11. Build up ---------------- */

function BuildUp({ onNext }: { onNext: () => void }) {
  const shown = useSequence(BUILDUP_LINES.length + 2, 2400, 900);
  return (
    <>
      <Atmosphere petals={16} particles={10} />
      <Scene className="text-center">
        <div className="space-y-6">
          {BUILDUP_LINES.slice(0, shown).map((line, i) => (
            <p
              key={line}
              className="animate-fade-up font-serif text-2xl leading-snug text-burgundy"
              style={{ opacity: 1 - i * 0.04 }}
            >
              {line}
            </p>
          ))}
          {shown > BUILDUP_LINES.length ? (
            <p className="script animate-fade-up text-3xl text-burgundy">So...</p>
          ) : null}
        </div>

        {shown > BUILDUP_LINES.length + 1 ? (
          <div className="animate-fade-up mt-10">
            <p className="script text-2xl shimmer-text">One last thing ❤️</p>
            <div className="mt-6">
              <Btn onClick={onNext}>Continue</Btn>
            </div>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 12. Final Bella video ---------------- */

function FinalVideo({ onNext }: { onNext: () => void }) {
  const [watched, setWatched] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setWatched(true), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Atmosphere petals={10} particles={14} />
      <Scene className="text-center">
        <h1 className="serif-title text-3xl text-burgundy">Before I ask you...</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          I just wanted you to see the person this whole thing was made for.
        </p>
        <div className="mx-auto mt-7 w-full max-w-[19rem]">
          <BellaVideoCard video={FEATURED.beforeTheQuestion} eager caption={undefined} />
        </div>
        {watched ? (
          <div className="animate-fade-up mt-8">
            <p className="script text-2xl text-burgundy">Okay...</p>
            <p className="mt-2 font-serif text-xl text-burgundy/90">Now I really have to ask.</p>
            <div className="mt-6">
              <Btn onClick={onNext}>Continue ❤️</Btn>
            </div>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 13. The question ---------------- */

function TheQuestion({ onYes, onWait }: { onYes: () => void; onWait: () => void }) {
  const bg = FEATURED.questionBackground;
  return (
    <div className="relative min-h-[100svh]">
      <video
        src={bg.src}
        poster={bg.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.36 0.1 12 / 78%), oklch(0.3 0.09 10 / 88%))",
        }}
      />
      <Atmosphere petals={18} particles={22} hearts={4} tone="dark" />

      <Scene className="text-center">
        <p className="script text-2xl text-cream/80">and so...</p>
        <h1
          className="serif-title mt-4 text-5xl tracking-[0.14em] text-cream animate-breathe"
          style={{ textShadow: "0 0 40px oklch(0.83 0.09 85 / 45%)" }}
        >
          BELLA...
        </h1>
        <p className="animate-fade-up mt-6 font-serif text-3xl leading-snug text-cream">
          Will you be my girlfriend? ❤️
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onYes}
            className="press w-full max-w-xs rounded-full py-4 font-serif text-2xl text-primary-foreground"
            style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-gold)" }}
          >
            YES ❤️
          </button>
          <button
            type="button"
            onClick={onWait}
            className="press w-full max-w-xs rounded-full glass-dark py-4 font-serif text-lg text-cream"
          >
            I need a little time 🥹
          </button>
        </div>
      </Scene>
    </div>
  );
}

/* ---------------- 15. Need time ---------------- */

function NeedTime({ onBack }: { onBack: () => void }) {
  return (
    <>
      <Atmosphere petals={10} particles={12} />
      <Scene className="text-center">
        <h1 className="serif-title text-3xl text-burgundy">That's okay, Bella. ❤️</h1>
        <Ornament />
        <div className="glass rounded-4xl px-6 py-8 text-left">
          <p className="font-serif text-lg leading-relaxed text-ink/90">
            I didn't make all of this to pressure you. I made it because you mean enough to me that I
            wanted to ask you properly.
          </p>
          <p className="mt-5 font-serif text-lg leading-relaxed text-ink/90">
            Take your time. Whatever your answer is, I'll appreciate your honesty.
          </p>
        </div>
        <div className="mt-9">
          <Btn onClick={onBack} variant="soft">
            Back ❤️
          </Btn>
        </div>
      </Scene>
    </>
  );
}

/* ---------------- 14. Yes ---------------- */

const YES_LINES = [
  "WAIT... REALLY?! 😭❤️",
  "Bella said YES.",
  "I think I'm officially the happiest person right now.",
  "Welcome to us. ❤️",
  "I promise I'm going to cherish you, appreciate you, annoy you occasionally, and love you through all the little moments.",
  "And yes... I know I'm probably going to stress you sometimes too 😂",
];

function YesScene({ onNext }: { onNext: () => void }) {
  const shown = useSequence(YES_LINES.length, 1900, 400);
  return (
    <>
      <Atmosphere petals={18} particles={20} hearts={8} />
      <Celebration />
      <Scene className="text-center">
        <div className="space-y-5">
          {YES_LINES.slice(0, shown).map((line, i) => (
            <p
              key={line}
              className={
                i === 0
                  ? "serif-title animate-fade-up text-4xl shimmer-text"
                  : i === 1
                    ? "script animate-fade-up text-3xl text-burgundy"
                    : "animate-fade-up font-serif text-lg leading-relaxed text-ink/90"
              }
            >
              {line}
            </p>
          ))}
        </div>
        {shown >= YES_LINES.length ? (
          <div className="animate-fade-up mt-10">
            <Btn onClick={onNext}>One last thing ❤️</Btn>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 16. Final love message ---------------- */

function FinalLoveMessage({ onNext }: { onNext: () => void }) {
  const shown = useSequence(FINAL_LETTER.length, 2000, 600);
  return (
    <>
      <Atmosphere petals={12} particles={16} hearts={4} />
      <Scene center={false} className="justify-center">
        <h1 className="serif-title text-center text-3xl text-burgundy">
          One Last Thing, Bella... ❤️
        </h1>
        <Ornament />
        <div className="mx-auto w-full max-w-[17rem]">
          <BellaVideoCard video={FEATURED.afterYes} caption={undefined} />
        </div>
        <article className="glass mt-8 rounded-4xl px-6 py-8">
          <div className="space-y-5">
            {FINAL_LETTER.slice(0, shown).map((line) => (
              <p key={line} className="animate-fade-up font-serif text-lg leading-relaxed text-ink/90">
                {line}
              </p>
            ))}
          </div>
        </article>
        {shown >= FINAL_LETTER.length ? (
          <div className="animate-fade-up mt-8 text-center">
            <p className="script text-2xl text-burgundy">Thank you for saying yes, Bella.</p>
            <p className="serif-title mt-4 text-4xl shimmer-text">I LOVE YOU. ❤️</p>
            <div className="mt-9">
              <Btn onClick={onNext} variant="soft">
                P.S. one condition 😂
              </Btn>
            </div>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 17. Funny ending ---------------- */

const FUNNY_LINES = [
  "I love you...",
  "I cherish you...",
  "I appreciate you...",
  "BUT PLEASE...",
  "Can you reduce the amount of stress you give me whenever you're annoyed? 😭😂",
  "I'm just one man, Bella.",
  "My heart is not built for this level of pressure. 😂",
];

const STATUS_LINES = [
  "Complaint submitted.",
  "Complaint reviewed.",
  "Complaint rejected because you're too cute. ❤️😂",
];

function FunnyEnding({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);
  const shown = useSequence(opened ? FUNNY_LINES.length : 0, 1400, 300);
  const statusShown = useSequence(
    shown >= FUNNY_LINES.length ? STATUS_LINES.length : 0,
    1500,
    1000,
  );

  return (
    <>
      <Atmosphere petals={8} particles={12} />
      <Scene className="text-center">
        <div className="glass rounded-4xl px-6 py-8">
          <h1 className="serif-title text-2xl text-burgundy">P.S. — One Important Condition 😂</h1>
          {!opened ? (
            <div className="mt-7">
              <Btn onClick={() => setOpened(true)} variant="soft">
                Open it 👀
              </Btn>
            </div>
          ) : (
            <div className="mt-6 space-y-3.5">
              {FUNNY_LINES.slice(0, shown).map((line, i) => (
                <p
                  key={line}
                  className={
                    i === 3
                      ? "script animate-fade-up text-3xl text-burgundy"
                      : "animate-fade-up font-serif text-lg text-ink/90"
                  }
                >
                  {line}
                </p>
              ))}

              {statusShown > 0 ? (
                <div className="mt-6 space-y-2 border-t border-border pt-5">
                  {STATUS_LINES.slice(0, statusShown).map((line, i) => (
                    <p
                      key={line}
                      className={`animate-fade-up text-sm ${
                        i === STATUS_LINES.length - 1 ? "text-burgundy" : "text-muted-foreground"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {statusShown >= STATUS_LINES.length ? (
          <div className="animate-fade-up mt-9">
            <Btn onClick={onNext}>Continue ❤️</Btn>
          </div>
        ) : null}
      </Scene>
    </>
  );
}

/* ---------------- 18. Final screen ---------------- */

function FinalScreen({ saidYes }: { saidYes: boolean }) {
  return (
    <>
      <Atmosphere petals={14} particles={18} hearts={7} />
      <Scene className="text-center">
        <div className="mx-auto w-full max-w-[16rem]">
          <BellaVideoCard video={FEATURED.finalScreen} eager caption={undefined} />
        </div>
        <Ornament />
        <p className="serif-title animate-fade-up text-3xl text-burgundy">
          Made specifically for Bella ❤️
        </p>
        <p className="script animate-fade-up mt-4 text-2xl text-burgundy/80">
          From someone who really, really likes you.
        </p>
        {saidYes ? (
          <p className="animate-fade-up mt-5 font-serif text-xl text-burgundy">
            And now gets to call you his girlfriend. 🥹❤️
          </p>
        ) : null}
        <div
          aria-hidden
          className="mt-12 h-24 w-full"
          style={{
            background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--blush) 55%, transparent))",
          }}
        />
      </Scene>
    </>
  );
}
