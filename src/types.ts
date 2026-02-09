
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

export type IconType = ComponentType<LucideProps>;

export type FunnelCategory = 'ACQUISITION' | 'CONVERSION' | 'RETENTION';

export interface FunnelStep {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  category: FunnelCategory;
  metricLabel?: string;
  subMetric?: string;
  height?: number; // For visual hourglass effect
}

export interface Tenant {
  id: string;
  name: string;
  logo: string;
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: IconType;
  color?: 'violet' | 'emerald' | 'orange' | 'blue';
  context?: string;
}

export interface DataRun {
  id: string;
  status: 'SUCCESS' | 'FAILED' | 'RUNNING';
  rowsProcessed: number;
  source: string;
  timestamp: string;
}

export interface ChannelMetric {
  name: string;
  investment: number;
  leads: number;
  cpl: number;
  conversions: number;
  cpa: number;
  roi: number;
  roas: number;
  impressions: number;
  ctr: number;
}

export interface SalesRep {
  name: string;
  deals: number;
  revenue: number;
  quota: number;
  attainment: number;
  ticket: number;
  winRate: number;
  cycle: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  target: number;
  mrr: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  score: number;
  status: 'Lead' | 'MQL' | 'SQL' | 'Customer';
  date: string;
}

export interface PipelineStage {
  name: string;
  value: number;
  count: number;
  probability: number;
  avgDays: number;
}

export interface CustomerSegment {
  name: string;
  count: number;
  mrr: number;
  arpu: number;
  ltv: number;
  churn: number;
  health: number;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'Paused';
  investment: number;
  leads: number;
  revenue: number;
  roi: number;
  channels: string[];
}

export interface TimelineEvent {
  id: string;
  type: 'sale' | 'meeting' | 'campaign' | 'lead' | 'alert';
  title: string;
  description: string;
  time: string;
  color: 'emerald' | 'blue' | 'violet' | 'orange';
}

export interface SCurvePoint {
  month: number;
  revenue: number;
  marketCrash: number | null;
  growth: number | null;
}

export interface DistributionPoint {
  value: number;
  p90: number;
  p70: number;
}

export interface MatrixCell {
  x: string;
  y: string;
  active: boolean;
  intensity: number;
}

export interface PageMetric {
  path: string;
  views: number;
}
