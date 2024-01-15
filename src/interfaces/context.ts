import { GameMode, GameStats, Solution, StorageConfig } from "./game";

export interface ContextProps {
  children: React.ReactNode;
}

export type AppContextValue = {
  storage: StorageConfig | null;
  isInfoModalOpen: boolean;
  isStatsModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isMenuOpen: boolean;
  isLoading: boolean;
  setIsInfoModalOpen: (status: boolean) => void;
  setIsStatsModalOpen: (status: boolean) => void;
  setIsSettingsModalOpen: (status: boolean) => void;
  saveConfig: (data: StorageConfig) => void;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  loading: () => void;
};

export type GameContextValue = {
  gameMode: GameMode;
  solutions: Solution;
  currentRow: number;
  currentGuess: string;
  guesses: string[];
  invalidGuesses: string[];
  stats: GameStats;
  selectedTileIndex: number;
  selectedRowIndex: number;
  changeGameMode: (type: GameMode) => void;
  clearGuesses: () => void;
  setCurrentGuess: (guess: string) => void;
  setGuesses: (guesses: string[]) => void;
  setInvalidGuesses: (guesses: string[]) => void;
  setSelectedTileIndex: (index: number) => void;
  setSelectedRowIndex: (index: number) => void;
  setCurrentRow: (row: number) => void;
  setStats: (stats: GameStats) => void;
  onTyping: (
    value: string,
    currentSolution: string,
    maxChallenges: number,
    isGameWon: boolean
  ) => void;
  onDelete: () => void;
  getMaxChallenges: () => number;
  getName: () => string;
  isTerm: () => boolean;
  isDuo: () => boolean;
  isTrio: () => boolean;
  isFour: () => boolean;
};
