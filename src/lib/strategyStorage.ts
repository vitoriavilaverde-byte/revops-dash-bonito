// src/lib/strategyStorage.ts
import type { BusinessModel, Maturity, Target, KPI, Layer } from "../templates/strategyTemplates";

export type TenantStrategy = {
  tenantId: string;
  model: BusinessModel;
  maturity: Maturity;
  quarterGoal: "revenue" | "volume" | "efficiency" | "retention";
  northStar: string;
  kpis: KPI[];
  targets: Target[];
  playbooks: string[];
  updatedAt: string;
};

const key = (tenantId: string) => `revops:strategy:${tenantId}`;

export function loadStrategy(tenantId: string): TenantStrategy | null {
  try {
    const raw = localStorage.getItem(key(tenantId));
    return raw ? (JSON.parse(raw) as TenantStrategy) : null;
  } catch {
    return null;
  }
}

export function saveStrategy(s: TenantStrategy) {
  localStorage.setItem(key(s.tenantId), JSON.stringify(s));
}

export function clearStrategy(tenantId: string) {
  localStorage.removeItem(key(tenantId));
}