
import React from 'react';
import { CUSTOMER_SEGMENTS } from '../constants';
import { Save, MessageSquare, Settings as SettingsIcon, Users } from 'lucide-react';

export const ClientsView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold text-grey">Gerenciar Clientes</h2>
        <p className="text-gray-400 mt-1">Visão geral da base de clientes e segmentação.</p>
      </div>
      <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium">
        + Novo Cliente
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {CUSTOMER_SEGMENTS.map((seg, idx) => (
        <div key={idx} className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-grey mb-2">{seg.name}</h3>
          <div className="text-3xl font-bold text-grey mb-1">{seg.count}</div>
          <div className="text-sm text-gray-400">Clientes Ativos</div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
            <span className="text-gray-500">MRR: R$ {(seg.mrr/1000).toFixed(0)}k</span>
            <span className={`font-medium ${seg.health > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>Health: {seg.health}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-surface border border-border rounded-xl p-12 text-center text-gray-500">
      <Users size={48} className="mx-auto mb-4 opacity-20" />
      <p>Tabela detalhada de clientes em desenvolvimento.</p>
    </div>
  </div>
);

export const SettingsView: React.FC = () => (
  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
    <div>
      <h2 className="text-2xl font-bold text-grey">Configurações</h2>
      <p className="text-gray-400 mt-1">Preferências do sistema e da conta.</p>
    </div>

    <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Empresa</label>
        <input type="text" defaultValue="RevOps Analytics" className="w-full bg-background border border-border rounded-md px-4 py-2 text-grey focus:outline-none focus:border-primary" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Moeda Padrão</label>
          <select className="w-full bg-background border border-border rounded-md px-4 py-2 text-grey focus:outline-none focus:border-primary">
            <option>BRL (R$)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Fuso Horário</label>
          <select className="w-full bg-background border border-border rounded-md px-4 py-2 text-grey focus:outline-none focus:border-primary">
            <option>America/Sao_Paulo</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2">
          <Save size={16} /> Salvar Alterações
        </button>
      </div>
    </div>
  </div>
);

export const FeedbackView: React.FC = () => (
  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
    <div>
      <h2 className="text-2xl font-bold text-grey">Feedback</h2>
      <p className="text-gray-400 mt-1">Ajude-nos a melhorar a plataforma.</p>
    </div>

    <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Feedback</label>
        <select className="w-full bg-background border border-border rounded-md px-4 py-2 text-grey focus:outline-none focus:border-primary">
          <option>Sugestão</option>
          <option>Bug</option>
          <option>Dúvida</option>
          <option>Elogio</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
        <textarea 
          rows={6} 
          placeholder="Descreva seu feedback..." 
          className="w-full bg-background border border-border rounded-md px-4 py-2 text-grey focus:outline-none focus:border-primary resize-none"
        ></textarea>
      </div>

      <div className="pt-4 border-t border-border">
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2">
          <MessageSquare size={16} /> Enviar Feedback
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Histórico Recente</h3>
      <div className="bg-surface border border-border rounded-xl p-4 flex gap-4 opacity-70">
        <div className="p-2 bg-blue-500/20 rounded text-blue-400 h-fit"><MessageSquare size={16} /></div>
        <div>
          <div className="text-sm font-bold text-grey">Sugestão de melhoria</div>
          <div className="text-xs text-gray-500 mb-1">Há 2 dias</div>
          <p className="text-sm text-gray-400">Adicionar filtros avançados no dashboard...</p>
        </div>
      </div>
    </div>
  </div>
);
