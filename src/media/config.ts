/**
 * CENTRAL MEDIA + CONTENT CONFIGURATION
 * -------------------------------------
 * Everything editable lives here: videos, music, the PIN, the counter start
 * date and the written messages. Media files are Bella's real uploaded files,
 * stored permanently on the project CDN (see the *.asset.json pointers).
 */

import v1 from "./bella-1.mp4.asset.json";
import v2 from "./bella-2.mp4.asset.json";
import v3 from "./bella-3.mp4.asset.json";
import v4 from "./bella-4.mp4.asset.json";
import v5 from "./bella-5.mp4.asset.json";
import v6 from "./bella-6.mp4.asset.json";

import p1 from "./bella-1.jpg.asset.json";
import p2 from "./bella-2.jpg.asset.json";
import p3 from "./bella-3.jpg.asset.json";
import p4 from "./bella-4.jpg.asset.json";
import p5 from "./bella-5.jpg.asset.json";
import p6 from "./bella-6.jpg.asset.json";

import flowers from "./flowers.mp3.asset.json";
import loveToLose from "./love-to-lose.mp3.asset.json";
import loveFromDistance from "./love-you-from-a-distance.mp3.asset.json";

export type BellaVideo = {
  id: string;
  src: string;
  poster: string;
  caption: string;
};

export const VIDEOS: Record<string, BellaVideo> = {
  one: { id: "one", src: v1.url, poster: p1.url, caption: "Pretty girl \u2764\ufe0f" },
  two: { id: "two", src: v2.url, poster: p2.url, caption: "One of my favorites." },
  three: { id: "three", src: v3.url, poster: p3.url, caption: "This smile though..." },
  four: { id: "four", src: v4.url, poster: p4.url, caption: "How are you this beautiful?" },
  five: {
    id: "five",
    src: v5.url,
    poster: p5.url,
    caption: "You really don't know what you do to me \ud83d\ude02\u2764\ufe0f",
  },
  six: { id: "six", src: v6.url, poster: p6.url, caption: "Yeah... this one stays." },
};

/** Ordered list used by the scrapbook section. */
export const SCRAPBOOK: BellaVideo[] = [
  VIDEOS["one"]!,
  VIDEOS["five"]!,
  VIDEOS["two"]!,
  VIDEOS["four"]!,
  VIDEOS["six"]!,
  VIDEOS["three"]!,
];

/** Featured picks for the special moments of the experience. */
export const FEATURED = {
  surprise: VIDEOS["two"]!,
  beforeTheQuestion: VIDEOS["one"]!,
  questionBackground: VIDEOS["four"]!,
  afterYes: VIDEOS["five"]!,
  finalScreen: VIDEOS["six"]!,
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

export const SONGS: Song[] = [
  { id: "flowers", title: "Flowers", artist: "Samantha Ebert", src: flowers.url },
  {
    id: "love-to-lose",
    title: "Love To Lose",
    artist: "Sandro Cavazza & Georgia Ku",
    src: loveToLose.url,
  },
  {
    id: "love-you-from-a-distance",
    title: "Love You From A Distance",
    artist: "Ashley Kutcher",
    src: loveFromDistance.url,
  },
];

/** The unlock code. Change it here only. */
export const PIN = "2007";

/** Counter start — the moment she became someone special. Edit freely. */
export const COUNTER_START = new Date("2026-04-08T20:00:00+01:00");

export const LETTER = [
  "I could have just sent you a simple text and asked you, but honestly, I didn't want to do that.",
  "I wanted to do something that would show you that I actually put thought and effort into this.",
  "You've become someone genuinely special to me.",
  "I love the conversations, the laughs, the little moments, and even the moments where you somehow manage to stress me out \ud83d\ude02.",
  "I've realized that I don't just want to keep wondering what this could become.",
  "I want to actually ask you.",
];

export const FINAL_LETTER = [
  "I don't know exactly what every day ahead of us will look like, but I know I want to experience it with you.",
  "I want the random conversations, the laughs, the late-night talks, the little disagreements we'll probably have \ud83d\ude02, the memories, the growth, and everything in between.",
  "I want to know you more deeply.",
  "I want to make you feel appreciated.",
  "And most importantly, I want you to always know that you are cherished.",
];

export type ThingCard = {
  title: string;
  body: string;
  video?: BellaVideo;
};

export const THINGS: ThingCard[] = [
  {
    title: "Your Smile \u2764\ufe0f",
    body: "There's something about your smile that can change my entire mood.",
    video: VIDEOS["three"]!,
  },
  {
    title: "Your Personality \ud83c\udf38",
    body: "You have your own way of being you, and honestly, that's one of the things I adore about you.",
  },
  {
    title: "The Little Things",
    body: "Sometimes it's not even the big moments. It's the random little things you do that stay in my head.",
    video: VIDEOS["six"]!,
  },
  {
    title: "Your Presence",
    body: "Even when we're doing our own things, I'm still happy knowing you're there.",
  },
  {
    title: "You.",
    body: "Honestly, Bella... I could keep going, but then you'd start getting too proud. \ud83d\ude02\u2764\ufe0f",
  },
];

export const BUILDUP_LINES = [
  "Bella...",
  "I've been wanting to ask you something.",
  "And I don't want to ask you casually.",
  "Because you're not casual to me.",
  "You're someone I genuinely care about.",
  "Someone I cherish.",
  "Someone I want to build something real with.",
];
