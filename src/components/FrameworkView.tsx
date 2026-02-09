
import React from 'react';
import { ArrowUp } from 'lucide-react';

const LayerCard = ({ level, title, metrics, color, timeScale }: any) => (
  <div className={`relative group perspective-1000`}>
    <div className={`
      relative transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
      bg-white border border-slate-200 rounded-xl p-8 
      flex flex-col md:flex-row items-center justify-between gap-8
      shadow-sm overflow-hidden
    `}>
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${color}`}></div>
      <div className="flex items-center gap-6 min-w-[300px] z-10">
        <div className="text-xs font-bold text-slate-400 -rotate-90 whitespace-nowrap w-4 tracking-widest uppercase">{timeScale}</div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">{level}</div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full z-10">
        {metrics.map((m: string, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center hover:bg-violet-50 hover:border-violet-200 transition-all duration-300 cursor-default group/metric">
            <span className="text-xs font-bold text-slate-600 group-hover/metric:text-violet-700 transition-colors">{m}</span>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-8 left-10 w-px h-8 bg-slate-200 last:hidden"></div>
    </div>
  </div>
);

export const FrameworkView: React.FC = () => {
  return (
    <div className="w-full h-full min-h-full bg-slate-50 p-10 animate-in fade-in duration-1000">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">A Camada Perdida: O Dashboard do Operador</h2>
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase"></p>
        </div>
        <div className="space-y-8 relative">
          <LayerCard level="L3. BOARD / INVESTIDORES" title="Crescimento Estratégico" timeScale="MESES" color="from-violet-500 to-indigo-600" metrics={['Taxa de Crescimento', 'Payback de CAC', 'LTV:CAC', 'Regra dos 40', 'Magic Number']} />
          <LayerCard level="L2. EXECUTIVO / FINANCEIRO" title="Saúde Financeira" timeScale="MESES" color="from-emerald-500 to-teal-600" metrics={['ARR / GRR / NRR', 'LTV', 'CPL / CAC / CTS', 'Eficiência GTM']} />
          <div className="relative z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl blur opacity-10 animate-pulse"></div>
            <LayerCard level="L1. OPERADOR / SISTEMA" title="Comportamento do Sistema" timeScale="SEMANAS" color="from-cyan-500 to-blue-600" metrics={['Métricas de Velocidade', 'Taxas de Conversão', 'Tempo de Ciclo', 'Métricas de Loop (k)']} />
             <div className="absolute -right-8 top-1/2 -translate-y-1/2 translate-x-full hidden xl:block">
                <div className="text-violet-600 text-sm font-bold flex items-center gap-3 animate-bounce">
                  <ArrowUp className="rotate-[-90deg]" size={24} /> 
                  <span className="uppercase tracking-widest text-xs">A Camada Perdida</span>
                </div>
             </div>
          </div>
          <LayerCard level="L0. INFRAESTRUTURA / SINAIS ATÔMICOS" title="Modelo de Dados" timeScale="TEMPO REAL" color="from-slate-400 to-slate-600" metrics={['Métricas de Tempo', 'Métricas de Volume', 'Métricas de Custo', 'Sinais Atômicos']} />
          <div className="mt-20 h-40 w-full bg-gradient-to-t from-violet-500/5 to-transparent transform perspective-[2000px] rotate-x-60 rounded-[100%] blur-3xl opacity-40 mx-auto pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
