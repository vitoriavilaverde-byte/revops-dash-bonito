import React, { useMemo, useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Settings,
  Database,
  MessageSquare,
  Clock,
  Briefcase,
  Target,
  UserCheck,
  Layers,
  Menu,
  X,
} from "lucide-react";

import { TENANTS } from "./constants";
import type { Tenant } from "./types";

import { DashboardView } from "./components/DashboardView";
import { LeadsView } from "./components/LeadsView";
import { SalesView } from "./components/SalesView";
import { PostSalesView } from "./components/PostSalesView";
import { CampaignsView } from "./components/CampaignsView";
import { TimelineView } from "./components/TimelineView";
import { FrameworkView } from "./components/FrameworkView";
import { LoginView } from "./components/LoginView";
import { GTMStrategyView } from "./components/GTMStrategyView";
import { VisitorsView } from "./components/VisitorsView";

// AdminViews.tsx exporta esses 3
import { ClientsView, SettingsView, FeedbackView } from "./components/AdminViews";

type TabKey =
  | "dashboard"
  | "framework"
  | "tabela"
  | "visitantes"
  | "leads"
  | "vendas"
  | "pos-vendas"
  | "campanhas"
  | "timeline"
  | "clientes"
  | "config"
  | "feedback";

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={[
      "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-all duration-200 rounded-lg mb-1",
      active
        ? "bg-violet-50 text-violet-700 border-r-4 border-violet-600 dark:bg-white/5 dark:text-violet-200 dark:border-violet-500/60"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5",
    ].join(" ")}
  >
    <Icon size={18} className={active ? "text-violet-600" : "text-slate-500"} />
    {label}
  </button>
);

function getManagerFlag() {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("manager") === "1") {
      localStorage.setItem("revops_is_manager", "1");
      return true;
    }
    return localStorage.getItem("revops_is_manager") === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ manager controla visibilidade do Admin
  const [isManager, setIsManager] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(TENANTS[0]);
  const [tenantMenuOpen, setTenantMenuOpen] = useState(false);

  // mobile nav
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setIsManager(getManagerFlag());
  }, []);

  // Base da API (se você já usa em outros componentes)
  const API_BASE = useMemo(() => {
    const base =
      (import.meta as any).env?.VITE_API_URL ||
      (import.meta as any).env?.VITE_API_BASE ||
      "https://revops-api-614980035835.us-east1.run.app";
    return String(base).replace(/\/$/, "");
  }, []);

  if (!isAuthenticated) {
    // Se seu LoginView consegue retornar papel/role, dá pra ligar aqui depois
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "framework":
        return (
          <FrameworkView
            tenantId={String(selectedTenant.id)}
            tenantName={String(selectedTenant.name)}
          />
        );
      case "tabela":
        return <GTMStrategyView />;
      case "visitantes":
        return <VisitorsView />;
      case "leads":
        return <LeadsView />;
      case "vendas":
        return <SalesView />;
      case "pos-vendas":
        return <PostSalesView />;
      case "campanhas":
        return <CampaignsView />;
      case "timeline":
        return <TimelineView />;

      // Admin (manager only)
      case "clientes":
        return (
          <ClientsView
            tenantId={String(selectedTenant.id)}
            tenantName={String(selectedTenant.name)}
            onPublished={() => setActiveTab("framework")}
          />
        );
      case "config":
        return <SettingsView />;
      case "feedback":
        // feedback é de usuário — mantém independente de manager
        return <FeedbackView />;

      default:
        return <DashboardView />;
    }
  };

  const goTab = (tab: TabKey) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
    setTenantMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-violet-200">
          R
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
          RevOps<span className="text-violet-600">OS</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Principal
          </div>
          <nav className="space-y-0.5">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => goTab("dashboard")}
            />
            <SidebarItem
              icon={Layers}
              label="Framework"
              active={activeTab === "framework"}
              onClick={() => goTab("framework")}
            />
            <SidebarItem
              icon={Database}
              label="Tabela"
              active={activeTab === "tabela"}
              onClick={() => goTab("tabela")}
            />
            <SidebarItem
              icon={Users}
              label="Visitantes"
              active={activeTab === "visitantes"}
              onClick={() => goTab("visitantes")}
            />
            <SidebarItem
              icon={Filter}
              label="Leads"
              active={activeTab === "leads"}
              onClick={() => goTab("leads")}
            />
            <SidebarItem
              icon={Briefcase}
              label="Vendas"
              active={activeTab === "vendas"}
              onClick={() => goTab("vendas")}
            />
            <SidebarItem
              icon={UserCheck}
              label="Pós-Vendas"
              active={activeTab === "pos-vendas"}
              onClick={() => goTab("pos-vendas")}
            />
            <SidebarItem
              icon={Target}
              label="Campanhas"
              active={activeTab === "campanhas"}
              onClick={() => goTab("campanhas")}
            />
            <SidebarItem
              icon={Clock}
              label="Timeline"
              active={activeTab === "timeline"}
              onClick={() => goTab("timeline")}
            />
          </nav>
        </div>

        {/* Admin só pra manager */}
        {isManager && (
          <div>
            <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Administrativo
            </div>
            <nav className="space-y-0.5">
              <SidebarItem
                icon={Users}
                label="Gerenciar Clientes"
                active={activeTab === "clientes"}
                onClick={() => goTab("clientes")}
              />
              <SidebarItem
                icon={Settings}
                label="Configurações"
                active={activeTab === "config"}
                onClick={() => goTab("config")}
              />
            </nav>
          </div>
        )}

        {/* Feedback sempre visível */}
        <div>
          <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Suporte
          </div>
          <nav className="space-y-0.5">
            <SidebarItem
              icon={MessageSquare}
              label="Feedback"
              active={activeTab === "feedback"}
              onClick={() => goTab("feedback")}
            />
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-300 dark:border-white/10">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-100 truncate">
              John Doe
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {isManager ? "Manager Workspace" : "User Workspace"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-hidden font-sans selection:bg-violet-200">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:block w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/10 shrink-0 shadow-sm z-20">
        <SidebarContent />
      </aside>

      {/* Mobile: Topbar + Drawer */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30">
        <div className="h-14 px-4 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg border border-slate-200 dark:border-white/10"
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>

          <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            RevOpsOS
          </div>

          <div className="w-10" />
        </div>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-[82vw] max-w-[320px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/10">
              <div className="h-14 px-3 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Menu
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-white/10"
                  aria-label="Fechar menu"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="h-[calc(100%-56px)]">
                <SidebarContent />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50 dark:bg-slate-950 pt-14 md:pt-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
          {/* Tenant selector */}
          <div className="relative">
            <button
              onClick={() => setTenantMenuOpen(!tenantMenuOpen)}
              className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-100 hover:text-violet-600 transition-colors bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:border-violet-200"
            >
              <span className="w-5 h-5 rounded bg-white dark:bg-slate-900 flex items-center justify-center text-[9px] border border-slate-200 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-100">
                {selectedTenant.logo}
              </span>
              {selectedTenant.name}
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {tenantMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg shadow-xl py-1 z-50">
                {TENANTS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTenant(t);
                      setTenantMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-100 hover:bg-violet-50 dark:hover:bg-white/5 hover:text-violet-700 flex items-center gap-3 transition-colors"
                  >
                    <span className="w-5 h-5 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[9px] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-200">
                      {t.logo}
                    </span>
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-md px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-100 cursor-pointer hover:border-violet-300 transition-colors shadow-sm">
              <Calendar size={14} className="text-violet-500" />
              <span>Últimos 30 dias</span>
              <ChevronDown size={12} className="text-slate-500" />
            </div>

            <button className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-white/5 rounded-md transition-colors">
              <Filter size={18} />
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-sm font-bold transition-colors shadow-md shadow-violet-200">
              <Download size={14} />
              Exportar
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-full mx-auto">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
