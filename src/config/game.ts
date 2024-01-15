import { GameStats, StorageConfig } from "@/interfaces/game";

export const gameSettings = {
  1: { maxChallenges: 6, name: "term" },
  2: { maxChallenges: 7, name: "duo" },
  3: { maxChallenges: 8, name: "trio" },
  4: { maxChallenges: 9, name: "four" },
};

export const defaultConfig = {
  hardMode: false,
  highContrast: false,
} satisfies StorageConfig;

export const defaultStats = {
  histo: [0, 0, 0, 0, 0, 0],
  curstreak: 0,
  maxstreak: 0,
  games: 0,
  wins: 0,
  failed: 0,
} satisfies GameStats;
