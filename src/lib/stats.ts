import { gameSettings } from "@/config/game";
import {
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from "./localStorage";
import { GameMode, GameStats } from "@/interfaces/game";

export function addStatsForCompletedGame(
  gameStats: GameStats,
  count: number,
  maxChallenges: number,
  gameMode: string
) {
  const stats = { ...gameStats };

  stats.games += 1;

  if (count >= maxChallenges) {
    stats.curstreak = 0;
    stats.failed += 1;
  } else {
    stats.histo[count] += 1;
    stats.curstreak += 1;
    stats.wins += 1;

    if (stats.maxstreak < stats.curstreak) {
      stats.maxstreak = stats.curstreak;
    }
  }

  saveStatsToLocalStorage(stats, gameMode);

  return stats;
}

export function loadStats(gameMode: GameMode) {
  return (
    loadStatsFromLocalStorage(gameSettings[gameMode].name) ||
    ({
      histo: Array.from(
        new Array(gameSettings[gameMode].maxChallenges),
        () => 0
      ),
      failed: 0,
      curstreak: 0,
      maxstreak: 0,
      games: 0,
      wins: 0,
    } satisfies GameStats)
  );
}

export function getSuccessRate(gameStats: GameStats) {
  const { games, failed } = gameStats;

  return Math.round((100 * (games - failed)) / Math.max(games, 1));
}
