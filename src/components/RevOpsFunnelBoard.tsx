
import React, { useState } from 'react';
import type { FunnelStep } from '../types';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RevOpsFunnelBoardProps {
  data: FunnelStep[];
}

export const RevOpsFunnelBoard: React.FC<RevOpsFunnelBoardProps> = ({ data }) => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  // Helper to get gradient based on category
  const getGradient = (category: string) => {
    switch (category) {
      case 'ACQUISITION':
        return 'bg-gradient-to-b from-violet-500 to-indigo-900 border-violet-400/20';
      case 'CONVERSION':
        return 'bg-gradient-to-b from-emerald-500 to-teal-900 border-emerald-400/20';
      case 'RETENTION':
        return 'bg-gradient-to-b from-orange-500 to-red-900 border-orange-400/20';
      default:
        return 'bg-gray-800';
    }
  };

  const getTextColor = (category: string) => {
     switch (category) {
      case 'ACQUISITION': return 'text-violet-200';
      case 'CONVERSION': return 'text-emerald-200';
      case 'RETENTION': return 'text-orange-200';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="min-w-[1000px] flex flex-col gap-4">
        
        {/* Top Labels (Categories) */}
        <div className="flex justify-between px-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          <div className="text-violet-400">Acquisition</div>
          <div className="text-emerald-400">Conversion</div>
          <div className="text-orange-400">Retention & Expansion</div>
        </div>

        {/* MAIN FUNNEL BLOCKS */}
        <div className="flex items-stretch h-64 gap-1">
          {data.map((step, index) => {
            const isHovered = hoveredStep === step.id;
            
            // Calculate relative height for visual effect (optional, keeping full height for clean block look like reference)
            // But we can add a subtle scale effect
            
            return (
              <div
                key={step.id}
                className="relative flex-1 group"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* The Block */}
                <div
                  className={cn(
                    "h-full w-full rounded-sm p-3 flex flex-col justify-between transition-all duration-300 border-t border-l border-r border-white/10 shadow-lg",
                    getGradient(step.category),
                    isHovered ? "brightness-110 -translate-y-1" : "brightness-100"
                  )}
                >
                  {/* Top: Label */}
                  <div className="text-[10px] uppercase tracking-widest text-white/70 font-medium truncate">
                    {step.label}
                  </div>

                  {/* Middle: Value */}
                  <div className="flex flex-col items-center justify-center flex-grow">
                    <span className="text-3xl font-bold text-white drop-shadow-md">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/60 mt-1 font-medium">
                      {step.metricLabel}
                    </span>
                    {step.subMetric && (
                       <span className="text-xs text-white/90 mt-2 bg-black/20 px-2 py-0.5 rounded">
                       {step.subMetric}
                     </span>
                    )}
                  </div>
                  
                  {/* Bottom: Comparison (Visual only for MVP) */}
                  <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden mt-2">
                     <div className="h-full bg-white/30 w-[80%]"></div>
                  </div>
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-xl p-3 z-50 text-xs">
                    <div className="font-bold text-white mb-1">{step.label}</div>
                    <div className="text-gray-400 mb-2">Metric: {step.metricLabel}</div>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-2">
                      <span className="text-gray-500">vs Last Month</span>
                      <span className={step.value >= step.previousValue ? "text-green-400" : "text-red-400"}>
                        {(((step.value - step.previousValue) / step.previousValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* METRICS ROW (Conversion Rates) */}
        <div className="flex items-start h-20 gap-1 mt-2">
          {data.map((step, index) => {
            if (index === data.length - 1) return <div key={`spacer-${index}`} className="flex-1" />; // Last one has no "next" step

            const nextStep = data[index + 1];
            const conversionRate = ((nextStep.value / step.value) * 100);
            const isValid = !isNaN(conversionRate) && isFinite(conversionRate);
            
            // Logic to determine if we show a card here. 
            // In the reference, cards are under the gaps. 
            // We will place them in the slot corresponding to the step, indicating "Conversion to next".
            
            return (
              <div key={`metric-${step.id}`} className="flex-1 flex justify-center px-1">
                <div className="w-full bg-surface border border-border rounded p-2 flex flex-col items-center justify-center relative">
                  {/* Connecting Line (Visual trick) */}
                  <div className="absolute -top-4 left-1/2 w-px h-4 bg-gray-700"></div>
                  
                  <span className="text-lg font-bold text-white">
                    {isValid ? `${conversionRate.toFixed(1)}%` : '-'}
                  </span>
                  <span className="text-[9px] text-gray-500 text-center leading-tight mt-1">
                    CR: {step.metricLabel} &rarr; {nextStep.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
          {/* Empty slot for the last column to maintain grid alignment */}
          <div className="flex-1"></div>
        </div>

      </div>
    </div>
  );
};
