
import React from 'react';
import { 
  POST_SALES_KPIS, 
  RETENTION_CHURN_NPS_TREND, 
  LTV_COHORT_DATA, 
  SUPPORT_METRICS, 
  UPSELL_CROSS_SELL_DATA,
  POST_SALES_SUMMARY
} from '../constants';
import { KPICard } from './ui/KPICards';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell, ComposedChart, Area, Line
} from 'recharts';

export const PostSalesView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pós-Venda & Customer Success</h2>
          <p className="text-slate-600 font-medium mt-1">Retenção, satisfação do cliente e expansão de receita.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {POST_SALES_KPIS.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Retenção, Churn e NPS</h3>
          <p className="text-xs text-slate-500 font-bold mb-6">Evolução mensal dos indicadores de saúde</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={RETENTION_CHURN_NPS_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold' }} />
                <Area yAxisId="left" type="monotone" dataKey="retencao" name="Retenção (%)" fill="#10b981" fillOpacity={0.1} stroke="#10b981" strokeWidth={3} />
                <Line yAxisId="left" type="monotone" dataKey="churn" name="Churn (%)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="nps" name="NPS" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">LTV por Cohort</h3>
          <p className="text-xs text-slate-500 font-bold mb-6">Valor vitalício por mês de entrada</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LTV_COHORT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val/1000}k`} fontWeight="bold" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="ltv" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide px-1">Métricas de Suporte</h3>
          {SUPPORT_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-50 text-slate-600`}>
                <metric.icon size={24} className={
                  metric.color === 'blue' ? 'text-blue-500' : 
                  metric.color === 'violet' ? 'text-violet-500' : 
                  metric.color === 'emerald' ? 'text-emerald-500' : 'text-orange-500'
                } />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{metric.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-xl font-bold text-slate-900">{metric.value}</div>
                  <div className={`text-xs font-bold text-emerald-600`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Revenue de Upsell e Cross-sell</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Produto/Serviço</th>
                  <th className="px-6 py-4 text-right">Receita</th>
                  <th className="px-6 py-4 text-right">Clientes</th>
                  <th className="px-6 py-4 text-right">Receita/Cliente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {UPSELL_CROSS_SELL_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{row.product}</td>
                    <td className="px-6 py-4 text-right text-slate-900 font-bold">R$ {row.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-slate-700 font-bold">{row.clients}</td>
                    <td className="px-6 py-4 text-right text-slate-600 font-bold">R$ {row.arpc.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POST_SALES_SUMMARY.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                'bg-violet-100 text-violet-600'
              }`}>
                <item.icon size={20} />
              </div>
              <h4 className="font-bold text-slate-900">{item.label}</h4>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{item.value}</div>
            <div className="text-emerald-600 font-bold text-sm">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
