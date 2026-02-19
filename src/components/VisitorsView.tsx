
import React from 'react';
import { 
  VISITORS_KPIS, 
  WEEKLY_TRAFFIC_DATA, 
  TRAFFIC_SOURCE_DATA, 
  DEVICE_DATA, 
  TOP_PAGES_DATA 
} from '../constants';
import { KPICard } from './ui/KPICards';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

export const VisitorsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Análise de Visitantes</h2>
          <p className="text-[var(--muted)] mt-1">Métricas de tráfego, engajamento e comportamento.</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {VISITORS_KPIS.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      {/* Weekly Traffic Evolution */}
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Evolução Temporal do Tráfego Semanal</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={WEEKLY_TRAFFIC_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
              <Area type="monotone" dataKey="visitantes" name="Visitantes" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVis)" strokeWidth={3} />
              <Area type="monotone" dataKey="sessoes" name="Sessões" stroke="#06b6d4" fillOpacity={1} fill="url(#colorSes)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traffic Source Chart */}
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 h-80 flex flex-col shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Origem de Tráfego</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TRAFFIC_SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {TRAFFIC_SOURCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px' }}
                />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Devices Chart */}
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 h-80 flex flex-col shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Dispositivos</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEVICE_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={60} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                  {DEVICE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Pages Section */}
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Páginas Mais Visitadas</h3>
        <div className="space-y-6">
          {TOP_PAGES_DATA.map((page, index) => {
            const maxViews = Math.max(...TOP_PAGES_DATA.map(p => p.views));
            const percentage = (page.views / maxViews) * 100;
            return (
              <div key={index} className="w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-700 font-medium">{page.path}</span>
                  <span className="text-xs text-[var(--muted)] font-semibold">{page.views.toLocaleString()} visualizações</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
