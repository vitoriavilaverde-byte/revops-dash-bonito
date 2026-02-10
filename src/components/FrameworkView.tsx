// src/components/FrameworkView.tsx
import React, { useMemo } from "react";
import { ArrowUp } from "lucide-react";
import { loadStrategy } from "../lib/strategyStorage";

type Unit = "%" | "R$" | "count" | "min" | "days" | string;
type Layer = "L0" | "L1" | "L2" | "L3";

type MetricItem =
  | string
  | {
      metricKey?: string;
      label: string;
      target?: number | null;
      unit?: Unit;
      layer?: Layer;
    };

function formatTarget(target: number, unit?: Unit) {
  if (unit === "R$") return `R$ ${target}`;
  if (unit === "%") return `${target}%`;
  if (unit === "min") return `${target} min`;
  if (unit === "days") return `${target} dias`;
  if (!unit || unit === "count") return `${target}`;
  return `${target} ${unit}`;
}

const MetricChip: React.FC<{ item: MetricItem }> = ({ item }) => {
  if (typeof item === "string") {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center hover:bg-violet-50 hover:border-violet-200 transition-all duration-300 cursor-default group/metric">
        <span className="text-xs font-bold text-slate-600 group-hover/metric:text-violet-700 transition-colors">
          {item}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center hover:bg-violet-50 hover:border-violet-200 transition-all duration-300 cursor-default group/metric">
      <div className="text-xs font-extrabold text-slate-700 group-hover/metric:text-violet-700 transition-colors">
        {item.label}
      </div>

      {item.target !== undefined && item.target !== null && (
        <div className="text-[11px] font-bold text-violet-700 mt-1">
          Meta: {formatTarget(item.target, item.unit)}
        </div>
      )}

      {item.metricKey && (
        <div className="text-[10px] font-bold text-slate-400 mt-1">
          {item.metricKey}
        </div>
      )}
    </div>
  );
};

const LayerCard: React.FC<{
  level: string;
  title: string;
  timeScale: string;
  color: string;
  metrics: MetricItem[];
  subtitle?: string;
}> = ({ level, title, metrics, color, timeScale, subtitle }) => (
  <div className="relative group">
    <div
      className="
        relative transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
        bg-white border border-slate-200 rounded-xl p-8 
        flex flex-col md:flex-row items-center justify-between gap-8
        shadow-sm overflow-hidden
      "
    >
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${color}`} />

      <div className="flex items-center gap-6 min-w-[300px] z-10">
        <div className="text-xs font-bold text-slate-400 -rotate-90 whitespace-nowrap w-4 tracking-widest uppercase">
          {timeScale}
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            {level}
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <div className="text-xs font-bold text-slate-500 mt-2">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full z-10">
        {metrics.map((m, i) => (
          <MetricChip key={i} item={m} />
        ))}
      </div>

      <div className="absolute -bottom-8 left-10 w-px h-8 bg-slate-200 last:hidden" />
    </div>
  </div>
);

export const FrameworkView: React.FC<{ tenantId: string; tenantName: string }> = ({
  tenantId,
  tenantName,
}) => {
  const strategy = useMemo(() => loadStrategy(tenantId), [tenantId]);

  const targetsByLayer = useMemo(() => {
    const base: Record<Layer, MetricItem[]> = { L0: [], L1: [], L2: [], L3: [] };
    if (!strategy?.targets?.length) return base;

    for (const x of strategy.targets as any[]) {
      const layer = (x.layer || "L1") as Layer;
      base[layer].push({
        metricKey: x.metricKey,
        label: x.label,
        target: x.target,
        unit: x.unit,
        layer,
      });
    }

    // se tiver pouca coisa, preenche pra ficar bonito
    (Object.keys(base) as Layer[]).forEach((l) => {
      if (base[l].length < 4) {
        const fillers = [
          { label: "—", target: null as any, unit: "" },
          { label: "—", target: null as any, unit: "" },
          { label: "—", target: null as any, unit: "" },
          { label: "—", target: null as any, unit: "" },
        ];
        base[l] = [...base[l], ...fillers].slice(0, 4);
      } else {
        base[l] = base[l].slice(0, 8); // mantém layout leve
      }
    });

    return base;
  }, [strategy]);

  const hasStrategy = Boolean(strategy?.targets?.length);

  return (
    <div className="w-full h-full min-h-full bg-slate-50 p-10 animate-in fade-in duration-1000">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            A Camada Perdida: O Dashboard do Operador
          </h2>

          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
            Tenant selecionado:{" "}
            <span className="text-violet-700">{tenantName}</span>
            {hasStrategy && strategy?.updatedAt && (
              <span className="text-slate-400">
                {" "}
                • estratégia publicada em{" "}
                {new Date(strategy.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>

          {!hasStrategy && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600">
              Nenhuma estratégia encontrada para este tenant. Publique em{" "}
              <span className="text-violet-700">Gerenciar Clientes</span>.
            </div>
          )}
        </div>

        <div className="space-y-8 relative">
          {/* L3 */}
          <LayerCard
            level="L3. BOARD / INVESTIDORES"
            title="Crescimento Estratégico"
            timeScale="MESES"
            color="from-violet-500 to-indigo-600"
            subtitle={hasStrategy ? `North Star: ${strategy?.northStar || "—"}` : undefined}
            metrics={
              hasStrategy
                ? targetsByLayer.L3
                : ["Taxa de Crescimento", "Payback de CAC", "LTV:CAC", "Regra dos 40", "Magic Number"]
            }
          />

          {/* L2 */}
          <LayerCard
            level="L2. EXECUTIVO / FINANCEIRO"
            title="Saúde Financeira"
            timeScale="MESES"
            color="from-emerald-500 to-teal-600"
            metrics={
              hasStrategy
                ? targetsByLayer.L2
                : ["ARR / GRR / NRR", "LTV", "CPL / CAC / CTS", "Eficiência GTM"]
            }
          />

          {/* L1 (camada destacada) */}
          <div className="relative z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl blur opacity-10 animate-pulse" />

            <LayerCard
              level="L1. OPERADOR / SISTEMA"
              title="Comportamento do Sistema"
              timeScale="SEMANAS"
              color="from-cyan-500 to-blue-600"
              metrics={
                hasStrategy
                  ? targetsByLayer.L1
                  : ["Métricas de Velocidade", "Taxas de Conversão", "Tempo de Ciclo", "Métricas de Loop (k)"]
              }
            />

            <div className="absolute -right-8 top-1/2 -translate-y-1/2 translate-x-full hidden xl:block">
              <div className="text-violet-600 text-sm font-bold flex items-center gap-3 animate-bounce">
                <ArrowUp className="rotate-[-90deg]" size={24} />
                <span className="uppercase tracking-widest text-xs">A Camada Perdida</span>
              </div>
            </div>
          </div>

          {/* L0 */}
          <LayerCard
            level="L0. INFRAESTRUTURA / SINAIS ATÔMICOS"
            title="Modelo de Dados"
            timeScale="TEMPO REAL"
            color="from-slate-400 to-slate-600"
            metrics={
              hasStrategy
                ? targetsByLayer.L0
                : ["Métricas de Tempo", "Métricas de Volume", "Métricas de Custo", "Sinais Atômicos"]
            }
          />

          <div className="mt-20 h-40 w-full bg-gradient-to-t from-violet-500/5 to-transparent transform perspective-[2000px] rotate-x-60 rounded-[100%] blur-3xl opacity-40 mx-auto pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
