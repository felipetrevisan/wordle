import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { REVEAL_TIME_MS } from "@/config/settings";

import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Status } from "@/lib/statuses";

import "./styles.scss";

const MotionButton = motion(Button);

type Props = {
  asChild?: boolean;
  children?: React.ReactNode;
  value: string;
  large?: boolean;
  status?: Status;
  isRevealing?: boolean;
  disabled: boolean;
  solution?: string;
  className?: string;
  onClick: (value: string) => void;
};

export function Key({
  value,
  children,
  large,
  status,
  isRevealing,
  disabled,
  solution,
  onClick,
  className,
}: Props) {
  const { storage } = useApp();
  const keyDelayMs = REVEAL_TIME_MS * (solution?.length ?? 0);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : "unset",
  };

  const classes = clsx("key", className, {
    "col-span-3": large,
    "col-span-2": !large,
    "transition ease-in-out": isRevealing,
    "key-absent": status === "absent",
    "key-correct inverted": status === "correct" && storage?.highContrast,
    "key-present inverted": status === "present" && storage?.highContrast,
    "key-correct": status === "correct" && !storage?.highContrast,
    "key-present": status === "present" && !storage?.highContrast,
    "pointer-events-none": disabled,
  });

  return (
    <MotionButton
      whileTap={{ scale: !disabled ? 0.9 : 1 }}
      style={styles}
      className={classes}
      onClick={handleClick}
      aria-label={`${value}${status ? " " + status : ""}`}
      disabled={disabled || status === "absent"}
      variant="default"
      size="xl"
    >
      {children || value}
    </MotionButton>
  );
}
