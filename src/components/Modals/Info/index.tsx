"use client";

import { Tile } from "@/components/Tiles";
import { useGame } from "@/contexts/GameContext";
import { useTranslations } from "next-intl";
import { Base } from "../base";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const { getMaxChallenges } = useGame();
  const translate = useTranslations("info");

  return (
    <Base
      title="Como jogar"
      isOpen={isOpen}
      showHeader
      handleClose={handleClose}
    >
      <h4 className="text-left">
        {translate("description", { retries: getMaxChallenges() })}
      </h4>

      <ScrollArea className="h-[480px] mt-5">
        <div className="flex flex-col">
          <div className="grid items-center flex-grow gap-2 grid-cols-example grid-rows-example mt-6 mb-6">
            {translate("word_example_correct_spot")
              .toUpperCase()
              .split("")
              .map((letter) => (
                <Tile
                  key={letter}
                  value={letter}
                  isCompleted
                  status={
                    translate("word_example_correct_letter_spot") === letter
                      ? "correct"
                      : "absent"
                  }
                  isActive={false}
                  size="small"
                />
              ))}
          </div>
          <div className="flex gap-2 items-center text-left">
            {translate("description_letter")}{" "}
            <Tile
              value={translate(
                "word_example_correct_letter_spot"
              ).toUpperCase()}
              isCompleted
              status="correct"
              isActive={false}
              size="small"
            />{" "}
            {translate("description_correct_word_spot")}
          </div>

          <div className="grid items-center flex-grow gap-2 grid-cols-example grid-rows-example mt-6 mb-6">
            {translate("word_example_wrong_spot")
              .toUpperCase()
              .split("")
              .map((letter) => (
                <Tile
                  key={letter}
                  value={letter}
                  isCompleted
                  status={
                    translate("word_example_wrong_letter_spot") === letter
                      ? "present"
                      : "absent"
                  }
                  isActive={false}
                  size="small"
                />
              ))}
          </div>
          <div className="flex gap-2 items-center text-left">
            {translate("description_letter")}{" "}
            <Tile
              value={translate("word_example_wrong_letter_spot").toUpperCase()}
              isCompleted
              status="present"
              isActive={false}
              size="small"
            />{" "}
            {translate("description_wrong_word_spot")}
          </div>

          <div className="grid items-center flex-grow gap-2 grid-cols-example grid-rows-example mt-6 mb-6">
            {translate("word_example_absent_spot")
              .toUpperCase()
              .split("")
              .map((letter) => (
                <Tile
                  key={letter}
                  value={letter}
                  isCompleted
                  status="absent"
                  isActive={false}
                  size="small"
                />
              ))}
          </div>
          <div className="flex gap-2 items-center text-left">
            {translate("description_letter")}{" "}
            <Tile
              value={translate("word_example_absent_letter_spot").toUpperCase()}
              isCompleted
              status="absent"
              isActive={false}
              size="small"
            />{" "}
            {translate("description_absent_word_spot")}
          </div>
        </div>
      </ScrollArea>
    </Base>
  );
};
