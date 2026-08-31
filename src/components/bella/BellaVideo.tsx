import { useEffect, useRef, useState } from "react";
import type { BellaVideo as BellaVideoType } from "@/media/config";

type Props = {
  video: BellaVideoType;
  caption?: string | undefined;
  className?: string;
  autoPlayMuted?: boolean;
  eager?: boolean;
};

/**
 * Lazy, mobile-friendly video card. Nothing downloads until the card is close
 * to the viewport, and playback only begins when Bella taps play.
 */
export function BellaVideoCard({
  video,
  caption,
  className = "",
  autoPlayMuted = false,
  eager = false,
}: Props) {
  const holder = useRef<HTMLDivElement | null>(null);
  const el = useRef<HTMLVideoElement | null>(null);
  const [near, setNear] = useState(eager);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (near || !holder.current) return;
    const node = holder.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [near]);

  const play = () => {
    setStarted(true);
    const node = el.current;
    if (!node) return;
    node.muted = autoPlayMuted ? true : node.muted;
    void node.play().catch(() => {});
  };

  return (
    <figure ref={holder} className={`group relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-3xl bg-secondary gold-hairline"
        style={{ boxShadow: "var(--shadow-soft)", aspectRatio: "9 / 16" }}
      >
        {near ? (
          <video
            ref={el}
            src={video.src}
            poster={video.poster}
            controls={started}
            playsInline
            preload="metadata"
            muted={autoPlayMuted}
            loop={autoPlayMuted}
            {...(autoPlayMuted ? { autoPlay: true } : {})}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={video.poster}
            alt={caption ?? "A little video of Bella"}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        {!started && !autoPlayMuted ? (
          <button
            type="button"
            onClick={play}
            aria-label="Play video"
            className="press absolute inset-0 flex items-center justify-center bg-gradient-to-t from-burgundy/40 via-transparent to-transparent"
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full glass text-2xl text-burgundy animate-breathe"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              ▶
            </span>
          </button>
        ) : null}
      </div>

      {caption ? (
        <figcaption className="script mt-3 text-center text-xl text-burgundy/85">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
