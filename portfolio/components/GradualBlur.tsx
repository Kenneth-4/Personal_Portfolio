"use client";

import { useEffect, useRef, useState } from "react";

type GradualBlurProps = {
  children: React.ReactNode;
  className?: string;
  blurStrength?: number;
  threshold?: number;
};

export default function GradualBlur({
  children,
  className = "",
  blurStrength = 10,
  threshold = 0.5,
}: GradualBlurProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [blur, setBlur] = useState(blurStrength);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio;
          const newBlur = blurStrength * (1 - ratio);
          setBlur(Math.max(0, newBlur));
        }
      },
      { threshold: Array.from({ length: 10 }, (_, i) => i * 0.1) }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [blurStrength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        filter: `blur(${blur}px)`,
        transition: "filter 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
}
