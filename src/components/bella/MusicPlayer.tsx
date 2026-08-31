import { useEffect, useRef, useState } from "react";
import { SONGS } from "@/media/config";

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Custom player for Bella's three songs. One track at a time, never autoplays. */
export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  const song = SONGS[current]!;

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume, current]);

  const select = (index: number) => {
    if (index === current) {
      toggle();
      return;
    }
    setCurrent(index);
    setTime(0);
    setDuration(0);
    setPlaying(true);
    requestAnimationFrame(() => {
      void audio.current?.play().catch(() => setPlaying(false));
    });
  };

  const toggle = () => {
    const node = audio.current;
    if (!node) return;
    if (node.paused) {
      void node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      node.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="glass rounded-4xl p-5">
      <audio
        ref={audio}
        src={song.src}
        preload="none"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <p className="script text-center text-2xl text-burgundy">{song.title}</p>
      <p className="mt-1 text-center text-xs tracking-[0.22em] text-muted-foreground uppercase">
        {song.artist}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="press flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl text-primary-foreground"
          style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-petal)" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <div className="min-w-0 flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            aria-label="Song progress"
            onChange={(e) => {
              const v = Number(e.target.value);
              setTime(v);
              if (audio.current) audio.current.currentTime = v;
            }}
            className="h-1.5 w-full appearance-none rounded-full accent-primary"
            style={{
              background: `linear-gradient(to right, var(--rose) ${
                duration ? (time / duration) * 100 : 0
              }%, color-mix(in oklab, var(--rose) 22%, white) 0%)`,
            }}
          />
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>{fmt(time)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span aria-hidden className="text-sm text-burgundy/70">
          ♪
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          aria-label="Volume"
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1.5 flex-1 appearance-none rounded-full accent-primary"
          style={{
            background: `linear-gradient(to right, var(--rose) ${volume * 100}%, color-mix(in oklab, var(--rose) 20%, white) 0%)`,
          }}
        />
      </div>

      <ul className="mt-6 space-y-2.5">
        {SONGS.map((s, i) => {
          const active = i === current;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => select(i)}
                className={`press flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ${
                  active ? "gold-hairline bg-accent/70" : "border border-border bg-card/60"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${
                    active ? "text-primary-foreground" : "text-burgundy"
                  }`}
                  style={active ? { background: "var(--gradient-rose)" } : { background: "var(--secondary)" }}
                >
                  {active && playing ? "❚❚" : "▶"}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-serif text-lg text-burgundy">{s.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{s.artist}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
