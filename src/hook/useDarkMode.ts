import { useEffect } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

type theme = "light" | "dark";

export function useDarkMode() {
  useEffect(() => {
    const root = window.document.documentElement;

    let theme = localStorage.getItem("theme");

    if (theme === null) {
      theme = Theme.LIGHT;
      localStorage.setItem("theme", theme);
    }

    root.classList.add(theme);
  }, []);
}

export function toggleTheme(theme: theme) {
  let currentTheme = localStorage.getItem("theme");
  const root = window.document.documentElement;

  if (theme === currentTheme) return;

  if (theme === Theme.LIGHT) {
    root.classList.remove(Theme.DARK);
    localStorage.setItem("theme", Theme.LIGHT);
  } else {
    root.classList.add(Theme.DARK);
    localStorage.setItem("theme", Theme.DARK);
  }
}
