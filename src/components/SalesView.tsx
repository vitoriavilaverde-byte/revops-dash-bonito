
import React from 'react';
import { 
  SALES_KPIS, 
  SALES_REVENUE_TREND, 
  PIPELINE_STAGES_SALES, 
  WIN_LOSS_DATA, 
  TOP_SELLERS_DATA 
} from '../constants';
import { KPICard } from './ui/KPICards';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend, PieChart, Pie
} from 'recharts';

export const SalesView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Performance Comercial</h2>
          <p className="text-slate-600 font-medium mt-1">Acompanhamento de vendas, pipeline e produtividade do time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SALES_KPIS.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Tendência de Vendas e Receita</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SALES_REVENUE_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val/1000}k`} fontWeight="bold" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold' }} />
                <Line yAxisId="left" type="monotone" dataKey="vendas" name="Vendas" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="receita" name="Receita (R$)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Pipeline por Estágio</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PIPELINE_STAGES_SALES} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis dataKey="stage" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={80} fontWeight="bold" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide">Análise de Ganhos e Perdas</h3>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={WIN_LOSS_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {WIN_LOSS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {WIN_LOSS_DATA.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600 font-bold">{item.name}</span>
                </div>
                <span className="text-[var(--text)] font-extrabold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[var(--panel)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Top Vendedores</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Vendedor</th>
                  <th className="px-6 py-4 text-right">Vendas</th>
                  <th className="px-6 py-4 text-right">Receita</th>
                  <th className="px-6 py-4 text-right">Taxa de Ganho</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_SELLERS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-[var(--border)]">
                        {row.rank}
                      </div>
                      <span className="font-bold text-slate-800">{row.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700 font-bold">{row.sales}</td>
                    <td className="px-6 py-4 text-right text-[var(--text)] font-bold">R$ {row.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 rounded-md bg-violet-50 text-violet-600 font-bold text-xs">
                        {row.winRate}%
                      </span>
                    </td>
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
