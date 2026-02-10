// src/templates/strategyTemplates.ts
export type BusinessModel = "b2b" | "b2c" | "ecom" | "saas";
export type Maturity = "basic" | "mid" | "adv";
export type Layer = "L0" | "L1" | "L2" | "L3";
export type Unit = "%" | "R$" | "count" | "min" | "days";

export type KPI = { metricKey: string; label: string; layer: Layer };
export type Target = KPI & { target: number; unit: Unit };

export type StrategyTemplate = {
  model: BusinessModel;
  label: string;
  northStar: string;
  kpis: KPI[];
  targetsByMaturity: Record<Maturity, Target[]>;
  playbooks: string[];
};

const k = (layer: Layer, metricKey: string, label: string): KPI => ({ layer, metricKey, label });
const t = (layer: Layer, metricKey: string, label: string, target: number, unit: Unit): Target => ({
  layer, metricKey, label, target, unit,
});

export const STRATEGY_TEMPLATES: Record<BusinessModel, StrategyTemplate> = {
  b2b: {
    model: "b2b",
    label: "B2B (SDR + Closer / ciclo consultivo)",
    northStar: "SQL qualificados / Receita nova",
    kpis: [
      k("L0","dq_valid_rate","% dados válidos"),
      k("L0","utm_coverage","Cobertura UTM"),
      k("L1","leads","Leads"),
      k("L1","mql","MQL"),
      k("L1","sql","SQL"),
      k("L1","mql_to_sql","MQL → SQL"),
      k("L1","sla_first_contact","SLA 1º contato"),
      k("L1","cycle_days","Ciclo (dias)"),
      k("L2","cpl","CPL"),
      k("L2","cpsql","Custo por SQL"),
      k("L2","cac","CAC"),
      k("L3","growth_rate","Taxa de crescimento"),
      k("L3","ltv_cac","LTV:CAC"),
      k("L3","payback","Payback CAC"),
    ],
    targetsByMaturity: {
      basic: [
        t("L0","dq_valid_rate","% dados válidos", 85, "%"),
        t("L1","mql_to_sql","MQL → SQL", 15, "%"),
        t("L1","sla_first_contact","SLA 1º contato", 60, "min"),
        t("L1","cycle_days","Ciclo (dias)", 30, "days"),
        t("L2","cpl","CPL", 30, "R$"),
      ],
      mid: [
        t("L0","dq_valid_rate","% dados válidos", 92, "%"),
        t("L1","mql_to_sql","MQL → SQL", 22, "%"),
        t("L1","sla_first_contact","SLA 1º contato", 10, "min"),
        t("L1","cycle_days","Ciclo (dias)", 21, "days"),
        t("L2","cpsql","Custo por SQL", 120, "R$"),
      ],
      adv: [
        t("L0","dq_valid_rate","% dados válidos", 97, "%"),
        t("L1","mql_to_sql","MQL → SQL", 28, "%"),
        t("L1","sla_first_contact","SLA 1º contato", 5, "min"),
        t("L1","cycle_days","Ciclo (dias)", 14, "days"),
        t("L3","ltv_cac","LTV:CAC", 3, "count"),
      ],
    },
    playbooks: [
      "Definir ICP + critérios de qualificação (SQL) e roteamento",
      "Cadência multicanal (email/whats/call) com SLAs e follow-ups",
      "Padronizar etapas do pipeline com exit criteria por estágio",
    ],
  },

  b2c: {
    model: "b2c",
    label: "B2C (ciclo curto / atendimento)",
    northStar: "Conversões / Receita",
    kpis: [
      k("L0","dq_valid_rate","% dados válidos"),
      k("L1","visits","Visitantes"),
      k("L1","leads","Cadastros/Leads"),
      k("L1","lead_to_contact","Lead → Contato"),
      k("L1","contact_to_sale","Contato → Venda"),
      k("L1","first_response_time","1ª resposta"),
      k("L2","cpl","CPL"),
      k("L2","cac","CAC"),
      k("L3","growth_rate","Taxa de crescimento"),
    ],
    targetsByMaturity: {
      basic: [
        t("L0","dq_valid_rate","% dados válidos", 85, "%"),
        t("L1","first_response_time","1ª resposta", 30, "min"),
        t("L1","lead_to_contact","Lead → Contato", 45, "%"),
      ],
      mid: [
        t("L0","dq_valid_rate","% dados válidos", 92, "%"),
        t("L1","first_response_time","1ª resposta", 5, "min"),
        t("L1","contact_to_sale","Contato → Venda", 20, "%"),
      ],
      adv: [
        t("L0","dq_valid_rate","% dados válidos", 97, "%"),
        t("L1","first_response_time","1ª resposta", 2, "min"),
        t("L2","cac","CAC", 150, "R$"),
      ],
    },
    playbooks: [
      "Scripts de atendimento + objeções por persona",
      "Automação de follow-up e recuperação de conversão",
      "Segmentação por intenção (hot/warm/cold) e prioridades",
    ],
  },

  ecom: {
    model: "ecom",
    label: "E-commerce (DTC/loja online)",
    northStar: "GMV / Margem",
    kpis: [
      k("L0","utm_coverage","Cobertura UTM"),
      k("L1","sessions","Sessões"),
      k("L1","atc_rate","Sessão → Add-to-cart"),
      k("L1","checkout_rate","ATC → Checkout"),
      k("L1","purchase_rate","Sessão → Compra"),
      k("L2","aov","Ticket médio"),
      k("L2","roas","ROAS"),
      k("L2","mer","MER"),
      k("L3","ltv_cac","LTV:CAC"),
    ],
    targetsByMaturity: {
      basic: [
        t("L1","purchase_rate","Sessão → Compra", 1.0, "%"),
        t("L2","aov","Ticket médio", 180, "R$"),
        t("L2","roas","ROAS", 2.0, "count"),
      ],
      mid: [
        t("L1","purchase_rate","Sessão → Compra", 1.5, "%"),
        t("L2","mer","MER", 4.0, "count"),
        t("L2","roas","ROAS", 3.0, "count"),
      ],
      adv: [
        t("L1","purchase_rate","Sessão → Compra", 2.0, "%"),
        t("L3","ltv_cac","LTV:CAC", 3.0, "count"),
        t("L2","mer","MER", 6.0, "count"),
      ],
    },
    playbooks: [
      "Recuperação de carrinho/checkout (fluxos + incentivos)",
      "CRO (PDP, frete, prova social) com testes A/B",
      "Guardrails por canal (ROAS/MER) e realocação de verba",
    ],
  },

  saas: {
    model: "saas",
    label: "SaaS (assinatura)",
    northStar: "New ARR + NRR",
    kpis: [
      k("L0","dq_valid_rate","% dados válidos"),
      k("L1","mql_to_sql","MQL → SQL"),
      k("L1","trial_to_paid","Trial → Paid"),
      k("L1","time_to_value","Time-to-value"),
      k("L2","cac","CAC"),
      k("L3","nrr","NRR"),
      k("L3","grr","GRR"),
      k("L3","payback","Payback CAC"),
    ],
    targetsByMaturity: {
      basic: [
        t("L1","trial_to_paid","Trial → Paid", 15, "%"),
        t("L3","grr","GRR", 85, "%"),
      ],
      mid: [
        t("L1","trial_to_paid","Trial → Paid", 22, "%"),
        t("L3","nrr","NRR", 105, "%"),
        t("L3","payback","Payback CAC", 6, "count"),
      ],
      adv: [
        t("L1","trial_to_paid","Trial → Paid", 30, "%"),
        t("L3","nrr","NRR", 115, "%"),
        t("L3","payback","Payback CAC", 4, "count"),
      ],
    },
    playbooks: [
      "PQL/score por uso (eventos do produto) + roteamento",
      "Onboarding com milestones e playbook de ativação",
      "Health score + prevenção de churn + expansão",
    ],
  },
};