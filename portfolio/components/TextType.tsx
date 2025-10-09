"use client";

import { useEffect, useRef, useState } from "react";

type TextTypeProps = {
  text: string;
  className?: string;
  speedMs?: number;
  cursorClassName?: string;
};

export default function TextType({
  text,
  className = "",
  speedMs = 80,
  cursorClassName = "",
}: TextTypeProps) {
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timerRef = useRef<number | null>(null);
  const cursorRef = useRef<number | null>(null);

  useEffect(() => {
    // typing
    timerRef.current = window.setInterval(() => {
      setCount((c) => (c < text.length ? c + 1 : c));
    }, speedMs);
    // cursor blink
    cursorRef.current = window.setInterval(() => {
      setShowCursor((s) => !s);
    }, 500);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (cursorRef.current) window.clearInterval(cursorRef.current);
    };
  }, [text, speedMs]);

  const visible = text.slice(0, count);

  return (
    <div className={className} aria-label={text} role="heading">
      {visible}
      <span
        aria-hidden
        className={cursorClassName}
        style={{
          display: "inline-block",
          width: "0.6ch",
          translate: "0 0.1em",
          borderBottom: showCursor ? "2px solid currentColor" : "2px solid transparent",
          transition: "border-color 150ms ease",
        }}
      />
    </div>
  );
}


