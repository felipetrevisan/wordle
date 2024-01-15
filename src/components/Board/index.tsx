"use client";

import { useGame } from "@/contexts/GameContext";
import { Grid } from "../Grid";

type Props = {
  solutions: string[];
  isRevealing?: boolean;
  isEndGame?: boolean;
  currentRowClass: string;
  readOnly?: boolean;
};

export function Boards({
  solutions,
  isRevealing,
  isEndGame = false,
  currentRowClass,
}: Props) {
  const { gameMode } = useGame();

  return (
    <>
      {Array.from({ length: gameMode }).map((_, index) => (
        <Grid
          key={index}
          index={index}
          solution={solutions[index]}
          isRevealing={isRevealing}
          isEndGame={isEndGame}
          currentRowClass={currentRowClass}
        />
      ))}
    </>
  );
}
