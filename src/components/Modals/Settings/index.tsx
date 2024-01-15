"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import ComputerIcon from "@mui/icons-material/ComputerRounded";
import { useGame } from "@/contexts/GameContext";
import { useApp } from "@/contexts/AppContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Base } from "../base";
import { GameMode } from "@/interfaces/game";

type Props = {
  isOpen: boolean;
  disableHardModeOption: boolean;
  handleClose: () => void;
};

export const SettingsModal = ({
  isOpen,
  handleClose,
  disableHardModeOption,
}: Props) => {
  const { setTheme, theme } = useTheme();
  const { storage, saveConfig } = useApp();
  const { gameMode, guesses } = useGame();
  const translateSettings = useTranslations("settings");
  const translateAlerts = useTranslations("alerts");
  const form = useForm({
    defaultValues: {
      hardmode_setting: storage?.hardMode ?? false,
      highcontrast_setting: storage?.highContrast ?? false,
      theme_setting: theme ?? "dark",
    },
  });

  const handleHardMode = useCallback(
    (isHard: boolean) => {
      if (guesses.length === 0 || storage?.hardMode) {
        saveConfig({ hardMode: isHard });
      } else {
        toast.error(translateAlerts("hard_mode_enabled"));
      }
    },
    [guesses.length, saveConfig, storage?.hardMode]
  );

  const handleHighContrastMode = useCallback(
    (isHighContrast: boolean) => {
      saveConfig({ highContrast: isHighContrast });
    },
    [saveConfig]
  );

  return (
    <Base
      title={translateSettings("title")}
      isOpen={isOpen}
      showHeader
      handleClose={handleClose}
    >
      <Form {...form}>
        <div className="space-y-4">
          {gameMode === GameMode.term && (
            <FormField
              control={form.control}
              name="hardmode_setting"
              defaultValue={storage?.hardMode}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>
                      {translateSettings("hardMode_setting")}
                    </FormLabel>
                    <FormDescription>
                      {translateSettings("hardMode_setting_desc")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={handleHardMode}
                      disabled={disableHardModeOption}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="highcontrast_setting"
            defaultValue={storage?.highContrast}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>
                    {translateSettings("highContrastMode_setting")}
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={handleHighContrastMode}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theme_setting"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>{translateSettings("theme_setting")}</FormLabel>
                </div>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    defaultValue={field.value}
                    onValueChange={(value) => setTheme(value)}
                  >
                    <ToggleGroupItem value="light">
                      <LightModeIcon />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system">
                      <ComputerIcon />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark">
                      <DarkModeIcon />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </Base>
  );
};
