import React, { useMemo, useState } from "react";
import type { FunnelStep } from "../types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RevOpsFunnelBoardProps {
  data: FunnelStep[];

  /**
   * COHORT (opcional)
   * - Se você NÃO passar onCohortChange, o toggle serve só de UI (não refaz fetch).
   * - Se passar, o pai pode refazer fetch e atualizar `data`.
   */
  cohortEnabledDefault?: boolean;
  cohortTypeDefault?: "first_touch" | "lead_created" | "won";
  cohortPeriodDefault?: "week" | "month";
  cohortKeys?: string[]; // ex: ["2026-02", "2026-01", ...]
  onCohortChange?: (args: {
    enabled: boolean;
    cohortType: "first_touch" | "lead_created" | "won";
    cohortPeriod: "week" | "month";
    cohortKey?: string;
  }) => void;

  /**
   * Stage Map (opcional):
   * mapeia step.id e/ou step.label para uma das 7 etapas do bowtie
   */
  stageMap?: Record<
    string,
    "prospects" | "leads" | "opportunities" | "wins" | "live" | "customers" | "growth"
  >;
}

type BowtieKey =
  | "prospects"
  | "leads"
  | "opportunities"
  | "wins"
  | "live"
  | "customers"
  | "growth";

type BowtieStage = {
  key: BowtieKey;
  label: string;
  category: "ACQUISITION" | "CONVERSION" | "RETENTION";
  value: number;
  metricLabel: string;
  previousValue: number;
  subMetric?: string;
  sourceIds: string[];
};

const BOWTIE_ORDER: { key: BowtieKey; label: string; category: BowtieStage["category"] }[] = [
  { key: "prospects", label: "Prospects", category: "ACQUISITION" },
  { key: "leads", label: "Leads", category: "ACQUISITION" },
  { key: "opportunities", label: "Opportunities", category: "CONVERSION" },
  { key: "wins", label: "Wins", category: "CONVERSION" }, // centro
  { key: "live", label: "Live", category: "RETENTION" },
  { key: "customers", label: "Customers", category: "RETENTION" },
  { key: "growth", label: "Growth", category: "RETENTION" },
];

// fallback map “inteligente” (não perfeito, mas evita vazio)
function guessStage(step: FunnelStep): BowtieKey {
  const id = (step.id ?? "").toLowerCase();
  const label = (step.label ?? "").toLowerCase();

  const s = `${id} ${label}`;

  if (s.match(/prospect|visit|session|traffic|audience|impress/)) return "prospects";
  if (s.match(/lead|mql|signup|capture|cadastro/)) return "leads";
  if (s.match(/opport|sql|pipeline|negocia|proposta|proposal|demo|meeting/)) return "opportunities";
  if (s.match(/won|win|closed\s*won|pagamento|payment\s*approved|deal\s*won|contrato/)) return "wins";
  if (s.match(/onboard|ativ|activate|first\s*value|go\s*live/)) return "live";
  if (s.match(/customer|retention|renew|active|churn/)) return "customers";
  if (s.match(/upsell|cross|expand|growth|upgrade|expans/)) return "growth";

  // fallback seguro: vai empurrando pro meio
  return "leads";
}

function safePct(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "-";
  return `${n.toFixed(1)}%`;
}

export const RevOpsFunnelBoard: React.FC<RevOpsFunnelBoardProps> = ({
  data,
  cohortEnabledDefault = false,
  cohortTypeDefault = "first_touch",
  cohortPeriodDefault = "month",
  cohortKeys,
  onCohortChange,
  stageMap,
}) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  // cohort UI state
  const [cohortEnabled, setCohortEnabled] = useState<boolean>(cohortEnabledDefault);
  const [cohortType, setCohortType] = useState<"first_touch" | "lead_created" | "won">(cohortTypeDefault);
  const [cohortPeriod, setCohortPeriod] = useState<"week" | "month">(cohortPeriodDefault);
  const [cohortKey, setCohortKey] = useState<string | undefined>(cohortKeys?.[0]);

  const getGradient = (category: string) => {
    switch (category) {
      case "ACQUISITION":
        return "bg-gradient-to-b from-violet-500 to-indigo-900 border-violet-400/20";
      case "CONVERSION":
        return "bg-gradient-to-b from-emerald-500 to-teal-900 border-emerald-400/20";
      case "RETENTION":
        return "bg-gradient-to-b from-orange-500 to-red-900 border-orange-400/20";
      default:
        return "bg-gray-800";
    }
  };

  const bowtieStages: BowtieStage[] = useMemo(() => {
    const buckets = new Map<BowtieKey, FunnelStep[]>();
    for (const def of BOWTIE_ORDER) buckets.set(def.key, []);

    for (const step of data ?? []) {
      const mapped =
        stageMap?.[step.id] ??
        stageMap?.[(step.label ?? "").toLowerCase()] ??
        stageMap?.[(step.id ?? "").toLowerCase()];

      const key: BowtieKey = mapped ?? guessStage(step);

      const arr = buckets.get(key);
      if (arr) arr.push(step);
      else buckets.set(key, [step]);
    }

    // agrega mantendo “regras atuais”:
    // - value: soma
    // - previousValue: soma
    // - metricLabel: usa o mais comum ou o label padrão bowtie
    // - subMetric: pega o primeiro não vazio (ou você pode mudar depois)
    const out: BowtieStage[] = BOWTIE_ORDER.map((def) => {
      const steps = buckets.get(def.key) ?? [];
      const value = steps.reduce((acc, s) => acc + (s.value ?? 0), 0);
      const prev = steps.reduce((acc, s) => acc + (s.previousValue ?? 0), 0);

      // tenta herdar um metricLabel relevante
      const metricLabel =
        steps.find((s) => (s.metricLabel ?? "").trim().length > 0)?.metricLabel ?? def.label;

      const subMetric = steps.find((s) => (s.subMetric ?? "").trim().length > 0)?.subMetric;

      return {
        key: def.key,
        label: def.label,
        category: def.category,
        value,
        previousValue: prev,
        metricLabel,
        subMetric,
        sourceIds: steps.map((s) => s.id),
      };
    });

    return out;
  }, [data, stageMap]);

  // conversões entre estágios bowtie (CR)
  const conversionRates = useMemo(() => {
    return bowtieStages.map((stage, idx) => {
      if (idx === bowtieStages.length - 1) return null;
      const next = bowtieStages[idx + 1];
      const cr = stage.value > 0 ? (next.value / stage.value) * 100 : NaN;
      return { from: stage, to: next, cr };
    });
  }, [bowtieStages]);

  // shapes do bowtie (clip-path)
  const clipByIndex = (idx: number) => {
    // 0,1,2 = afunila pra direita
    // 3 = centro
    // 4,5,6 = abre pra direita
    if (idx === 3) return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

    // Left side (0..2): “ponta” no lado direito
    if (idx < 3) return "polygon(0 0, 92% 10%, 92% 90%, 0 100%)";

    // Right side (4..6): “ponta” no lado esquerdo
    return "polygon(8% 10%, 100% 0, 100% 100%, 8% 90%)";
  };

  const fireCohortChange = (next: {
    enabled: boolean;
    cohortType: "first_touch" | "lead_created" | "won";
    cohortPeriod: "week" | "month";
    cohortKey?: string;
  }) => {
    onCohortChange?.(next);
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="min-w-[1100px] flex flex-col gap-4">
        {/* Header: labels + cohort controls */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex justify-between w-full px-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
            <div className="text-violet-400">Acquisition</div>
            <div className="text-emerald-400">Conversion</div>
            <div className="text-orange-400">Retention & Expansion</div>
          </div>

          {/* Cohort Controls */}
          <div className="shrink-0 flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
            <label className="flex items-center gap-2 text-xs text-gray-300">
              <input
                type="checkbox"
                className="accent-white"
                checked={cohortEnabled}
                onChange={(e) => {
                  const enabled = e.target.checked;
                  setCohortEnabled(enabled);
                  fireCohortChange({ enabled, cohortType, cohortPeriod, cohortKey });
                }}
              />
              Cohort
            </label>

            <select
              className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-gray-200"
              value={cohortType}
              disabled={!cohortEnabled}
              onChange={(e) => {
                const v = e.target.value as any;
                setCohortType(v);
                fireCohortChange({ enabled: cohortEnabled, cohortType: v, cohortPeriod, cohortKey });
              }}
            >
              <option value="first_touch">Entrada</option>
              <option value="lead_created">Lead criado</option>
              <option value="won">Win</option>
            </select>

            <select
              className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-gray-200"
              value={cohortPeriod}
              disabled={!cohortEnabled}
              onChange={(e) => {
                const v = e.target.value as any;
                setCohortPeriod(v);
                fireCohortChange({ enabled: cohortEnabled, cohortType, cohortPeriod: v, cohortKey });
              }}
            >
              <option value="week">Semanal</option>
              <option value="month">Mensal</option>
            </select>

            <select
              className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-gray-200"
              value={cohortKey ?? ""}
              disabled={!cohortEnabled || !cohortKeys?.length}
              onChange={(e) => {
                const v = e.target.value || undefined;
                setCohortKey(v);
                fireCohortChange({ enabled: cohortEnabled, cohortType, cohortPeriod, cohortKey: v });
              }}
            >
              {(cohortKeys?.length ? cohortKeys : [""]).map((k) => (
                <option key={k || "empty"} value={k}>
                  {k || "—"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MAIN BOWTIE */}
        <div className="grid grid-cols-7 items-stretch h-64 gap-1">
          {bowtieStages.map((stage, index) => {
            const isHovered = hoveredStage === stage.key;
            const isCenter = stage.key === "wins";

            return (
              <div
                key={stage.key}
                className="relative"
                onMouseEnter={() => setHoveredStage(stage.key)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div
                  className={cn(
                    "h-full w-full p-3 flex flex-col justify-between transition-all duration-300 border border-white/10 shadow-lg",
                    getGradient(stage.category),
                    isHovered ? "brightness-110 -translate-y-1" : "brightness-100",
                    isCenter ? "ring-2 ring-white/20" : ""
                  )}
                  style={{
                    clipPath: clipByIndex(index),
                    borderRadius: isCenter ? 6 : 4,
                  }}
                >
                  {/* Top: Label */}
                  <div className="text-[10px] uppercase tracking-widest text-white/70 font-medium truncate">
                    {stage.label}
                  </div>

                  {/* Middle: Value */}
                  <div className="flex flex-col items-center justify-center flex-grow">
                    <span className={cn("font-bold text-white drop-shadow-md", isCenter ? "text-4xl" : "text-3xl")}>
                      {stage.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/60 mt-1 font-medium text-center">
                      {stage.metricLabel}
                    </span>
                    {stage.subMetric && (
                      <span className="text-xs text-white/90 mt-2 bg-black/20 px-2 py-0.5 rounded">
                        {stage.subMetric}
                      </span>
                    )}
                  </div>

                  {/* Bottom: mini bar */}
                  <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[var(--panel)]/30 w-[80%]" />
                  </div>
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 border border-gray-700 rounded-md shadow-xl p-3 z-50 text-xs">
                    <div className="font-bold text-white mb-1">{stage.label}</div>
                    <div className="text-gray-400 mb-2">
                      Metric: {stage.metricLabel}
                      {stage.sourceIds.length > 1 ? (
                        <span className="text-gray-500"> • {stage.sourceIds.length} steps agregados</span>
                      ) : null}
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-800 pt-2">
                      <span className="text-gray-500">vs Last Month</span>
                      <span className={stage.value >= stage.previousValue ? "text-green-400" : "text-red-400"}>
                        {safePct(((stage.value - stage.previousValue) / (stage.previousValue || 0)) * 100)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* METRICS ROW (Conversion Rates) */}
        <div className="grid grid-cols-7 items-start h-20 gap-1 mt-2">
          {conversionRates.map((item, idx) => {
            if (!item) return <div key={`metric-last`} className="col-span-1" />;

            const { from, to, cr } = item;
            const isValid = !isNaN(cr) && isFinite(cr);

            return (
              <div key={`metric-${from.key}`} className="flex justify-center px-1">
                <div className="w-full bg-surface border border-border rounded p-2 flex flex-col items-center justify-center relative">
                  <div className="absolute -top-4 left-1/2 w-px h-4 bg-gray-700" />
                  <span className="text-lg font-bold text-white">{isValid ? safePct(cr) : "-"}</span>
                  <span className="text-[9px] text-gray-500 text-center leading-tight mt-1">
                    CR: {from.label} → {to.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
