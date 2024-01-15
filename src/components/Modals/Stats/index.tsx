"use client";

import { useTranslations } from "next-intl";
import Countdown from "react-countdown";
import { Header } from "@/components/Stats/header";
import { Histogram } from "@/components/Stats/histogram";
import { GameStats } from "@/interfaces/game";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGame } from "@/contexts/GameContext";
import { Base } from "../base";

type Props = {
  isOpen: boolean;
  solution: string;
  guesses: string[];
  gameStats: GameStats;
  isLatestGame: boolean;
  isGameOver: boolean;
  isGameWon: boolean;
  numberOfGuessesMade: number;
  handleClose: () => void;
};

export function StatsModal({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isLatestGame,
  isGameOver,
  isGameWon,
  numberOfGuessesMade,
}: Props) {
  const { solutions } = useGame();
  const translate = useTranslations("stats");

  return (
    <Base
      title={translate("title")}
      isOpen={isOpen}
      showHeader
      handleClose={handleClose}
    >
      <Header gameStats={gameStats} />
      <h3 className="text-xl leading-6 text-foreground font-bold">
        {translate("guess_distribution_title")}
      </h3>
      <ScrollArea className="h-[300px] mt-2">
        <Histogram
          isLatestGame={isLatestGame}
          isGameWon={isGameWon}
          gameStats={gameStats}
          numberOfGuessesMade={numberOfGuessesMade}
        />
      </ScrollArea>
      {(isGameOver || isGameWon) && (
        <div className="mt-5 flex items-center justify-center text-center sm:mt-6">
          <div className="flex w-full text-left">
            {isLatestGame && (
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-2xl font-light">Proxima palavra em</h3>
                <Countdown
                  date={solutions.tomorrow}
                  daysInHours={true}
                  className="text-2xl font-light"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Base>
  );
}
