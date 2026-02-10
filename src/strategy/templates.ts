import type { BusinessModel, Target } from "./store";

export function templateTargets(model: BusinessModel): Target[] {
  if (model === "b2b") {
    return [
      { layer: "L3", metricKey: "ltv_cac", label: "LTV:CAC", target: 3, unit: "x", cadence: "mensal" },
      { layer: "L3", metricKey: "payback_cac", label: "Payback CAC", target: 6, unit: "x", cadence: "mensal" },

      { layer: "L2", metricKey: "arr", label: "ARR", target: 1200000, unit: "R$", cadence: "mensal" },
      { layer: "L2", metricKey: "cac", label: "CAC", target: 900, unit: "R$", cadence: "mensal" },

      { layer: "L1", metricKey: "mql_to_sql", label: "MQL → SQL", target: 25, unit: "%", cadence: "semanal" },
      { layer: "L1", metricKey: "sql_to_win", label: "SQL → Win", target: 20, unit: "%", cadence: "semanal" },
      { layer: "L1", metricKey: "sales_cycle", label: "Ciclo de Vendas", target: 21, unit: "dias", cadence: "mensal" },

      { layer: "L0", metricKey: "leads", label: "Leads", target: 5000, unit: "n", cadence: "mensal" },
      { layer: "L0", metricKey: "mql", label: "MQL", target: 1200, unit: "n", cadence: "mensal" },
    ];
  }

  if (model === "ecommerce") {
    return [
      { layer: "L3", metricKey: "growth_revenue", label: "Crescimento Receita", target: 15, unit: "%", cadence: "mensal" },
      { layer: "L3", metricKey: "roi_marketing", label: "ROI Marketing", target: 2.5, unit: "x", cadence: "mensal" },

      { layer: "L2", metricKey: "gmv", label: "GMV", target: 500000, unit: "R$", cadence: "mensal" },
      { layer: "L2", metricKey: "cac", label: "CAC", target: 45, unit: "R$", cadence: "mensal" },

      { layer: "L1", metricKey: "cvr", label: "Taxa de Conversão", target: 2.2, unit: "%", cadence: "semanal" },
      { layer: "L1", metricKey: "aov", label: "Ticket Médio", target: 180, unit: "R$", cadence: "mensal" },

      { layer: "L0", metricKey: "sessions", label: "Sessões", target: 250000, unit: "n", cadence: "mensal" },
      { layer: "L0", metricKey: "add_to_cart", label: "Add to Cart", target: 6, unit: "%", cadence: "semanal" },
    ];
  }

  // b2c default
  return [
    { layer: "L3", metricKey: "ltv_cac", label: "LTV:CAC", target: 3, unit: "x", cadence: "mensal" },
    { layer: "L2", metricKey: "cac", label: "CAC", target: 120, unit: "R$", cadence: "mensal" },
    { layer: "L1", metricKey: "lead_to_sale", label: "Lead → Venda", target: 4, unit: "%", cadence: "semanal" },
    { layer: "L0", metricKey: "leads", label: "Leads", target: 20000, unit: "n", cadence: "mensal" },
  ];
}
