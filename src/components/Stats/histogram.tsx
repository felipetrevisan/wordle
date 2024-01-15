import { defaultStats } from "@/config/game";
import { GameStats } from "@/interfaces/game";
import { Progress } from "./progress";

type Props = {
  gameStats: GameStats;
  isLatestGame: boolean;
  isGameWon: boolean;
  numberOfGuessesMade: number;
};

const isCurrentDayStatRow = (
  isLatestGame: boolean,
  isGameWon: boolean,
  numberOfGuessesMade: number,
  i: number
) => isLatestGame && isGameWon && numberOfGuessesMade === i + 1;

export function Histogram({
  gameStats,
  isLatestGame,
  isGameWon,
  numberOfGuessesMade,
}: Props) {
  const winDistribution = gameStats?.histo ?? defaultStats.histo;
  const maxValue = Math.max(...winDistribution, 1);

  return (
    <div className="my-10">
      {winDistribution.map((value: number, i: number) => (
        <Progress
          key={i}
          index={i}
          isCurrentDayStatRow={isCurrentDayStatRow(
            true,
            isGameWon,
            numberOfGuessesMade,
            i
          )}
          size={90 * (value / maxValue)}
          label={String(value)}
        />
      ))}
      <Progress
        index={-1}
        isCurrentDayStatRow={false}
        size={90 * (gameStats.failed / gameStats.games)}
        label={String(gameStats.failed)}
      />
    </div>
  );
}
