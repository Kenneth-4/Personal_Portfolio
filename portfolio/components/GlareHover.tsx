"use client";

import React, { useEffect, useRef } from "react";

const GlareHover: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
  roundedClassName?: string;
}> = ({ children, className = "", strength = 200, roundedClassName = "rounded-2xl" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glare = glareRef.current;
    if (!container || !glare) return;

    function onMove(e: MouseEvent) {
      if (!container || !glare) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;

      container.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      glare.style.background = `radial-gradient(${strength}px ${strength}px at ${x}px ${y}px, rgba(255,255,255,0.35), transparent 60%)`;
    }

    function onLeave() {
      if (!container || !glare) return;
      container.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      glare.style.background = "radial-gradient(200px 200px at 50% 50%, rgba(255,255,255,0), transparent)";
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={`relative [transform-style:preserve-3d] transition-transform duration-300 ${className}`}>
      <div ref={glareRef} className={`absolute inset-0 pointer-events-none ${roundedClassName}`} />
      {children}
    </div>
  );
};

export default GlareHover;
