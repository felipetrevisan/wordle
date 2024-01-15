import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Montserrat, Bebas_Neue } from "next/font/google";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "@/theme-provider";
import "../globals.scss";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head />
      <body className={`${montserrat.variable} ${bebas.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
          <NextIntlClientProvider messages={messages}>
            <AppProvider>{children}</AppProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
