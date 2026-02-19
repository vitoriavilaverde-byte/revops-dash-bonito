
import React, { useState, useMemo } from 'react';
import type { FunnelStep } from '../types';
import { Users, MousePointerClick, DollarSign, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HorizontalFunnelProps {
  data: FunnelStep[];
}

type CohortType = 'ALL' | 'ACQUISITION' | 'RETENTION';

export const HorizontalFunnel: React.FC<HorizontalFunnelProps> = ({ data }) => {
  const [activeCohort, setActiveCohort] = useState<CohortType>('ALL');
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (activeCohort === 'ACQUISITION') return data.filter(d => d.category === 'ACQUISITION');
    if (activeCohort === 'RETENTION') return data.filter(d => d.category === 'RETENTION');
    return data;
  }, [data, activeCohort]);

  const handleStageClick = (id: string) => {
    if (selectedStages.includes(id)) {
      setSelectedStages(selectedStages.filter(s => s !== id));
    } else {
      if (selectedStages.length < 2) {
        setSelectedStages([...selectedStages, id]);
      } else {
        setSelectedStages([id]);
      }
    }
  };

  const customConversion = useMemo(() => {
    if (selectedStages.length !== 2) return null;
    const stage1 = data.find(s => s.id === selectedStages[0]);
    const stage2 = data.find(s => s.id === selectedStages[1]);
    if (!stage1 || !stage2) return null;
    const index1 = data.findIndex(s => s.id === stage1.id);
    const index2 = data.findIndex(s => s.id === stage2.id);
    const start = index1 < index2 ? stage1 : stage2;
    const end = index1 < index2 ? stage2 : stage1;
    const rate = ((end.value / start.value) * 100).toFixed(2);
    return { start, end, rate };
  }, [selectedStages, data]);

  const dynamicKPIs = useMemo(() => {
    if (filteredData.length === 0) return null;
    const first = filteredData[0];
    const last = filteredData[filteredData.length - 1];
    const conversion = ((last.value / first.value) * 100).toFixed(2);
    const revenue = (last.value * 30421 / 1000000).toFixed(2);
    return {
      visitors: first.value.toLocaleString(),
      conversion: `${conversion}%`,
      revenue: `R$ ${revenue}M`
    };
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-xl border border-[var(--border)]">
        <div className="flex gap-2 bg-[var(--panel)] p-1 rounded-lg border border-[var(--border)] shadow-sm">
          <button onClick={() => setActiveCohort('ALL')} className={cn("px-4 py-1.5 text-sm font-bold rounded-md transition-all", activeCohort === 'ALL' ? "bg-blue-600 text-white shadow-md" : "text-[var(--muted)] hover:text-[var(--text)]")}>Todos</button>
          <button onClick={() => setActiveCohort('ACQUISITION')} className={cn("px-4 py-1.5 text-sm font-bold rounded-md transition-all", activeCohort === 'ACQUISITION' ? "bg-violet-600 text-white shadow-md" : "text-[var(--muted)] hover:text-[var(--text)]")}>Aquisição</button>
          <button onClick={() => setActiveCohort('RETENTION')} className={cn("px-4 py-1.5 text-sm font-bold rounded-md transition-all", activeCohort === 'RETENTION' ? "bg-orange-500 text-white shadow-md" : "text-[var(--muted)] hover:text-[var(--text)]")}>Pós-Vendas</button>
        </div>

        {dynamicKPIs && (
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-violet-100 rounded-lg text-violet-600"><Users size={18} /></div>
              <div>
                <span className="block text-slate-600 text-xs font-bold uppercase">Pessoas Únicas</span>
                <span className="font-bold text-[var(--text)] text-lg">{dynamicKPIs.visitors}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><MousePointerClick size={18} /></div>
              <div>
                <span className="block text-slate-600 text-xs font-bold uppercase">Conversão Total</span>
                <span className="font-bold text-[var(--text)] text-lg">{dynamicKPIs.conversion}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><DollarSign size={18} /></div>
              <div>
                <span className="block text-slate-600 text-xs font-bold uppercase">Receita Est.</span>
                <span className="font-bold text-[var(--text)] text-lg">{dynamicKPIs.revenue}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {customConversion && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="text-orange-900">
              <span className="text-xs uppercase tracking-wider font-bold opacity-60">De</span>
              <div className="font-bold text-xl">{customConversion.start.label}</div>
              <div className="text-sm font-medium opacity-80">{customConversion.start.value.toLocaleString()}</div>
            </div>
            <ArrowRight className="text-orange-400" size={24} />
            <div className="text-orange-900">
              <span className="text-xs uppercase tracking-wider font-bold opacity-60">Para</span>
              <div className="font-bold text-xl">{customConversion.end.label}</div>
              <div className="text-sm font-medium opacity-80">{customConversion.end.value.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-bold">Taxa de Conversão</div>
            <div className="text-6xl font-bold text-orange-600 drop-shadow-sm">{customConversion.rate}%</div>
          </div>
          <button onClick={() => setSelectedStages([])} className="text-xs text-orange-600 hover:text-orange-800 font-bold underline ml-6">Limpar Seleção</button>
        </div>
      )}

      <div className="relative w-full overflow-x-auto pb-8 pt-4">
        <div className="min-w-[1000px] flex items-center justify-center h-[400px] gap-1.5">
          {filteredData.map((step, index) => {
            const isSelected = selectedStages.includes(step.id);
            const selectionIndex = selectedStages.indexOf(step.id) + 1;
            const prevStep = index > 0 ? filteredData[index - 1] : null;
            const stepConversion = prevStep ? ((step.value / prevStep.value) * 100).toFixed(1) : null;
            const gradientClass = step.category === 'ACQUISITION' ? 'bg-gradient-to-b from-violet-500 to-indigo-600' : 'bg-gradient-to-b from-orange-400 to-amber-500';

            return (
              <div key={step.id} className="flex flex-col items-center justify-center group relative w-full max-w-[100px]">
                {isSelected && (
                  <div className="absolute -top-10 z-20 w-8 h-8 rounded-full bg-[var(--panel)] text-violet-600 font-bold flex items-center justify-center shadow-lg border-2 border-violet-600 animate-bounce">{selectionIndex}</div>
                )}
                <div onClick={() => handleStageClick(step.id)} style={{ height: `${step.height}px` }} className={cn("w-full rounded-lg cursor-pointer transition-all duration-300 relative shadow-lg border-t border-white/30", gradientClass, isSelected ? "ring-4 ring-violet-200 scale-105 z-10" : "hover:scale-105 hover:z-10 hover:shadow-xl")}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-lg"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wide opacity-90 drop-shadow-sm">{step.label}</span>
                    <span className="text-lg font-bold drop-shadow-md">{step.value.toLocaleString()}</span>
                  </div>
                </div>
                {stepConversion && (
                  <div className="mt-3 px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-700 border border-[var(--border)] shadow-sm">{stepConversion}%</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
