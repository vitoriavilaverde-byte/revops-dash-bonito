cd ~/revops-dash-bonito

cat > src/components/AdminViews.tsx << 'EOF'
import React from 'react';
import { CUSTOMER_SEGMENTS } from '../constants';
import { Save, MessageSquare, Users } from 'lucide-react';

export const ClientsView: React.FC<{
  tenantId?: string;
  tenantName?: string;
  onPublished?: () => void;
}> = ({ tenantName }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Gerenciar Clientes</h2>
        <p className="text-slate-500 mt-1">
          Visão geral da base de clientes e segmentação{tenantName ? ` • Tenant: ${tenantName}` : ''}.
        </p>
      </div>
      <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-extrabold shadow-sm">
        + Novo Cliente
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {CUSTOMER_SEGMENTS.map((seg, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-900 mb-2">{seg.name}</h3>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">{seg.count}</div>
          <div className="text-sm text-slate-500">Clientes Ativos</div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm">
            <span className="text-slate-500 font-bold">MRR: R$ {(seg.mrr/1000).toFixed(0)}k</span>
            <span className={`font-extrabold ${seg.health > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
              Health: {seg.health}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 shadow-sm">
      <Users size={48} className="mx-auto mb-4 opacity-20" />
      <p className="font-bold">Tabela detalhada de clientes em desenvolvimento.</p>
    </div>
  </div>
);

export const SettingsView: React.FC = () => (
  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900">Configurações</h2>
      <p className="text-slate-500 mt-1">Preferências do sistema e da conta.</p>
    </div>

    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
      <div>
        <label className="block text-sm font-bold text-slate-600 mb-2">Nome da Empresa</label>
        <input
          type="text"
          defaultValue="RevOps Analytics"
          className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 focus:outline-none focus:border-violet-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Moeda Padrão</label>
          <select className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 focus:outline-none focus:border-violet-400">
            <option>BRL (R$)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Fuso Horário</label>
          <select className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 focus:outline-none focus:border-violet-400">
            <option>America/Sao_Paulo</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-extrabold flex items-center gap-2 shadow-sm">
          <Save size={16} /> Salvar Alterações
        </button>
      </div>
    </div>
  </div>
);

export const FeedbackView: React.FC = () => (
  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900">Feedback</h2>
      <p className="text-slate-500 mt-1">Ajude-nos a melhorar a plataforma.</p>
    </div>

    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
      <div>
        <label className="block text-sm font-bold text-slate-600 mb-2">Tipo de Feedback</label>
        <select className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 focus:outline-none focus:border-violet-400">
          <option>Sugestão</option>
          <option>Bug</option>
          <option>Dúvida</option>
          <option>Elogio</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-600 mb-2">Mensagem</label>
        <textarea
          rows={6}
          placeholder="Descreva seu feedback..."
          className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 focus:outline-none focus:border-violet-400 resize-none"
        />
      </div>

      <div className="pt-4 border-t border-slate-200">
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-extrabold flex items-center gap-2 shadow-sm">
          <MessageSquare size={16} /> Enviar Feedback
        </button>
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Histórico Recente</h3>
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 opacity-90 shadow-sm">
        <div className="p-2 bg-violet-50 rounded text-violet-700 h-fit border border-violet-100">
          <MessageSquare size={16} />
        </div>
        <div>
          <div className="text-sm font-extrabold text-slate-900">Sugestão de melhoria</div>
          <div className="text-xs text-slate-500 mb-1">Há 2 dias</div>
          <p className="text-sm text-slate-600">Adicionar filtros avançados no dashboard...</p>
        </div>
      </div>
    </div>
  </div>
);
EOF
