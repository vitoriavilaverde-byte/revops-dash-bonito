
import React from 'react';
import { CUSTOMER_SEGMENTS } from '../constants';
import { Save, MessageSquare, Settings as SettingsIcon, Users } from 'lucide-react';

// no topo do AdminViews.tsx, adicione:
import { STRATEGY_TEMPLATES } from "../templates/strategyTemplates";
import { saveStrategy } from "../lib/strategyStorage";
import type { BusinessModel, Maturity } from "../templates/strategyTemplates";

// substitua o ClientsView por este:
export const ClientsView: React.FC<{
  tenantId: string;
  tenantName: string;
  onPublished?: () => void;
}> = ({ tenantId, tenantName, onPublished }) => {
  const [open, setOpen] = React.useState(false);
  const [model, setModel] = React.useState<BusinessModel>("b2b");
  const [maturity, setMaturity] = React.useState<Maturity>("basic");
  const [goal, setGoal] = React.useState<"revenue"|"volume"|"efficiency"|"retention">("revenue");

  const tpl = STRATEGY_TEMPLATES[model];
  const targets = tpl.targetsByMaturity[maturity];

  function publish() {
    saveStrategy({
      tenantId,
      model,
      maturity,
      quarterGoal: goal,
      northStar: tpl.northStar,
      kpis: tpl.kpis,
      targets,
      playbooks: tpl.playbooks,
      updatedAt: new Date().toISOString(),
    });
    setOpen(false);
    onPublished?.();
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-grey">Gerenciar Clientes</h2>
          <p className="text-gray-400 mt-1">
            Estratégia e metas por tenant. Selecionado: <span className="text-slate-200">{tenantName}</span>
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Estratégia do Tenant
        </button>
      </div>

      {/* cards existentes */}
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

      {/* modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-500">Estratégia do tenant</div>
                <div className="text-lg font-extrabold text-slate-900">{tenantName}</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-900 font-bold">
                Fechar
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Modelo</label>
                  <select className="w-full border border-slate-200 rounded-md px-3 py-2" value={model}
                    onChange={(e) => setModel(e.target.value as BusinessModel)}>
                    <option value="b2b">B2B</option>
                    <option value="b2c">B2C</option>
                    <option value="ecom">E-commerce</option>
                    <option value="saas">SaaS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Maturidade</label>
                  <select className="w-full border border-slate-200 rounded-md px-3 py-2" value={maturity}
                    onChange={(e) => setMaturity(e.target.value as Maturity)}>
                    <option value="basic">Básico</option>
                    <option value="mid">Intermediário</option>
                    <option value="adv">Avançado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Objetivo do trimestre</label>
                  <select className="w-full border border-slate-200 rounded-md px-3 py-2" value={goal}
                    onChange={(e) => setGoal(e.target.value as any)}>
                    <option value="revenue">Receita</option>
                    <option value="volume">Volume</option>
                    <option value="efficiency">Eficiência</option>
                    <option value="retention">Retenção</option>
                  </select>
                </div>

                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <div className="text-xs font-bold text-slate-500 mb-1">North Star</div>
                  <div className="font-extrabold text-slate-900">{tpl.northStar}</div>
                  <div className="text-xs text-slate-500 mt-2">Template: <span className="font-bold">{tpl.label}</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500">Metas sugeridas</div>
                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {targets.map((x) => (
                    <div key={x.metricKey} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                      <div>
                        <div className="text-sm font-extrabold text-slate-900">{x.label}</div>
                        <div className="text-[11px] font-bold text-slate-500">Camada {x.layer} • {x.metricKey}</div>
                      </div>
                      <div className="text-sm font-extrabold text-violet-700">
                        {x.unit === "R$" ? "R$ " : ""}{x.target}{x.unit === "%" ? "%" : x.unit === "min" ? " min" : x.unit === "days" ? " dias" : ""}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <div className="text-xs font-bold text-slate-500 mb-2">Playbooks sugeridos</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                    {tpl.playbooks.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 flex items-center justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border border-slate-200 font-bold text-slate-700">
                Cancelar
              </button>
              <button onClick={publish} className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-extrabold">
                Publicar no Framework
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-surface border border-border rounded-xl p-12 text-center text-gray-500">
        <Users size={48} className="mx-auto mb-4 opacity-20" />
        <p>Agora o tenant selecionado pode ter metas publicadas e acompanhadas no Framework.</p>
      </div>
    </div>
  );
};
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
