import React, { useMemo, useState } from "react";
import { Save, Users , MessageSquare} from "lucide-react";
import { templateTargets } from "../strategy/templates";
import { saveStrategy } from "../strategy/store";
import type { BusinessModel, Strategy, Target, Layer } from "../strategy/store";

export const ClientsView: React.FC<{
  tenantId: string;
  tenantName: string;
  onPublished?: () => void;
}> = ({ tenantId, tenantName, onPublished }) => {
  const [model, setModel] = useState<BusinessModel>("b2b");
  const [maturity, setMaturity] = useState<Strategy["maturity"]>("growth");
  const [objective, setObjective] = useState(
    "Aumentar pipeline qualificado e melhorar conversão."
  );
  const [targets, setTargets] = useState<Target[]>(() => templateTargets("b2b"));

  const grouped = useMemo(() => {
    const base: Record<Layer, Target[]> = { L0: [], L1: [], L2: [], L3: [] };
    for (const t of targets) base[t.layer].push(t);
    return base;
  }, [targets]);

  const onChangeModel = (m: BusinessModel) => {
    setModel(m);
    setTargets(templateTargets(m));
  };

  const updateTarget = (metricKey: string, layer: Layer, nextValue: number) => {
    setTargets((prev) =>
      prev.map((t) =>
        t.metricKey === metricKey && t.layer === layer ? { ...t, target: nextValue } : t
      )
    );
  };

  const publish = () => {
    const strategy: Strategy = {
      tenantId,
      tenantName,
      model,
      maturity,
      objective,
      targets,
      updatedAt: new Date().toISOString(),
    };
    saveStrategy(strategy);
    onPublished?.();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Gerenciar Clientes</h2>
          <p className="text-slate-500 mt-1 font-bold">
            Estratégia do tenant: <span className="text-slate-800">{tenantName}</span>
          </p>
        </div>

        <button
          onClick={publish}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-extrabold flex items-center gap-2 shadow-sm"
        >
          <Save size={16} /> Publicar no Framework
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-2">
              Modelo
            </label>
            <select
              value={model}
              onChange={(e) => onChangeModel(e.target.value as BusinessModel)}
              className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 font-bold focus:outline-none focus:border-violet-400"
            >
              <option value="b2b">B2B</option>
              <option value="b2c">B2C</option>
              <option value="ecommerce">E-commerce</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-2">
              Maturidade
            </label>
            <select
              value={maturity}
              onChange={(e) => setMaturity(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 font-bold focus:outline-none focus:border-violet-400"
            >
              <option value="starter">Starter</option>
              <option value="growth">Growth</option>
              <option value="scale">Scale</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-widest mb-2">
              Objetivo do Kickoff
            </label>
            <input
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-slate-900 font-bold focus:outline-none focus:border-violet-400"
            />
          </div>
        </div>
      </div>

      {(["L3", "L2", "L1", "L0"] as Layer[]).map((layer) => (
        <div key={layer} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="font-extrabold text-slate-900">{layer}</div>
            <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
              Metas (editáveis)
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {grouped[layer].map((t) => (
              <div key={`${t.layer}:${t.metricKey}`} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900">{t.label}</div>
                  <div className="text-xs text-slate-500 font-bold">{t.metricKey}</div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={t.target}
                    onChange={(e) => updateTarget(t.metricKey, t.layer, Number(e.target.value))}
                    className="w-28 border border-slate-200 rounded-md px-3 py-2 text-slate-900 font-extrabold text-right focus:outline-none focus:border-violet-400"
                  />
                  <span className="text-xs font-extrabold text-slate-500">{t.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center text-slate-500">
        <Users size={48} className="mx-auto mb-4 opacity-20" />
        <p className="font-bold">Depois a gente coloca lista real de clientes e health score.</p>
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
