
import React from 'react';
import { 
  CAMPAIGN_KPIS,
  REVENUE_PIPELINE_TREND_DATA,
  CONVERSION_FUNNEL_DATA,
  PIPELINE_VELOCITY_DATA,
  REVENUE_ATTRIBUTION_DATA,
  CAMPAIGN_PERFORMANCE_TABLE
} from '../constants';
import { KPICard } from './ui/KPICards';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, DollarSign, Target, Activity, Filter, Download, Calendar, ChevronDown } from 'lucide-react';

export const CampaignsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Performance de Campanhas</h2>
          <p className="text-slate-600 font-medium mt-1">Análise detalhada por canal, ROI e atribuição de receita.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm font-bold text-slate-700 cursor-pointer hover:border-violet-300 transition-colors shadow-sm">
            <Calendar size={14} className="text-violet-500" />
            <span>Últimos 30 dias</span>
            <ChevronDown size={12} className="text-slate-400" />
          </div>
          <button className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors border border-slate-200 bg-white shadow-sm">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-sm font-bold transition-colors shadow-md shadow-violet-200">
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAMPAIGN_KPIS.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Tendência de Receita e Pipeline</h3>
          <p className="text-xs text-slate-500 font-bold mb-6">Receita fechada vs. prevista e pipeline aberto</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_PIPELINE_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val}k`} fontWeight="bold" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="pipeline" name="Pipeline Aberto" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Funil de Conversão</h3>
          <p className="text-xs text-slate-500 font-bold mb-6">Taxa de conversão entre estágios</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONVERSION_FUNNEL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis dataKey="stage" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={80} fontWeight="bold" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="text-center">Lead → SQL<br/><span className="text-slate-900 text-sm">20.0%</span></div>
            <div className="text-center">SQL → Oportunidade<br/><span className="text-slate-900 text-sm">40.0%</span></div>
            <div className="text-center">Oportunidade → Fechado<br/><span className="text-slate-900 text-sm">19.9%</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Velocidade do Pipeline</h3>
          <p className="text-xs text-slate-500 font-bold mb-6">Tempo médio de conversão por estágio</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PIPELINE_VELOCITY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} fontWeight="bold" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{ fontWeight: 'bold' }} />
                <Bar dataKey="real" name="Velocidade Real" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ciclo" name="Ciclo de Vendas" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Atribuição de Receita por Canal</h3>
          <p className="text-xs text-slate-500 font-bold mb-6">Modelo multi-touch (último clique)</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={REVENUE_ATTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {REVENUE_ATTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Performance de Campanhas</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Análise detalhada por canal e ROI</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Campanha</th>
                <th className="px-6 py-4">Canal</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Investimento</th>
                <th className="px-6 py-4 text-right">Leads</th>
                <th className="px-6 py-4 text-right">Oportunidades</th>
                <th className="px-6 py-4 text-right">Receita</th>
                <th className="px-6 py-4 text-right">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CAMPAIGN_PERFORMANCE_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-bold">{row.channel}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      row.status === 'Ativa' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-700 font-bold">R$ {row.investment.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-slate-700 font-bold">{row.leads}</td>
                  <td className="px-6 py-4 text-right text-slate-700 font-bold">{row.opportunities}</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-bold">R$ {row.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-emerald-600 font-bold">{row.roi}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><TrendingUp size={20} /></div>
            <h4 className="font-bold text-slate-900">Top Performing Channel</h4>
          </div>
          <div className="text-xl font-bold text-slate-900 mb-1">Email Marketing</div>
          <div className="text-emerald-600 font-bold text-sm mb-2">ROI de 3,957%</div>
          <p className="text-xs text-slate-600 font-bold">389 leads gerados este mês</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><DollarSign size={20} /></div>
            <h4 className="font-bold text-slate-900">Pipeline de Receita</h4>
          </div>
          <div className="text-xl font-bold text-slate-900 mb-1">R$ 2.1M</div>
          <div className="text-emerald-600 font-bold text-sm mb-2">+15.2% vs. mês anterior</div>
          <p className="text-xs text-slate-600 font-bold">287 oportunidades em negociação</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-100 rounded-lg text-violet-600"><Target size={20} /></div>
            <h4 className="font-bold text-slate-900">Taxa de Conversão Geral</h4>
          </div>
          <div className="text-xl font-bold text-slate-900 mb-1">3.2%</div>
          <div className="text-emerald-600 font-bold text-sm mb-2">+0.4pp vs. mês anterior</div>
          <p className="text-xs text-slate-600 font-bold">143 deals fechados de 4,482 MQLs</p>
        </div>
      </div>
    </div>
  );
};
