
import React from 'react';
import { 
  LEADS_KPIS, 
  LEAD_GENERATION_TREND, 
  LEAD_SCORE_DISTRIBUTION, 
  LEAD_QUALITY_METRICS, 
  LEAD_SOURCE_PERFORMANCE 
} from '../constants';
import { KPICard } from './ui/KPICards';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  Legend, AreaChart, Area
} from 'recharts';

export const LeadsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestão de Leads</h2>
          <p className="text-slate-600 font-medium mt-1">Qualificação, scoring e performance de canais de aquisição.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEADS_KPIS.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Geração e Qualificação de Leads</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LEAD_GENERATION_TREND}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }} />
                <Area type="monotone" dataKey="leads" name="Leads" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={3} />
                <Area type="monotone" dataKey="mql" name="MQL" stroke="#8b5cf6" fillOpacity={0} strokeWidth={3} />
                <Area type="monotone" dataKey="sql" name="SQL" stroke="#f97316" fillOpacity={0} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Distribuição de Lead Score</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LEAD_SCORE_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="range" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {LEAD_SCORE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide px-1">Métricas de Qualidade</h3>
          {LEAD_QUALITY_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-50 text-slate-600`}>
                <metric.icon size={24} className={
                  metric.color === 'blue' ? 'text-blue-500' : 
                  metric.color === 'violet' ? 'text-violet-500' : 'text-emerald-500'
                } />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{metric.label}</div>
                <div className="text-xl font-bold text-slate-900">{metric.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Performance por Fonte de Lead</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Fonte</th>
                  <th className="px-6 py-4 text-right">Leads Gerados</th>
                  <th className="px-6 py-4 text-right">Taxa de Conversão</th>
                  <th className="px-6 py-4 text-right">Custo por Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LEAD_SOURCE_PERFORMANCE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{row.source}</td>
                    <td className="px-6 py-4 text-right text-slate-700 font-bold">{row.leads.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 font-bold text-xs">
                        {row.conversion}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-900 font-bold">{row.cpl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
