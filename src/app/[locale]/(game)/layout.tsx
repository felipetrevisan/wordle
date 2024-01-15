import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Modals } from "@/components/Modals";
import { GameProvider } from "@/contexts/GameContext";

type Props = {
  children: ReactNode;
};

export default function GameLayout({ children }: Props) {
  return (
    <GameProvider>
      <Header />
      {children}
      <Modals />
    </GameProvider>
  );
}
