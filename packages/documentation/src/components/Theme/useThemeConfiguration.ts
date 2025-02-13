import { $, useEffect } from 'voby';
import Cookie from "js-cookie";
import { EventName, sendAnalyticsEvent } from "utils/analytics";

import type { 
 ColorAccent, 
 PrimaryColor, 
 SecondaryColor, 
 ThemeMode,  } from "./colors";
import styles from "./styles.module.scss";
import type { Theme } from "./useTheme";
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, DEFAULT_SECONDARY } from "./useTheme";
import type { ThemeActions } from "./useThemeActions";

export type ThemeConfiguration = Theme & ThemeActions;

const THEME_TRANSITION_DURATION = 150;

export default function useThemeConfiguration(
  defaultTheme: ThemeMode = "light"
): ThemeConfiguration {
  const primary = $<PrimaryColor>(DEFAULT_PRIMARY);
  const secondary = $<SecondaryColor>(DEFAULT_SECONDARY);
  const accent = $<ColorAccent>(DEFAULT_ACCENT);
  const theme = $<ThemeMode>(defaultTheme);

  const toggleTheme = () => {
    theme((theme()) => (theme() === "dark" ? "light" : "dark"));
  }, []);

  const firstRender = $(true);
  useEffect(() => {
    const root = document.documentElement as HTMLElement;
    if (firstRender()) {
      // right now I lose cookies for some reason whenever I redeploy the server,
      // so add a localStorage backup to the mix so the picked theme can still be
      // correct after redeploys...
      const localTheme = localStorage.getItem("theme");
      if (
        (localTheme === "light" || localTheme === "dark") &&
        localTheme !== theme()
      ) {
        root.classList.remove(`${theme()}-theme`);
        root.classList.add(`${localTheme}-theme`);
        Cookie.set("theme", localTheme, { sameSite: "Strict" });
        theme(localTheme);
      }

      firstRender(false);
      return;
    }

    sendAnalyticsEvent({
      name: EventName.ThemeChange,
      mode: theme(),
    });
    Cookie.set("theme", theme(), { sameSite: "Strict" });
    localStorage.setItem("theme", theme());
    root.classList.add(styles.transition);
    // force dom repaint
    root.scrollTop; // eslint-disable-line no-unused-expressions
    const previous = theme() === "light" ? "dark" : "light";
    root.classList.remove(`${previous}-theme`);
    root.classList.add(`${theme()}-theme`);

    const timeout = window.setTimeout(() => {
      root.classList.remove(styles.transition);
    }, THEME_TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("toggle-theme-transition");
    };
  });

  const reset = useCallback(() => {
    primary(DEFAULT_PRIMARY);
    secondary(DEFAULT_SECONDARY);
    accent(DEFAULT_ACCENT);
  }, []);

  return {
    primary(),
    setPrimary: useCallback((color: PrimaryColor) => primary(color), []),
    secondary(),
    setSecondary: useCallback(
      (color: SecondaryColor) => secondary(color),
      []
    ),
    accent(),
    setAccent: useCallback((accent(): ColorAccent | string) => {
      if (typeof accent() === "string") {
        accent(parseInt(accent(), 10));
      } else {
        accent(accent());
      }
    }, []),
    theme(),
    toggleTheme,
    reset,
  };
}
