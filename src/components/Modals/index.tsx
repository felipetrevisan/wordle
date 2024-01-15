"use client";

import { useGame } from "@/contexts/GameContext";
import { useApp } from "@/contexts/AppContext";
import { InfoModal } from "./Info";
import { SettingsModal } from "./Settings";

export const Modals = () => {
  const {
    isInfoModalOpen,
    isSettingsModalOpen,
    setIsInfoModalOpen,
    setIsSettingsModalOpen,
  } = useApp();

  const { guesses } = useGame();

  return (
    <>
      {isInfoModalOpen && (
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
      )}
      {isSettingsModalOpen && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          disableHardModeOption={!!guesses.length}
        />
      )}
    </>
  );
};
