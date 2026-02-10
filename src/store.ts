export type Layer = "L0" | "L1" | "L2" | "L3";
export type BusinessModel = "b2b" | "b2c" | "ecommerce";

export type Target = {
  layer: Layer;
  metricKey: string;
  label: string;
  target: number;
  unit: "%" | "R$" | "dias" | "n" | "x";
  cadence?: "diário" | "semanal" | "mensal";
};

export type Strategy = {
  tenantId: string;
  tenantName: string;
  model: BusinessModel;
  maturity: "starter" | "growth" | "scale";
  objective: string;
  targets: Target[];
  updatedAt: string;
};

const keyFor = (tenantId: string) => `revops:strategy:${tenantId}`;

export function saveStrategy(s: Strategy) {
  localStorage.setItem(keyFor(s.tenantId), JSON.stringify(s));
}

export function loadStrategy(tenantId: string): Strategy | null {
  const raw = localStorage.getItem(keyFor(tenantId));
  if (!raw) return null;
  try { return JSON.parse(raw) as Strategy; } catch { return null; }
}