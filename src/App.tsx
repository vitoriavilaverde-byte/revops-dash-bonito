// src/App.tsx
import React, { useMemo, useState } from "react";
import { DashboardView } from "./components/DashboardView";
import { CampaignsView } from "./components/CampaignsView";
import { VisitorsView } from "./components/VisitorsView";
import { LeadsView } from "./components/LeadsView";
import { SalesView } from "./components/SalesView";
import { PostSalesView } from "./components/PostSalesView";
import { TimelineView } from "./components/TimelineView";
import { FrameworkView } from "./components/FrameworkView";
import { GTMStrategyView } from "./components/GTMStrategyView";

// Admin (apenas manager)
import { ClientsView, SettingsView, FeedbackView } from "./components/AdminViews";

type ViewKey =
  | "dashboard"
  | "campaigns"
  | "visitors"
  | "leads"
  | "sales"
  | "postsales"
  | "timeline"
  | "framework"
  | "gtm"
  | "admin";

const NAV: Array<{ key: ViewKey; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "campaigns", label: "Campanhas" },
  { key: "visitors", label: "Visitantes" },
  { key: "leads", label: "Leads" },
  { key: "sales", label: "Vendas" },
  { key: "postsales", label: "Pós-vendas" },
  { key: "timeline", label: "Timeline" },
  { key: "framework", label: "Framework" },
  { key: "gtm", label: "GTM Strategy" },
  { key: "admin", label: "Admin" }, // escondido para "user"
];

type UserRole = "manager" | "user";

export default function App() {
  // Mantém API configurada pra prod (e evita "unused")
  const API = useMemo(() => {
    const base =
      (import.meta as any).env?.VITE_API_URL ||
      (import.meta as any).env?.VITE_API_BASE ||
      "https://revops-api-614980035835.us-east1.run.app";
    return String(base).replace(/\/$/, "");
  }, []);

  const [view, setView] = useState<ViewKey>("dashboard");

  // Role (MVP) via localStorage
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("revops:role");
    return saved === "manager" || saved === "user" ? saved : "user";
  });

  const setUserRole = (r: UserRole) => {
    setRole(r);
    localStorage.setItem("revops:role", r);

    // se o usuário não é manager e estava no admin, volta pro dashboard
    if (r !== "manager" && view === "admin") setView("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-slate-200 bg-white min-h-screen">
          <div className="p-5 border-b border-slate-100">
            <div className="text-lg font-extrabold text-slate-900">RevOps</div>
            <div className="text-xs font-bold text-slate-500 mt-1">MVP</div>
            <div className="text-[11px] text-slate-500 mt-2">
              API: <span className="font-mono">{API}</span>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {NAV.filter((item) => role === "manager" || item.key !== "admin").map(
              (item) => {
                const active = item.key === view;
                return (
                  <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={[
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors",
                      active
                        ? "bg-violet-50 text-violet-700 border border-violet-100"
                        : "text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              }
            )}
          </nav>

          {/* Toggle de role (teste) */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
              Role (teste)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUserRole("user")}
                className={`flex-1 text-xs font-extrabold px-2 py-1 rounded border ${
                  role === "user"
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setUserRole("manager")}
                className={`flex-1 text-xs font-extrabold px-2 py-1 rounded border ${
                  role === "manager"
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                Manager
              </button>
            </div>
          </div>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1 p-6">
          {view === "dashboard" && <DashboardView />}
          {view === "campaigns" && <CampaignsView />}
          {view === "visitors" && <VisitorsView />}
          {view === "leads" && <LeadsView />}
          {view === "sales" && <SalesView />}
          {view === "postsales" && <PostSalesView />}
          {view === "timeline" && <TimelineView />}
          {view === "framework" && <FrameworkView />}
          {view === "gtm" && <GTMStrategyView />}

          {/* Admin apenas para manager */}
          {role === "manager" && view === "admin" && (
            <div className="space-y-10">
              <ClientsView />
              <SettingsView />
              <FeedbackView />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
