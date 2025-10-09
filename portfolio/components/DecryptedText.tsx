"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DecryptedTextProps = {
  text: string;
  className?: string;
  speedMs?: number;
  charset?: string;
};

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-_=<>/";

export default function DecryptedText({
  text,
  className = "",
  speedMs = 30,
  charset = DEFAULT_CHARSET,
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [output, setOutput] = useState<string>("");
  const cyclesRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const targetChars = useMemo(() => text.split("").map(c => (c === " " ? "\u00A0" : c)), [text]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    cyclesRef.current = targetChars.map(c => (c === "\u00A0" ? 0 : rand(4, 16)));
    const pick = () => charset[Math.floor(Math.random() * charset.length)];

    intervalRef.current = window.setInterval(() => {
      let done = true;
      const next = targetChars.map((c, i) => {
        const remaining = cyclesRef.current[i];
        if (remaining <= 0) return c;
        done = false;
        cyclesRef.current[i] = remaining - 1;
        return pick();
      });
      setOutput(next.join(""));
      if (done) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, speedMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [visible, targetChars, charset, speedMs]);

  return (
    <span ref={containerRef} className={className} aria-label={text} role="heading">
      {output || targetChars.map(() => " ").join("")}
    </span>
  );
}


