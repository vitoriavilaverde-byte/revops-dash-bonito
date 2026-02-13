import { useMemo, useState } from "react";
import { Filter, Download, X } from "lucide-react";
import { exportCSV, exportXLSX, exportPDFSimple } from "../utils/exporters";

type Filters = {
  days: 7 | 30 | 90;
  channel: "all" | "paid" | "organic" | "crm";
  funnelStage: "all" | "lead" | "mql" | "sql" | "won";
};

export function HeaderActions(props: {
  onApplyFilters?: (f: Filters) => void;
  onClearFilters?: () => void;
  // dados que serão exportados (você pluga nisso depois)
  exportRows?: Record<string, any>[];
  exportTitle?: string;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [draft, setDraft] = useState<Filters>({
    days: 30,
    channel: "all",
    funnelStage: "all",
  });

  const rows = useMemo(() => props.exportRows ?? [], [props.exportRows]);
  const title = props.exportTitle ?? "Export";

  return (
    <div className="flex items-center gap-2">
      {/* Filtros */}
      <button
        onClick={() => setFiltersOpen(true)}
        className="p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 dark:text-slate-200 dark:hover:bg-white/5 rounded-md transition-colors"
        aria-label="Filtros"
      >
        <Filter size={18} />
      </button>

      {/* Export */}
      <div className="relative">
        <button
          onClick={() => setExportOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-sm font-bold transition-colors"
        >
          <Download size={16} />
          Exportar
        </button>

        {exportOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
              onClick={() => {
                exportCSV(rows, "export.csv");
                setExportOpen(false);
              }}
            >
              CSV
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
              onClick={() => {
                exportXLSX(rows, "export.xlsx");
                setExportOpen(false);
              }}
            >
              XLSX
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
              onClick={() => {
                exportPDFSimple(title, rows, "export.pdf");
                setExportOpen(false);
              }}
            >
              PDF
            </button>
          </div>
        )}
      </div>

      {/* Drawer filtros */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[92vw] max-w-[420px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                Filtros
              </div>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-300 mb-2">
                  Período
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[7, 30, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDraft((p) => ({ ...p, days: d as any }))}
                      className={[
                        "px-3 py-2 rounded-md border text-sm font-bold",
                        draft.days === d
                          ? "border-violet-300 bg-violet-50 text-violet-700 dark:bg-white/5 dark:text-violet-300 dark:border-violet-500/40"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-200 dark:border-white/10 dark:hover:bg-white/5",
                      ].join(" ")}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-300 mb-2">
                  Canal
                </div>
                <select
                  value={draft.channel}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, channel: e.target.value as any }))
                  }
                  className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  <option value="all">Todos</option>
                  <option value="paid">Pago</option>
                  <option value="organic">Orgânico</option>
                  <option value="crm">CRM</option>
                </select>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-300 mb-2">
                  Etapa do funil
                </div>
                <select
                  value={draft.funnelStage}
                  onChange={(e) =>
                    setDraft((p) => ({
                      ...p,
                      funnelStage: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  <option value="all">Todas</option>
                  <option value="lead">Lead</option>
                  <option value="mql">MQL</option>
                  <option value="sql">SQL</option>
                  <option value="won">Won</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    props.onClearFilters?.();
                    setDraft({ days: 30, channel: "all", funnelStage: "all" });
                    setFiltersOpen(false);
                  }}
                  className="flex-1 px-3 py-2 rounded-md border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  Limpar
                </button>
                <button
                  onClick={() => {
                    props.onApplyFilters?.(draft);
                    setFiltersOpen(false);
                  }}
                  className="flex-1 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
