import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["pt"] as const;
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
