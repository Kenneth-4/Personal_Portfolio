"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/40 backdrop-blur p-2 text-black dark:text-white shadow-sm hover:bg-white/90 dark:hover:bg-black/60 transition"
      >
        {/* Burger icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Dropdown panel (right side) */}
      {open && (
        <div
          ref={panelRef}
          className="fixed top-16 right-4 z-[60] md:hidden w-72 max-w-[90vw] rounded-2xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-black/70 backdrop-blur shadow-lg text-black dark:text-white"
          role="menu"
          aria-label="Mobile menu"
        >
          <div className="p-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <span className="font-bold">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/20 p-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="p-2 grid gap-1 text-sm font-semibold">
            <a href="#techstack" onClick={close} className="rounded-xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">TechStack</a>
            <a href="#projects" onClick={close} className="rounded-xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Projects</a>
            <a href="#certificate" onClick={close} className="rounded-xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Certificates</a>

          </nav>

        </div>
      )}
    </>
  );
}


