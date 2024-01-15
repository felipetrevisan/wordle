import React from "react";

import clsx from "clsx";

import { useApp } from "@/contexts/AppContext";
import { REVEAL_TIME_MS } from "@/config/settings";
import { Status } from "@/lib/statuses";

import "./styles.scss";

type Props = {
  guess?: string;
  value?: string | undefined;
  status?: Status;
  isRevealing?: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  isEndGame?: boolean;
  position?: number;
  currentClass?: string;
  readOnly?: boolean;
  size?: "large" | "small";
  onSelect?: () => void | undefined;
};

export function Tile({
  value = "",
  status,
  isRevealing = false,
  isCompleted = false,
  isActive = false,
  isEndGame = false,
  isSelected,
  position = 0,
  currentClass,
  readOnly,
  size = "large",
  onSelect,
}: Props) {
  const { storage } = useApp();
  const isFilledTile = value && !isCompleted && !isEndGame;
  const isActiveTile = isActive && !status && !isEndGame;
  const shouldRevealTile = isRevealing && isCompleted;
  const animationDelay = `${position * REVEAL_TIME_MS}ms`;

  const classes = clsx(`tile delay-[${animationDelay}]`, currentClass, {
    "tile-small": size === "small",
    "tile-active": isActiveTile,
    "tile-absent": status === "absent",
    "tile-correct inverted": status === "correct" && storage?.highContrast,
    "tile-present inverted": status === "present" && storage?.highContrast,
    "tile-correct": status === "correct" && !storage?.highContrast,
    "tile-present": status === "present" && !storage?.highContrast,
    "tile-scale": isFilledTile,
    "tile-reveal": shouldRevealTile,
    "pointer-events-none": readOnly || status,
    "p-2 w-11": size === "small",
  });

  return (
    <div className={classes} style={{ animationDelay }} onClick={onSelect}>
      <div className={`letter delay-[${animationDelay}]`}>{value}</div>
    </div>
  );
}
