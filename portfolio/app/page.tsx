"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = stored ? stored === "dark" : prefersDark;
    root.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <div className="min-h-dvh">
      <button
        type="button"
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-black/40 backdrop-blur px-3 py-2 text-sm font-medium text-black dark:text-white shadow-sm hover:bg-white/100 dark:hover:bg-black/60 transition-colors"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}
