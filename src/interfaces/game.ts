export enum GameMode {
  term = 1,
  duo = 2,
  trio = 3,
  four = 4,
}

export type GameStats = {
  histo: number[];
  curstreak: number;
  maxstreak: number;
  games: number;
  wins: number;
  failed: number;
};

export type GameState = {
  curday: number;
  curRow: number;
  curTry: string;
  tries: string[];
  invalids: string[];
  solution: string;
  gameOver: boolean;
  won: boolean;
};

export type GameStored = {
  meta: {};
  config: StorageConfig;
  state: GameState[];
  stats: GameStats;
};

export type Storage = {
  config: StorageConfig;
};

export type StorageConfig = {
  hardMode?: boolean;
  highContrast?: boolean;
};

export type Solution = {
  solutionIndex: number;
  solutionDate: Date;
  tomorrow: number;
  solution: string[];
};
