import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, Filter, Download, Calendar, ChevronDown,
  Settings, Database, MessageSquare, Clock, Briefcase,
  Target, UserCheck, Layers
} from 'lucide-react';

import { TENANTS } from './constants';
import type { Tenant } from './types';

import { DashboardView } from './components/DashboardView';
import { LeadsView } from './components/LeadsView';
import { SalesView } from './components/SalesView';
import { PostSalesView } from './components/PostSalesView';
import { CampaignsView } from './components/CampaignsView';
import { TimelineView } from './components/TimelineView';
import { ClientsView, SettingsView, FeedbackView } from './components/AdminViews';
import { FrameworkView } from './components/FrameworkView';
import { LoginView } from './components/LoginView';
import { GTMStrategyView } from './components/GTMStrategyView';
import { VisitorsView } from './components/VisitorsView';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-all duration-200 rounded-lg mb-1 ${
      active
        ? 'bg-violet-50 text-violet-700 border-r-4 border-violet-600'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`}
  >
    <Icon size={18} className={active ? 'text-violet-600' : 'text-slate-500'} />
    {label}
  </button>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(TENANTS[0]);
  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);

  // ✅ API correta (env > fallback fixo)
  const API_BASE = useMemo(() => {
    const base =
      import.meta.env.VITE_API_URL ||
      import.meta.env.VITE_API_BASE ||
      'https://revops-api-614980035835.us-east1.run.app';
    return String(base).replace(/\/$/, '');
  }, []);

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'framework': return <FrameworkView />;
      case 'visitantes': return <VisitorsView />;
      case 'leads': return <LeadsView />;
      case 'vendas': return <SalesView />;
      case 'pos-vendas': return <PostSalesView />;
      case 'campanhas': return <CampaignsView />;
      case 'timeline': return <TimelineView />;
      case 'clientes': return <ClientsView />;
      case 'config': return <SettingsView />;
      case 'feedback': return <FeedbackView />;
      case 'tabela': return <GTMStrategyView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-violet-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-sm z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-violet-200">
            R
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            RevOps<span className="text-violet-600">OS</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          <div>
            <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Principal</div>
            <nav className="space-y-0.5">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <SidebarItem icon={Layers} label="Framework" active={activeTab === 'framework'} onClick={() => setActiveTab('framework')} />
              <SidebarItem icon={Database} label="Tabela" active={activeTab === 'tabela'} onClick={() => setActiveTab('tabela')} />
              <SidebarItem icon={Users} label="Visitantes" active={activeTab === 'visitantes'} onClick={() => setActiveTab('visitantes')} />
              <SidebarItem icon={Filter} label="Leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
              <SidebarItem icon={Briefcase} label="Vendas" active={activeTab === 'vendas'} onClick={() => setActiveTab('vendas')} />
              <SidebarItem icon={UserCheck} label="Pós-Vendas" active={activeTab === 'pos-vendas'} onClick={() => setActiveTab('pos-vendas')} />
              <SidebarItem icon={Target} label="Campanhas" active={activeTab === 'campanhas'} onClick={() => setActiveTab('campanhas')} />
              <SidebarItem icon={Clock} label="Timeline" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} />
            </nav>
          </div>

          <div>
            <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Administrativo</div>
            <nav className="space-y-0.5">
              <SidebarItem icon={Users} label="Gerenciar Clientes" active={activeTab === 'clientes'} onClick={() => setActiveTab('clientes')} />
              <SidebarItem icon={Settings} label="Configurações" active={activeTab === 'config'} onClick={() => setActiveTab('config')} />
              <SidebarItem icon={MessageSquare} label="Feedback" active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-300">
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-slate-700 truncate">John Doe</div>
              <div className="text-xs text-slate-500 truncate">Admin Workspace</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="relative flex items-center gap-3">
            <button
              onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
              className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-violet-600 transition-colors bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 hover:border-violet-200"
            >
              <span className="w-5 h-5 rounded bg-white flex items-center justify-center text-[9px] border border-slate-200 shadow-sm text-slate-700">
                {selectedTenant.logo}
              </span>
              {selectedTenant.name}
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {isTenantMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {TENANTS.map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => { setSelectedTenant(tenant); setIsTenantMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-3 transition-colors"
                  >
                    <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[9px] border border-slate-200 text-slate-600">
                      {tenant.logo}
                    </span>
                    {tenant.name}
                  </button>
                ))}
              </div>
            )}

            {/* ✅ deixa explícito o endpoint pra você não cair no HTML de novo */}
            <span className="text-[11px] font-bold text-slate-400 hidden md:inline">
              API: <span className="text-slate-600">{API_BASE}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm font-bold text-slate-700 cursor-pointer hover:border-violet-300 transition-colors shadow-sm">
              <Calendar size={14} className="text-violet-500" />
              <span>Últimos 30 dias</span>
              <ChevronDown size={12} className="text-slate-500" />
            </div>
            <button className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors">
              <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-sm font-bold transition-colors shadow-md shadow-violet-200">
              <Download size={14} /> Exportar
            </button>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
          <div className="max-w-full mx-auto">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
