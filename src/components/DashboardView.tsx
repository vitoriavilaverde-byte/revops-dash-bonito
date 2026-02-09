// src/components/DashboardView.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ComposedChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ArrowDown, ArrowUp, Activity, Sparkles, BrainCircuit } from "lucide-react";

import {
  S_CURVE_DATA,
  DISTRIBUTION_DATA,
  MATRIX_DATA,
  HORIZONTAL_FUNNEL_DATA,
} from "../constants";

import { HorizontalFunnel } from "./HorizontalFunnel";

/** =========================
 *  Config MVP
 *  ========================= */
const DEFAULT_API = "https://revops-api-614980035835.us-east1.run.app";
// troque aqui se quiser forçar um tenant fixo no MVP:
const DEFAULT_TENANT = "dark"; // ou estancorp | consorcio | magalupay | magalupos
const DEFAULT_DAYS = 30;

type KpisSummary = {
  client_id: string | null;
  days_count: number | null;
  leads: number | null;
  mql: number | null;
  sql: number | null;
  deals_total: number | null;
  deals_won: number | null;
  revenue: number | null;
  cr_lead_to_mql: number | null;
  cr_mql_to_sql: number | null;
  cr_sql_to_won: number | null;
};

type ApiOk<T> = { ok: true; data?: T; rows?: any[] };
type ApiErr = { ok: false; error: string };

function n(v: any): number | null {
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const text = await res.text();

  // se vier HTML (erro de rota / proxy), isso evita crash no JSON.parse e mostra a causa
  const trimmed = text.trim();
  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) {
    throw new Error(`Resposta não-JSON (${res.status}) em ${url}: ${trimmed.slice(0, 160)}`);
  }

  const j = JSON.parse(trimmed);
  if (j?.ok === false) throw new Error(j?.error || "API error");
  return j as T;
}

/** =========================
 *  UI helpers
 *  ========================= */
const CopilotPanel = () => {
  const insights = [
    {
      title: "Gargalo em SQL → Won",
      diagnosis: "A taxa de conversão na última etapa pode estar abaixo do esperado.",
      hypothesis: "Follow-up e qualificação podem estar inconsistentes entre segmentos.",
      action: "Criar playbook de handoff MQL→SQL + checagem de SLA de contato.",
      expected_impact: "Aumento de win rate e redução de ciclo médio.",
    },
  ];

  return (
    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 shadow-sm mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-violet-600 rounded-lg text-white shadow-md">
          <BrainCircuit size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">RevOps Copilot Insights</h3>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
            Análise de Inteligência em Tempo Real
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white border border-violet-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-violet-600" />
              <h4 className="font-bold text-slate-900">{insight.title}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Diagnóstico
                </span>
                <p className="text-slate-700 font-medium">{insight.diagnosis}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Hipótese
                </span>
                <p className="text-slate-700 font-medium">{insight.hypothesis}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Ação recomendada
                </span>
                <p className="text-slate-800 font-bold text-violet-700">{insight.action}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Impacto esperado
                </span>
                <p className="text-slate-700 font-medium">{insight.expected_impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricTile = ({
  label,
  value,
  subtext,
  trend,
  color = "slate",
}: {
  label: string;
  value: string;
  subtext?: string;
  trend?: "down" | "up";
  color?: "slate" | "pink" | "blue";
}) => (
  <div className="mb-8 group">
    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-2 group-hover:text-violet-600 transition-colors">
      {label}
    </div>
    <div
      className={`text-5xl font-light tracking-tighter flex items-center gap-3 ${
        color === "pink"
          ? "text-pink-600"
          : color === "blue"
          ? "text-cyan-600"
          : "text-slate-900"
      }`}
    >
      {value}
      {trend === "down" && <ArrowDown size={28} className="text-slate-500 stroke-[1.5]" />}
      {trend === "up" && <ArrowUp size={28} className="text-slate-500 stroke-[1.5]" />}
    </div>
    {subtext && <div className="text-xs text-slate-600 mt-2 font-mono font-bold">{subtext}</div>}
  </div>
);

const BarIndicator = ({ label, activeIndex }: { label: string; activeIndex: number }) => (
  <div className="mb-8">
    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-3">{label}</div>
    <div className="flex gap-1.5">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`h-8 flex-1 rounded-sm transition-all duration-500 ${
            i <= activeIndex
              ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              : "bg-slate-200 border border-slate-300"
          }`}
        />
      ))}
    </div>
  </div>
);

const MatrixGrid = () => (
  <div className="relative p-2">
    <div className="grid grid-cols-3 gap-1 border border-slate-200 bg-white aspect-square p-1 rounded-lg shadow-lg">
      <div className="absolute -top-6 left-0 w-full flex justify-between px-6 text-[9px] text-slate-600 font-mono tracking-widest font-bold">
        <span>PEQ</span>
        <span>MED</span>
        <span>GRD</span>
      </div>
      <div className="absolute -left-8 top-0 h-full flex flex-col justify-between py-6 text-[9px] text-slate-600 font-mono tracking-widest font-bold">
        <span className="-rotate-90">ACQ</span>
        <span className="-rotate-90">RET</span>
        <span className="-rotate-90">EXP</span>
      </div>

      {MATRIX_DATA.map((cell: any, i: number) => (
        <div
          key={i}
          className="relative flex items-center justify-center group overflow-hidden rounded bg-slate-50 border border-slate-100 hover:border-cyan-400 transition-all duration-300"
        >
          {cell.active && (
            <>
              <div className="absolute inset-0 bg-cyan-100/50 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-cyan-400/20 blur-xl absolute" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] z-10" />
            </>
          )}
        </div>
      ))}
    </div>
  </div>
);

const FunnelBar = ({ label, height, color }: { label: string; height: number; color: string }) => (
  <div className="flex flex-col items-center justify-end h-32 w-full group relative">
    <div className={`w-full rounded-t-sm transition-all duration-700 group-hover:brightness-110 ${color} shadow-sm`} style={{ height: `${height}%` }}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50" />
    </div>
    <div className="mt-3 text-[9px] uppercase tracking-widest text-slate-600 text-center font-bold group-hover:text-slate-900 transition-colors">
      {label}
    </div>
  </div>
);

/** =========================
 *  Dashboard
 *  ========================= */
export const DashboardView: React.FC = () => {
  // MVP: pega do env se existir, senão usa hardcoded
  const apiBase = (import.meta as any).env?.VITE_API_BASE || DEFAULT_API;

  // MVP: tenant e período (pode depois plugar no seu dropdown do App.tsx)
  const tenant = DEFAULT_TENANT;
  const days = DEFAULT_DAYS;

  const [kpis, setKpis] = useState<KpisSummary | null>(null);
  const [kpisSeries, setKpisSeries] = useState<any[]>([]);
  const [funnel, setFunnel] = useState<any | null>(null);
  const [healthRows, setHealthRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const debugLine = useMemo(
    () => `TENANT: ${tenant} · PERÍODO: ${days} dias · API: ${apiBase}`,
    [tenant, days, apiBase]
  );

  useEffect(() => {
    let alive = true;

    (async () => {
      setError(null);

      try {
        // 1) KPIs resumo
        const k = await fetchJson<ApiOk<KpisSummary>>(
          `${apiBase}/kpis?client_id=${encodeURIComponent(tenant)}&days=${days}`
        );

        // 2) KPIs série
        const ks = await fetchJson<ApiOk<any[]>>(
          `${apiBase}/kpis/series?client_id=${encodeURIComponent(tenant)}&days=${days}`
        );

        // 3) Funnel
        const f = await fetchJson<ApiOk<any>>(
          `${apiBase}/funnel?client_id=${encodeURIComponent(tenant)}&days=${days}`
        );

        // 4) Data health
        const h = await fetchJson<ApiOk<any[]>>(
          `${apiBase}/data-health?client_id=${encodeURIComponent(tenant)}&days=${days}`
        );

        if (!alive) return;
        setKpis((k as any).data || null);
        setKpisSeries((ks as any).rows || []);
        setFunnel((f as any).data || null);
        setHealthRows((h as any).rows || []);
      } catch (e: any) {
        if (!alive) return;
        // fallback pra você não “perder a tela” se a API falhar
        setError(String(e?.message || e || "Failed to fetch"));
        setKpis(null);
        setKpisSeries([]);
        setFunnel(null);
        setHealthRows([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [apiBase, tenant, days]);

  // valores práticos pra UI
  const leads = n(kpis?.leads) ?? 0;
  const mql = n(kpis?.mql) ?? 0;
  const sql = n(kpis?.sql) ?? 0;
  const revenue = n(kpis?.revenue) ?? 0;
  const cr1 = n(kpis?.cr_lead_to_mql);
  const cr2 = n(kpis?.cr_mql_to_sql);
  const cr3 = n(kpis?.cr_sql_to_won);

  return (
    <div className="w-full h-full min-h-full bg-slate-50 text-slate-900 p-8 font-sans selection:bg-cyan-200 animate-in fade-in duration-700">
      <CopilotPanel />

      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-3">
        {debugLine}
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-pink-200 bg-pink-50 text-pink-800 px-4 py-3 text-sm font-bold">
          ERRO: {error}
          <div className="text-xs font-mono font-bold mt-2 opacity-80">
            Dica: se o erro for “Failed to fetch”, quase sempre é CORS no revops-api (corrige no index.js).
          </div>
        </div>
      )}

      <header className="flex justify-between items-end border-b border-slate-200 pb-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            STATUS DE CRESCIMENTO:
            <span className="text-cyan-600 border-b-2 border-cyan-500 pb-0.5">MVP ONLINE</span>
          </h1>
        </div>
        <div className="text-xs text-slate-500 font-mono tracking-widest font-bold">POWERED BY REVOPS OS™</div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-2 flex flex-col gap-10 border-r border-slate-200 pr-6">
          <MetricTile label="Leads" value={String(leads)} trend="up" color="blue" subtext={`client_id=${tenant}`} />
          <MetricTile label="MQL" value={String(mql)} trend="up" />
          <MetricTile label="SQL" value={String(sql)} trend="up" />
          <BarIndicator label="Estado de Crescimento" activeIndex={4} />
          <div className="mt-auto pt-8 border-t border-slate-200">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-2">Receita (Won)</div>
            <div className="text-3xl font-mono text-cyan-600 tracking-tight font-bold">
              {revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <div className="text-[10px] font-mono font-bold text-slate-600 mt-3 space-y-1">
              <div>CR Lead→MQL: {cr1 == null ? "—" : `${(cr1 * 100).toFixed(1)}%`}</div>
              <div>CR MQL→SQL: {cr2 == null ? "—" : `${(cr2 * 100).toFixed(1)}%`}</div>
              <div>CR SQL→Won: {cr3 == null ? "—" : `${(cr3 * 100).toFixed(1)}%`}</div>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="col-span-12 lg:col-span-7 flex flex-col px-4">
          <div className="h-[450px] w-full relative bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={S_CURVE_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" hide />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickFormatter={(val) => `$${val}M`}
                  axisLine={false}
                  tickLine={false}
                  fontFamily="monospace"
                  fontWeight="bold"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#e2e8f0",
                    color: "#0f172a",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#0f172a", fontFamily: "monospace" }}
                />
                <Line type="monotone" dataKey="growth" stroke="#cbd5e1" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="marketCrash" stroke="#ec4899" strokeWidth={2} dot={false} strokeDasharray="3 3" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-16 relative">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-4 px-4 font-bold">
              <span>Geração</span><span>Aquisição</span><span>Retenção</span><span>Expansão</span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6" />
            <div className="grid grid-cols-7 gap-3 h-40 items-end z-10 relative">
              <FunnelBar label="Consciência" height={30} color="bg-gradient-to-t from-cyan-700 to-cyan-500" />
              <FunnelBar label="Educação" height={45} color="bg-gradient-to-t from-cyan-700 to-cyan-500" />
              <FunnelBar label="Seleção" height={60} color="bg-gradient-to-t from-cyan-700 to-cyan-500" />
              <FunnelBar label="Aquisição" height={35} color="bg-gradient-to-t from-cyan-500 to-cyan-300 shadow-lg shadow-cyan-200" />
              <FunnelBar label="Onboarding" height={70} color="bg-gradient-to-t from-cyan-700 to-cyan-500" />
              <FunnelBar label="Retenção" height={55} color="bg-gradient-to-t from-cyan-700 to-cyan-500" />
              <FunnelBar label="Expansão" height={40} color="bg-gradient-to-t from-cyan-700 to-cyan-500" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-12 border-l border-slate-200 pl-6">
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-900 font-bold">Status de GTM</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-600 font-bold">
                {funnel ? "OK" : "—"}
              </div>
            </div>
            <div className="px-2"><MatrixGrid /></div>
          </div>

          <div className="flex-1 min-h-[250px] flex flex-col">
            <div className="flex justify-between text-[10px] text-slate-600 mb-4 font-mono font-bold">
              <span>Health rows: {healthRows.length}</span>
              <span>Series rows: {kpisSeries.length}</span>
            </div>
            <div className="flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DISTRIBUTION_DATA}>
                  <defs>
                    <linearGradient id="distGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="p90" stroke="#06b6d4" fill="url(#distGradient)" strokeWidth={2} />
                  <ReferenceLine x={10} stroke="#94a3b8" strokeDasharray="3 3" />
                  <ReferenceLine x={14} stroke="#64748b" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-mono font-bold">
              <span>$100k</span><span>$200k</span><span>$300k</span><span>$400k</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity size={20} className="text-cyan-600" />
          Funil de Conversão Interativo
        </h3>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
          <HorizontalFunnel data={HORIZONTAL_FUNNEL_DATA} />
        </div>
      </div>
    </div>
  );
};