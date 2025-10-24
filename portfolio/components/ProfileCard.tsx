"use client";

import React from 'react';

interface ProfileCardProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  icon: React.ReactNode;
  title: string;
}

export default function ProfileCard({ 
  children, 
  className = "", 
  gradientFrom,
  gradientTo,
  borderColor,
  icon,
  title
}: ProfileCardProps) {
  return (
    <div className={`relative rounded-3xl bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm border ${borderColor} p-8 sm:p-10 md:p-12 h-full min-h-[500px] shadow-2xl group hover:shadow-3xl transition-all duration-300 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom.replace('600', '500').replace('700', '600')}/20 rounded-3xl`}></div>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative h-full flex flex-col">
        {/* Icon Container */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-center text-2xl sm:text-3xl font-bold text-white mb-8">
          {title}
        </h3>
        
        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
