cd ~/revops-dash-bonito

cat > src/components/AdminViews.tsx << 'EOF'
import React from 'react';
import { CUSTOMER_SEGMENTS } from '../constants';
import { Save, MessageSquare, Users } from 'lucide-react';

import React, { useMemo, useState } from "react";
import { Save, Users } from "lucide-react";
import { templateTargets } from "../strategy/templates";
import { saveStrategy, type BusinessModel, type Strategy, type Target } from "../strategy/store";

export const ClientsView: React.FC<{
  tenantId: string;
  tenantName: string;
  onPublished?: () => void;
}> = ({ tenantId, tenantName, onPublished }) => {
  const [model, setModel] = useState<BusinessModel>("b2b");
  const [objective, setObjective] = useState("Aumentar pipeline qualificado e melhorar conversão.");
  const [maturity, setMaturity] = useState<Strategy["maturity"]>("growth");
  const [targets, setTargets] = useState<Target[]>(() => templateTargets("b2b"));

  // quando troca o modelo, recarrega template
  const onChangeModel = (m: BusinessModel) => {
    setModel(m);
    setTargets(templateTargets(m));
  };

  const grouped = useMemo(() => {
    const g: Record<string, Target[]> = { L3: [], L2: [], L1: [], L0: [] };
    for (const t of targets) g[t.layer].push(t);
    return g;
  }, [targets]);

  const publish = () => {
    const s: Strategy = {
      tenantId,
      tenantName,
      model,
      objective,
      maturity,
      targets,
      updatedAt: new Date().toISOString(),
    };
    saveStrategy(s);
    onPublished?.();
  };

  const updateTarget = (idx: number, value: number) => {
    setTargets((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], target: value };
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Gerenciar Clientes</h2>
          <p className="text-slate-500 mt-1">
            Estratégia do tenant: <span className="font-extrabold">{tenantName}</span>
          </p>
        </div>

        <button
          onClick={publish}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-extrabold flex items-center gap-2 shadow-sm"
        >
          <Save size={16} /> Publicar no Framework
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-2">Modelo</label>
            <select
              value={model}
              onChange={(e) => onChangeModel(e.target.value as BusinessModel)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 font-bold text-slate-800"
            >
              <option value="b2b">B2B</option>
              <option value="b2c">B2C</option>
              <option value="ecommerce">E-commerce</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-2">Maturidade</label>
            <select
              value={maturity}
              onChange={(e) => setMaturity(e.target.value as any)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 font-bold text-slate-800"
            >
              <option value="starter">Starter</option>
              <option value="growth">Growth</option>
              <option value="scale">Scale</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-2">Objetivo do Kickoff</label>
            <input
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 font-bold text-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {(["L3", "L2", "L1", "L0"] as const).map((layer) => (
          <div key={layer} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="font-extrabold text-slate-900">{layer}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Metas padrão do modelo (editável)
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {grouped[layer].map((t, iLayer) => {
                const idx = targets.findIndex((x) => x.metricKey === t.metricKey && x.layer === t.layer);
                return (
                  <div key={t.metricKey} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-900">{t.label}</div>
                      <div className="text-xs text-slate-500 font-bold">{t.metricKey}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={t.target}
                        onChange={(e) => updateTarget(idx, Number(e.target.value))}
                        className="w-24 border border-slate-200 rounded-md px-2 py-1 font-extrabold text-slate-900 text-right"
                      />
                      <span className="text-xs font-extrabold text-slate-500">{t.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-10 text-center text-slate-500">
        <Users size={40} className="mx-auto mb-3 opacity-30" />
        <p className="font-bold">Depois: lista de clientes e health score por tenant.</p>
      </div>
    </div>
  );
};

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
