
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface KPICardProps {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon?: React.ElementType;
  color?: 'violet' | 'emerald' | 'orange' | 'blue';
  context?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  label, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color = 'violet',
  context 
}) => {
  const iconStyles = {
    violet: 'bg-violet-100 text-violet-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn("p-2.5 rounded-xl shadow-sm", iconStyles[color])}>
              <Icon size={20} />
            </div>
          )}
          <div>
            <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{label}</p>
            <h3 className="text-2xl font-bold text-[var(--text)] mt-0.5">{value}</h3>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border", 
          change >= 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
        )}>
          {change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(change)}%
        </div>
        {context && <span className="text-xs text-[var(--muted)] font-semibold">{context}</span>}
      </div>
    </div>
  );
};

export const KPICardSmall: React.FC<Omit<KPICardProps, 'icon' | 'context'>> = ({ label, value, change, trend }) => (
  <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg p-4 hover:bg-slate-50 transition-colors shadow-sm">
    <div className="text-[var(--muted)] text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
    <div className="flex items-end justify-between">
      <div className="text-xl font-bold text-[var(--text)]">{value}</div>
      <div className={cn("text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
        trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 
        trend === 'down' ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-100'
      )}>
        {change > 0 ? '+' : ''}{change}%
      </div>
    </div>
  </div>
);
