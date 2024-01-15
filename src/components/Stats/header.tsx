import { useEffect } from "react";
import {
  MotionValue,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";

import { getSuccessRate } from "@/lib/stats";
import { GameStats } from "@/interfaces/game";

type Props = {
  gameStats: GameStats | undefined;
};

const StatItem = ({
  label,
  value,
  isPercentage = false,
}: {
  label: string;
  value: MotionValue<number>;
  isPercentage?: boolean;
}) => {
  return (
    <div className="m-1 w-1/4 items-center justify-center dark:text-white">
      <motion.div className="text-4xl font-bold">
        <motion.span>{value}</motion.span>
        {isPercentage && <motion.span>%</motion.span>}
      </motion.div>
      <div className="text-md">{label}</div>
    </div>
  );
};

export function Header({ gameStats }: Props) {
  const translate = useTranslations("stats");

  const totalGames = useMotionValue(0);
  const totalGamesValue = useTransform(totalGames, (latest) =>
    Math.round(latest)
  );

  const successRate = useMotionValue(0);
  const successRateValue = useTransform(successRate, (latest) =>
    Math.round(latest)
  );

  const currentStreak = useMotionValue(0);
  const currentStreakValue = useTransform(currentStreak, (latest) =>
    Math.round(latest)
  );

  const bestStreak = useMotionValue(0);
  const bestStreakValue = useTransform(bestStreak, (latest) =>
    Math.round(latest)
  );

  const percentSuccessRate = gameStats ? getSuccessRate(gameStats) : 0;

  useEffect(() => {
    const animationTotalGames = animate(totalGames, gameStats?.games ?? 0, {
      duration: 1,
    });
    const animationSuccessRate = animate(successRate, percentSuccessRate, {
      duration: 1,
      delay: 0.3,
    });
    const animationCurrentStreak = animate(
      currentStreak,
      gameStats?.curstreak ?? 0,
      { duration: 1, delay: 0.6 }
    );
    const animationBestStreak = animate(bestStreak, gameStats?.maxstreak ?? 0, {
      duration: 1,
      delay: 0.9,
    });

    return (
      animationTotalGames.stop &&
      animationSuccessRate.stop &&
      animationCurrentStreak.stop &&
      animationBestStreak.stop
    );
  }, []);

  return (
    <div className="mb-10 p-5 backdrop-blur-lg flex justify-center text-center bg-primary/20 rounded-xl">
      <StatItem label={translate("games")} value={totalGamesValue} />
      <StatItem
        label={translate("success_rate")}
        value={successRateValue}
        isPercentage
      />
      <StatItem
        label={translate("current_streak")}
        value={currentStreakValue}
      />
      <StatItem label={translate("best_streak")} value={bestStreakValue} />
    </div>
  );
}
