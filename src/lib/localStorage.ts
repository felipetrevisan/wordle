import { defaultStats } from "@/config/game";
import { GameState, GameStored, GameStats } from "@/interfaces/game";

const gameStateKey = "state";
const statsKey = "stats";

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: GameState[],
  gameMode: string
) => {
  if (typeof window !== "undefined") {
    //const key = isLatestGame ? gameStateKey : archiveGameStateKey;
    const storage = localStorage.getItem(gameMode);
    let value = null;

    if (storage) {
      const data = JSON.parse(storage);
      value = JSON.stringify({ ...data, [gameStateKey]: gameState });
    } else {
      value = JSON.stringify({
        [gameStateKey]: gameState,
        [statsKey]: defaultStats,
      });
    }

    localStorage.setItem(gameMode, value);
  }
};

export const loadGameStateFromLocalStorage = (
  isLatestGame: boolean,
  gameMode: string
): GameState[] => {
  if (typeof window !== "undefined") {
    const storage = localStorage.getItem(gameMode);

    if (storage) {
      return (JSON.parse(storage) as GameStored).state;
    }

    return [];
  }

  return [];
};

export const saveStatsToLocalStorage = (stats: GameStats, gameMode: string) => {
  if (typeof window !== "undefined") {
    const storage = localStorage.getItem(gameMode);
    let value = null;

    if (storage) {
      const data = JSON.parse(storage);

      value = JSON.stringify({ ...data, [statsKey]: stats });
    } else {
      value = JSON.stringify({ [statsKey]: stats });
    }
    localStorage.setItem(gameMode, value);
  }
};

export const loadStatsFromLocalStorage = (gameMode: string): GameStats => {
  if (typeof window !== "undefined") {
    const storage = localStorage.getItem(gameMode);

    if (storage) {
      return (JSON.parse(storage) as GameStored).stats;
    }

    return defaultStats;
  }

  return defaultStats;
};
