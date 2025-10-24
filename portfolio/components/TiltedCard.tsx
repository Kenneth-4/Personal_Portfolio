"use client";

import React, { useState, useRef } from 'react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  scaleOnHover?: boolean;
}

export default function TiltedCard({ 
  children, 
  className = "", 
  tiltIntensity = 15,
  scaleOnHover = true 
}: TiltedCardProps) {
  const [transform, setTransform] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = ((e.clientY - centerY) / rect.height) * tiltIntensity;
    const rotateY = ((centerX - e.clientX) / rect.width) * tiltIntensity;
    
    const scale = scaleOnHover ? 1.05 : 1;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
