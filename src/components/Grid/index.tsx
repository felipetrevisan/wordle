"use client";

import React from "react";
import clsx from "clsx";

import { CompletedTile } from "@/components/Tiles/completed";
import { CurrentTile } from "@/components/Tiles/current";
import { EmptyTile } from "@/components/Tiles/empty";
import { useGame } from "@/contexts/GameContext";

type Props = {
  index: number;
  solution: string;
  currentRowClass: string;
  isRevealing?: boolean;
  isEndGame?: boolean;
  readOnly?: boolean;
};

export function Grid({
  index,
  solution,
  isRevealing = false,
  isEndGame = false,
  currentRowClass,
}: Props) {
  const {
    getMaxChallenges,
    isTerm,
    isDuo,
    isTrio,
    isFour,
    guesses,
    currentGuess,
  } = useGame();

  const empties =
    guesses.length < getMaxChallenges() - 1
      ? Array.from({ length: getMaxChallenges() - 1 - guesses.length })
      : [];

  const classes = clsx(
    "container grid justify-center items-center flex-grow grid-cols-board gap-[.3rem] w-full h-full",
    {
      "grid-rows-default": isTerm(),
      "grid-rows-duo gap-[.8rem] text-sm": isDuo(),
      "grid-rows-trio": isTrio(),
      "grid-rows-four": isFour(),
    }
  );

  return (
    <div className={classes} data-type="board" data-board={index}>
      {guesses.map((guess, index) => (
        <CompletedTile
          key={index}
          guess={guess.toUpperCase()}
          isRevealing={isRevealing && guesses.length - 1 === index}
          solution={solution}
          isEndGame={isEndGame}
        />
      ))}
      {guesses.length < getMaxChallenges() && (
        <CurrentTile
          guess={currentGuess.toUpperCase()}
          currentClass={currentRowClass}
          isActive={true}
          isEndGame={isEndGame}
        />
      )}
      {empties.map((_, index) => (
        <EmptyTile key={index} />
      ))}
    </div>
  );
}
