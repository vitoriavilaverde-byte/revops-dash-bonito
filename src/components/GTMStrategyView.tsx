
import React from 'react';

const GTMBlock = ({ type, label, subLabel, height = 'h-16', width = 'w-full', className = '' }: any) => {
  const baseClasses = "flex flex-col items-center justify-center text-center text-xs font-bold uppercase tracking-wider p-1 shadow-sm transition-transform hover:scale-105 cursor-default rounded-md";
  
  let typeClasses = "";
  if (type === 'marketing') {
    typeClasses = "bg-slate-800 text-grey border border-slate-700";
  } else if (type === 'sales') {
    typeClasses = "bg-cyan-500 text-white shadow-cyan-100";
  } else if (type === 'cs') {
    typeClasses = "bg-[var(--panel)] border-2 border-pink-500 text-pink-600 shadow-pink-50";
  }

  return (
    <div className={`${baseClasses} ${typeClasses} ${height} ${width} ${className}`}>
      <span>{label}</span>
      {subLabel && <span className="text-[9px] opacity-80 mt-0.5">{subLabel}</span>}
    </div>
  );
};

const ColumnHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-4">
    <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">{title}</div>
    <div className="mt-1 bg-slate-200 text-slate-700 text-[10px] font-bold py-1 px-2 rounded-sm uppercase w-full">
      {subtitle}
    </div>
  </div>
);

export const GTMStrategyView: React.FC = () => {
  return (
    <div className="w-full h-full min-h-full bg-slate-50 p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-2">GTM Strategy Map</h2>
          <p className="text-[var(--muted)] text-sm font-medium">Alinhamento de estratégia de Go-To-Market por ACV e Volume de Deals.</p>
        </div>

        <div className="relative bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 overflow-hidden shadow-lg">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-slate-400 tracking-widest whitespace-nowrap uppercase">
            Number of Deals per year
          </div>
          <div className="ml-12 flex relative">
            <div className="absolute -left-12 top-0 h-full flex flex-col justify-between py-12 text-[10px] text-slate-400 font-mono text-right w-10 font-bold">
              <span>100,000's</span><span>10,000's</span><span>1,000's</span><span>100's</span><span>10's</span>
            </div>
            <div className="absolute inset-0 z-0 flex flex-col justify-between py-14 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-slate-100 border-dashed h-px"></div>
              ))}
            </div>
            <div className="flex w-full gap-3 z-10">
              <div className="flex-1 flex flex-col relative bg-slate-50/50 rounded-lg p-2 min-h-[500px] border border-slate-100">
                <ColumnHeader title="VOLUME" subtitle="ALL-to-ALL" />
                <div className="flex-1 flex flex-col gap-2 pt-4">
                  <GTMBlock type="marketing" label="PLG" height="h-24" />
                  <GTMBlock type="cs" label="COMMUNITY" height="h-20" />
                </div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-[10px] text-slate-600 font-bold bg-[var(--panel)] border border-[var(--border)] rounded px-1.5 z-20 shadow-sm">$5,000</div>
                <div className="absolute right-0 top-16 bottom-4 border-r border-[var(--border)] border-dashed"></div>
              </div>
              <div className="flex-1 flex flex-col relative bg-slate-50/50 rounded-lg p-2 min-h-[500px] border border-slate-100">
                <ColumnHeader title="SPEED" subtitle="1-to-ALL" />
                <div className="flex-1 flex flex-col gap-2 pt-16">
                  <GTMBlock type="marketing" label="INBOUND" height="h-20" />
                  <GTMBlock type="sales" label="1-STAGE" height="h-20" />
                  <GTMBlock type="cs" label="HELPDESK" height="h-16" />
                </div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-[10px] text-slate-600 font-bold bg-[var(--panel)] border border-[var(--border)] rounded px-1.5 z-20 shadow-sm">$15,000</div>
                <div className="absolute right-0 top-16 bottom-4 border-r border-[var(--border)] border-dashed"></div>
              </div>
              <div className="flex-1 flex flex-col relative bg-slate-50/50 rounded-lg p-2 min-h-[500px] border border-slate-100">
                <ColumnHeader title="EFFICIENCY" subtitle="1-to-MANY" />
                <div className="flex-1 flex flex-col gap-2 pt-28">
                  <GTMBlock type="marketing" label="PROSPECT" height="h-16" />
                  <GTMBlock type="sales" label="2-STAGE" height="h-20" />
                  <GTMBlock type="cs" label="VOLUME" height="h-16" />
                </div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-[10px] text-slate-600 font-bold bg-[var(--panel)] border border-[var(--border)] rounded px-1.5 z-20 shadow-sm">$50,000</div>
                <div className="absolute right-0 top-16 bottom-4 border-r border-[var(--border)] border-dashed"></div>
              </div>
              <div className="flex-1 flex flex-col relative bg-slate-50/50 rounded-lg p-2 min-h-[500px] border border-slate-100">
                <ColumnHeader title="EFFECTIVE" subtitle="1-to-FEW" />
                <div className="flex-1 flex flex-col gap-2 pt-40">
                  <GTMBlock type="marketing" label="ABM" height="h-16" />
                  <GTMBlock type="sales" label="FIELD SALES" height="h-20" />
                  <GTMBlock type="cs" label="SEGMENTED" height="h-16" />
                </div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-[10px] text-slate-600 font-bold bg-[var(--panel)] border border-[var(--border)] rounded px-1.5 z-20 shadow-sm">$150,000</div>
                <div className="absolute right-0 top-16 bottom-4 border-r border-[var(--border)] border-dashed"></div>
              </div>
              <div className="flex-1 flex flex-col relative bg-slate-50/50 rounded-lg p-2 min-h-[500px] border border-slate-100">
                <ColumnHeader title="SELECTIVE" subtitle="1-to-1" />
                <div className="flex-1 flex flex-col gap-2 pt-52">
                  <GTMBlock type="marketing" label="TARGET" height="h-16" />
                  <GTMBlock type="sales" label="NAMED ACCTS" height="h-20" />
                  <GTMBlock type="cs" label="ACCOUNTS" height="h-16" />
                </div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-[10px] text-slate-600 font-bold bg-[var(--panel)] border border-[var(--border)] rounded px-1.5 z-20 shadow-sm">$500,000</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 text-xs font-bold text-slate-400 tracking-widest uppercase">Annual Contract Value</div>
          <div className="absolute right-4 bottom-20 flex flex-col gap-2 text-[10px] font-bold text-[var(--muted)]">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-800 rounded-sm"></div> MARKETING GTM</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500 rounded-sm"></div> SALES GTM</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-pink-500 rounded-sm"></div> CS GTM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
