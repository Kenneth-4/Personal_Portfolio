"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  letterClassName?: string;
  staggerMs?: number;
};

export default function SplitText({
  text,
  className = "",
  letterClassName = "",
  staggerMs = 40,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-10% 0px", threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const letters = useMemo(() => {
    const nodes: { char: string; key: string; isSpace: boolean }[] = [];
    const str = text;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      const isSpace = c === " ";
      nodes.push({ char: isSpace ? "\u00A0" : c, key: `${c}-${i}`, isSpace });
    }
    return nodes;
  }, [text]);

  return (
    <div ref={containerRef} className={className} aria-label={text} role="heading">
      {letters.map((l, idx) => {
        const delay = `${idx * staggerMs}ms`;
        return (
          <span
            key={l.key}
            className={letterClassName}
            aria-hidden
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
              opacity: visible ? 1 : 0,
              transitionProperty: "transform, opacity",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: delay,
              willChange: "transform, opacity",
            }}
          >
            {l.char}
          </span>
        );
      })}
    </div>
  );
}


