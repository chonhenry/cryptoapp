import { useEffect } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

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

export function toggleTheme() {
  let theme = localStorage.getItem("theme");
  const root = window.document.documentElement;

  if (theme === Theme.DARK) {
    root.classList.remove(Theme.DARK);
    localStorage.setItem("theme", Theme.LIGHT);
  } else {
    root.classList.add(Theme.DARK);
    localStorage.setItem("theme", Theme.DARK);
  }
}
