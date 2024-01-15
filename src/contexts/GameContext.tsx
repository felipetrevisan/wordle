"use client";

import { createContext, useCallback, useContext, useState } from "react";
import GraphemeSplitter from "grapheme-splitter";
import { gameSettings, defaultStats } from "@/config/game";
import { ContextProps, GameContextValue } from "@/interfaces/context";
import { GameMode, GameStats, Solution } from "@/interfaces/game";
import { loadStats } from "@/lib/stats";
import { getGameDate, getSolution, unicodeLength } from "@/lib/words";

export const GameContext = createContext<GameContextValue | null>({
  gameMode: GameMode.term,
  solutions: {} as Solution,
  currentRow: 1,
  currentGuess: "",
  guesses: [],
  invalidGuesses: [],
  stats: defaultStats as GameStats,
  selectedTileIndex: 0,
  selectedRowIndex: 0,
  changeGameMode: () => {},
  clearGuesses: () => {},
  setCurrentGuess: () => {},
  setGuesses: () => {},
  setInvalidGuesses: () => {},
  setStats: () => {},
  setSelectedTileIndex: () => {},
  setSelectedRowIndex: () => {},
  setCurrentRow: () => {},
  onTyping: () => {},
  onDelete: () => {},
  getMaxChallenges: () => 0,
  getName: () => "",
  isTerm: () => false,
  isDuo: () => false,
  isTrio: () => false,
  isFour: () => false,
});

GameContext.displayName = "GameContextValue";

export const useGame = () => useContext(GameContext) as GameContextValue;

export const GameProvider: React.FC<ContextProps> = ({ children }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(1);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.term);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [invalidGuesses, setInvalidGuesses] = useState<string[]>([]);
  const [stats, setStats] = useState<GameStats>(() => loadStats(gameMode));
  const [solutions, setSolutions] = useState<Solution>(() =>
    getSolution(getGameDate(), gameMode)
  );

  const changeGameMode = useCallback(
    (mode: GameMode) => {
      resetGame();
      setGameMode(mode);
      setSolutions(getSolution(getGameDate(), mode));
    },
    [gameMode]
  );

  const clearGuesses = useCallback(() => setGuesses([]), []);
  const resetGame = useCallback(() => {
    clearGuesses();
    setCurrentGuess("");
    setInvalidGuesses([]);
  }, []);

  const getMaxChallenges = useCallback(() => {
    return gameSettings[gameMode].maxChallenges ?? 6;
  }, [gameMode]);

  const getName = useCallback(() => {
    return gameSettings[gameMode].name ?? "";
  }, [gameMode]);

  const isTerm = useCallback(() => {
    return gameMode === GameMode.term;
  }, [gameMode]);

  const isDuo = useCallback(() => {
    return gameMode === GameMode.duo;
  }, [gameMode]);

  const isTrio = useCallback(() => {
    return gameMode === GameMode.trio;
  }, [gameMode]);

  const isFour = useCallback(() => {
    return gameMode === GameMode.four;
  }, [gameMode]);

  const onTyping = useCallback(
    (
      value: string,
      currentSolution: string,
      maxChallenges: number,
      isGameWon: boolean
    ) => {
      if (
        unicodeLength(`${currentGuess}${value}`) <= currentSolution.length &&
        guesses.length < maxChallenges &&
        !isGameWon
      ) {
        setCurrentGuess(`${currentGuess}${value}`);
      }
    },
    [currentGuess, guesses.length]
  );

  const onDelete = useCallback(() => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join("")
    );
  }, [currentGuess]);

  return (
    <GameContext.Provider
      value={{
        gameMode,
        solutions,
        currentRow,
        currentGuess,
        guesses,
        invalidGuesses,
        stats,
        selectedTileIndex,
        selectedRowIndex,
        changeGameMode,
        clearGuesses,
        setCurrentGuess,
        setGuesses,
        setInvalidGuesses,
        setStats,
        setSelectedTileIndex,
        setSelectedRowIndex,
        setCurrentRow,
        onTyping,
        onDelete,
        getMaxChallenges,
        getName,
        isTerm,
        isDuo,
        isTrio,
        isFour,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
