import React, { useMemo } from "react";
import { ArrowUp } from "lucide-react";
import { loadStrategy } from "../strategy/store";
import type { Layer, Target } from "../strategy/store";

const layerMeta: Record<Layer, { level: string; title: string; timeScale: string; color: string }> = {
  L3: { level: "L3. BOARD / INVESTIDORES", title: "Crescimento Estratégico", timeScale: "MESES", color: "from-violet-500 to-indigo-600" },
  L2: { level: "L2. EXECUTIVO / FINANCEIRO", title: "Saúde Financeira", timeScale: "MESES", color: "from-emerald-500 to-teal-600" },
  L1: { level: "L1. OPERADOR / SISTEMA", title: "Comportamento do Sistema", timeScale: "SEMANAS", color: "from-cyan-500 to-blue-600" },
  L0: { level: "L0. INFRAESTRUTURA / SINAIS ATÔMICOS", title: "Modelo de Dados", timeScale: "TEMPO REAL", color: "from-slate-400 to-slate-600" },
};

const LayerCard = ({
  layer,
  metrics,
}: {
  layer: Layer;
  metrics: Target[];
}) => {
  const meta = layerMeta[layer];

  return (
    <div className="relative group">
      <div
        className="
          relative transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
          bg-white border border-slate-200 rounded-xl p-8
          shadow-sm overflow-hidden
        "
      >
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${meta.color}`}></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6 min-w-[320px]">
            <div className="text-xs font-extrabold text-slate-400 -rotate-90 whitespace-nowrap w-5 tracking-widest uppercase">
              {meta.timeScale}
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-2">
                {meta.level}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{meta.title}</h3>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
            {metrics.length === 0 ? (
              <div className="text-slate-500 font-bold">Nenhuma meta publicada para esta camada.</div>
            ) : (
              metrics.map((m) => (
                <div
                  key={`${m.layer}:${m.metricKey}`}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-4 hover:bg-violet-50 hover:border-violet-200 transition-all duration-300"
                >
                  <div className="text-xs font-extrabold text-slate-600">{m.label}</div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-lg font-extrabold text-violet-700">
                      {m.target} <span className="text-xs text-slate-500">{m.unit}</span>
                    </div>
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      {m.cadence || "mensal"}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-slate-400">{m.metricKey}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FrameworkView: React.FC<{ tenantId: string; tenantName: string }> = ({ tenantId, tenantName }) => {
  const strategy = useMemo(() => loadStrategy(tenantId), [tenantId]);

  const byLayer = useMemo(() => {
    const base: Record<Layer, Target[]> = { L0: [], L1: [], L2: [], L3: [] };
    if (!strategy?.targets?.length) return base;
    for (const t of strategy.targets) base[t.layer].push(t);
    return base;
  }, [strategy]);

  return (
    <div className="w-full h-full min-h-full bg-slate-50 p-10 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Framework • {tenantName}
          </h2>

          {strategy ? (
            <div className="text-slate-600 font-bold">
              Modelo: <span className="text-slate-900">{strategy.model.toUpperCase()}</span> •
              Maturidade: <span className="text-slate-900">{strategy.maturity}</span>
              <div className="mt-2 text-slate-500 font-bold">
                Objetivo: <span className="text-slate-700">{strategy.objective}</span>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 font-bold">
              Nenhuma estratégia publicada ainda para este tenant. Vá em <span className="text-slate-800">Gerenciar Clientes</span> e clique em <span className="text-slate-800">Publicar no Framework</span>.
            </div>
          )}
        </div>

        <div className="space-y-8 relative">
          <LayerCard layer="L3" metrics={byLayer.L3} />
          <LayerCard layer="L2" metrics={byLayer.L2} />

          <div className="relative z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl blur opacity-10 animate-pulse"></div>
            <LayerCard layer="L1" metrics={byLayer.L1} />
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 translate-x-full hidden xl:block">
              <div className="text-violet-600 text-sm font-extrabold flex items-center gap-3 animate-bounce">
                <ArrowUp className="rotate-[-90deg]" size={24} />
                <span className="uppercase tracking-widest text-xs">A Camada Perdida</span>
              </div>
            </div>
          </div>

          <LayerCard layer="L0" metrics={byLayer.L0} />
          <div className="mt-20 h-40 w-full bg-gradient-to-t from-violet-500/5 to-transparent transform perspective-[2000px] rotate-x-60 rounded-[100%] blur-3xl opacity-40 mx-auto pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
