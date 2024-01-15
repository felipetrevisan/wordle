"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { defaultConfig } from "@/config/game";
import { useLocalStorage } from "@/hooks/localStorage";
import { ContextProps, AppContextValue } from "@/interfaces/context";
import { StorageConfig } from "@/interfaces/game";

export const AppContext = createContext<AppContextValue | null>({
  storage: defaultConfig,
  isInfoModalOpen: false,
  isStatsModalOpen: false,
  isSettingsModalOpen: false,
  isMenuOpen: false,
  isLoading: false,
  setIsInfoModalOpen: () => {},
  setIsStatsModalOpen: () => {},
  setIsSettingsModalOpen: () => {},
  saveConfig: () => {},
  toggleMenu: () => {},
  openMenu: () => {},
  closeMenu: () => {},
  loading: () => {}
});

AppContext.displayName = "AppContextValue";

export const useApp = () => useContext(AppContext) as AppContextValue;

export function AppProvider({ children }: ContextProps) {
  const [config, setConfig] = useLocalStorage<StorageConfig | null>(
    "config",
    defaultConfig
  );
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loading = useCallback(() => {
    setTimeout(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, 0);
  }, [setIsLoading]);

  const saveConfig = useCallback(
    (data: Partial<StorageConfig>) => {
      const newConfig = { ...config, ...data };
      setConfig(newConfig);
    },
    [config, setConfig]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        storage: config,
        isInfoModalOpen,
        isStatsModalOpen,
        isSettingsModalOpen,
        isMenuOpen,
        isLoading,
        toggleMenu,
        openMenu,
        saveConfig,
        setIsInfoModalOpen,
        setIsStatsModalOpen,
        setIsSettingsModalOpen,
        closeMenu,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
