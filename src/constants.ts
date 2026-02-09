
import type { RevenueData, Lead, PipelineStage, CustomerSegment, Campaign, TimelineEvent, SCurvePoint, DistributionPoint, MatrixCell, PageMetric, Tenant, KPI } from './types';
import { Users, DollarSign, Award, MousePointerClick, Clock, Activity, Filter, Target, Briefcase, TrendingUp, Heart, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import type { KPICardProps } from "./components/ui/KPICards";
import type { FunnelStep, DataRun } from "./types";
export type Trend = "up" | "down" | "neutral";
export type CampaignKPI = {
  label: string;
  value: string;
  change: number;
  trend: Trend;
  icon: any;
  color: string;
  context?: string;
};
export const TENANTS: Tenant[] = [
  { id: 't1', name: 'Acme Corp (B2B)', logo: 'AC' },
  { id: 't2', name: 'Shopify Store (B2C)', logo: 'SS' },
];

export const DASHBOARD_KPIS: KPI[] = [
  { label: 'Leads Gerados', value: '4.203', change: 17, trend: 'up', icon: Users, color: 'violet', context: 'vs mês anterior' },
  { label: 'Vendas', value: 'R$ 2,89M', change: 23.5, trend: 'up', icon: DollarSign, color: 'emerald', context: '95 deals' },
  { label: 'NPS', value: '72', change: -3, trend: 'down', icon: Award, color: 'orange', context: 'Zona de Qualidade' },
];

// --- VISITORS DATA ---

export const VISITORS_KPIS: KPI[] = [
  { label: 'Visitantes Únicos', value: '32.000', change: 15.2, trend: 'up', icon: Users, color: 'blue', context: 'vs. semana anterior' },
  { label: 'Sessões Totais', value: '42.100', change: 12.8, trend: 'up', icon: Activity, color: 'violet', context: 'vs. semana anterior' },
  { label: 'Taxa de Rejeição', value: '42.3%', change: -3.1, trend: 'up', icon: MousePointerClick, color: 'orange', context: 'vs. semana anterior' },
  { label: 'Tempo Médio', value: '3:24', change: 5.8, trend: 'up', icon: Clock, color: 'emerald', context: '+12s vs. semana anterior' },
];

export const WEEKLY_TRAFFIC_DATA = [
  { day: 'Seg', visitantes: 4200, sessoes: 5100 },
  { day: 'Ter', visitantes: 4800, sessoes: 6200 },
  { day: 'Qua', visitantes: 5100, sessoes: 6800 },
  { day: 'Qui', visitantes: 4900, sessoes: 6400 },
  { day: 'Sex', visitantes: 4600, sessoes: 5900 },
  { day: 'Sab', visitantes: 3800, sessoes: 4500 },
  { day: 'Dom', visitantes: 4600, sessoes: 7200 },
];

export const TRAFFIC_SOURCE_DATA = [
  { name: 'Orgânico', value: 5450, color: '#10b981' },
  { name: 'Direto', value: 3200, color: '#8b5cf6' },
  { name: 'Social', value: 2890, color: '#3b82f6' },
  { name: 'Referral', value: 2150, color: '#f97316' },
  { name: 'Email', value: 1551, color: '#06b6d4' },
];

export const DEVICE_DATA = [
  { name: 'Desktop', value: 8420, color: '#8b5cf6' },
  { name: 'Mobile', value: 5630, color: '#10b981' },
  { name: 'Tablet', value: 1191, color: '#f97316' },
];

export const TOP_PAGES_DATA: PageMetric[] = [
  { path: '/produtos', views: 12450 },
  { path: '/solucoes', views: 8920 },
  { path: '/precos', views: 7340 },
  { path: '/blog', views: 6210 },
  { path: '/contato', views: 4880 },
];

// --- LEADS DATA ---

export const LEADS_KPIS: KPI[] = [
  { label: 'Total de Leads', value: '2.840', change: 18.4, trend: 'up', icon: Users, color: 'blue', context: 'vs. mês anterior' },
  { label: 'MQLs', value: '1.455', change: 51.2, trend: 'up', icon: Filter, color: 'violet', context: '51.2% taxa de qualificação' },
  { label: 'SQLs', value: '582', change: 40.0, trend: 'up', icon: Target, color: 'orange', context: '40.0% MQL para SQL' },
  { label: 'Custo por Lead', value: 'R$ 42', change: -8.2, trend: 'up', icon: DollarSign, color: 'emerald', context: '-8.2% vs. mês anterior' },
];

export const LEAD_GENERATION_TREND = [
  { name: 'Sem 1', leads: 650, mql: 320, sql: 120 },
  { name: 'Sem 2', leads: 820, mql: 410, sql: 180 },
  { name: 'Sem 3', leads: 740, mql: 380, sql: 140 },
  { name: 'Sem 4', leads: 980, mql: 490, sql: 210 },
];

export const LEAD_SCORE_DISTRIBUTION = [
  { range: '0-20', count: 310, color: '#f87171' },
  { range: '21-40', count: 450, color: '#fb923c' },
  { range: '41-60', count: 780, color: '#fbbf24' },
  { range: '61-80', count: 620, color: '#8b5cf6' },
  { range: '81-100', count: 420, color: '#10b981' },
];

export const LEAD_QUALITY_METRICS = [
  { label: 'Lead Score Médio', value: '68.4', icon: Award, color: 'blue' },
  { label: 'Taxa de Engajamento', value: '42.8%', icon: Activity, color: 'violet' },
  { label: 'Tempo Médio de Qualificação', value: '4.2 dias', icon: Clock, color: 'emerald' },
];

export const LEAD_SOURCE_PERFORMANCE = [
  { source: 'LinkedIn Ads', leads: 456, conversion: '22.4%', cpl: 'R$ 42' },
  { source: 'Google Ads', leads: 623, conversion: '18.2%', cpl: 'R$ 38' },
  { source: 'Email Marketing', leads: 389, conversion: '28.6%', cpl: 'R$ 12' },
  { source: 'Webinar', leads: 234, conversion: '32.1%', cpl: 'R$ 24' },
  { source: 'Content Marketing', leads: 512, conversion: '15.8%', cpl: 'R$ 18' },
];

export const RECENT_LEADS: Lead[] = [
  { id: 'l1', name: 'João Silva', email: 'joao@empresa.com', score: 85, status: 'SQL', date: 'Hoje' },
  { id: 'l2', name: 'Maria Santos', email: 'maria@empresa.com', score: 72, status: 'MQL', date: 'Hoje' },
  { id: 'l3', name: 'Pedro Costa', email: 'pedro@empresa.com', score: 58, status: 'Lead', date: 'Ontem' },
  { id: 'l4', name: 'Ana Oliveira', email: 'ana@tech.com', score: 92, status: 'SQL', date: 'Ontem' },
  { id: 'l5', name: 'Lucas Pereira', email: 'lucas@startup.io', score: 45, status: 'Lead', date: '2 dias atrás' },
];

// --- SALES DATA ---

export const SALES_KPIS: KPI[] = [
  { label: 'Receita Total', value: 'R$ 2.84M', change: 22.5, trend: 'up', icon: DollarSign, color: 'emerald', context: '+22.5% vs. período anterior' },
  { label: 'Vendas Fechadas', value: '326', change: 18.2, trend: 'up', icon: Briefcase, color: 'blue', context: '+18.2% vs. período anterior' },
  { label: 'Ticket Médio', value: 'R$ 8.713', change: 3.6, trend: 'up', icon: TrendingUp, color: 'violet', context: '+3.6% vs. período anterior' },
  { label: 'Taxa de Ganho', value: '39.4%', change: 2.1, trend: 'up', icon: Target, color: 'orange', context: '+2.1% vs. período anterior' },
];

export const SALES_REVENUE_TREND = [
  { month: 'Jan', vendas: 45, receita: 420000 },
  { month: 'Fev', vendas: 52, receita: 480000 },
  { month: 'Mar', vendas: 48, receita: 450000 },
  { month: 'Abr', vendas: 61, receita: 540000 },
  { month: 'Mai', vendas: 58, receita: 510000 },
  { month: 'Jun', vendas: 72, receita: 620000 },
];

export const PIPELINE_STAGES_SALES = [
  { stage: 'Qualificação', value: 160 },
  { stage: 'Descoberta', value: 120 },
  { stage: 'Proposta', value: 90 },
  { stage: 'Negociação', value: 60 },
  { stage: 'Fechamento', value: 30 },
];

export const WIN_LOSS_DATA = [
  { name: 'Ganhos', value: 71, color: '#10b981' },
  { name: 'Perdas', value: 42, color: '#ef4444' },
  { name: 'Em andamento', value: 67, color: '#3b82f6' },
];

export const TOP_SELLERS_DATA = [
  { rank: 1, name: 'Ana Santos', sales: 18, revenue: 156000, winRate: 24.3 },
  { rank: 2, name: 'João Costa', sales: 16, revenue: 142000, winRate: 22.5 },
  { rank: 3, name: 'Lucas Mendes', sales: 14, revenue: 128000, winRate: 19.8 },
  { rank: 4, name: 'Maria Silva', sales: 12, revenue: 104000, winRate: 18.2 },
  { rank: 5, name: 'Pedro Oliveira', sales: 11, revenue: 94000, winRate: 16.4 },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  { name: 'Prospecção', value: 3850000, count: 62, probability: 10, avgDays: 8 },
  { name: 'Qualificação', value: 2450000, count: 45, probability: 25, avgDays: 14 },
  { name: 'Proposta', value: 1820000, count: 31, probability: 50, avgDays: 18 },
  { name: 'Negociação', value: 1250000, count: 22, probability: 75, avgDays: 12 },
  { name: 'Fechamento', value: 680000, count: 12, probability: 90, avgDays: 7 },
];

// --- POST-SALES (CS) DATA ---

export const POST_SALES_KPIS: KPI[] = [
  { label: 'Taxa de Retenção', value: '97.2%', change: 1.4, trend: 'up', icon: ShieldCheck, color: 'emerald', context: '+1.4% vs. período anterior' },
  { label: 'Churn Rate', value: '2.8%', change: -1.4, trend: 'up', icon: TrendingUp, color: 'orange', context: '-1.4% vs. período anterior' },
  { label: 'NPS', value: '75', change: 7, trend: 'up', icon: Heart, color: 'violet', context: '+7 pontos vs. período anterior' },
  { label: 'LTV Médio', value: 'R$ 12.8K', change: 8.2, trend: 'up', icon: DollarSign, color: 'blue', context: '+8.2% vs. período anterior' },
];

export const RETENTION_CHURN_NPS_TREND = [
  { month: 'Jan', retencao: 95.2, churn: 4.8, nps: 68 },
  { month: 'Fev', retencao: 95.8, churn: 4.2, nps: 70 },
  { month: 'Mar', retencao: 96.1, churn: 3.9, nps: 72 },
  { month: 'Abr', retencao: 96.5, churn: 3.5, nps: 71 },
  { month: 'Mai', retencao: 96.9, churn: 3.1, nps: 74 },
  { month: 'Jun', retencao: 97.2, churn: 2.8, nps: 75 },
];

export const LTV_COHORT_DATA = [
  { name: 'Jan 2025', ltv: 14200 },
  { name: 'Fev 2025', ltv: 13800 },
  { name: 'Mar 2025', ltv: 14500 },
  { name: 'Abr 2025', ltv: 15100 },
  { name: 'Mai 2025', ltv: 14800 },
  { name: 'Jun 2025', ltv: 15500 },
];

export const SUPPORT_METRICS = [
  { label: 'Tempo de Resposta', value: '2.4h', change: -15, trend: 'up', icon: Clock, color: 'blue' },
  { label: 'Taxa de Resolução', value: '94.2%', change: 3.2, trend: 'up', icon: ShieldCheck, color: 'emerald' },
  { label: 'CSAT', value: '4.6/5', change: 0.2, trend: 'up', icon: Heart, color: 'violet' },
  { label: 'Tickets Abertos', value: '142', change: -8, trend: 'up', icon: MessageSquare, color: 'orange' },
];

export const UPSELL_CROSS_SELL_DATA = [
  { product: 'Upgrade Premium', revenue: 124000, clients: 68, arpc: 1823.53 },
  { product: 'Add-on Analytics', revenue: 89000, clients: 142, arpc: 626.76 },
  { product: 'Extra Users', revenue: 67000, clients: 234, arpc: 286.32 },
  { product: 'API Access', revenue: 45000, clients: 89, arpc: 505.62 },
  { product: 'Training Pack', revenue: 32000, clients: 56, arpc: 571.43 },
];

export const POST_SALES_SUMMARY = [
  { label: 'Total de Clientes Ativos', value: '1,456', sub: '+124 novos este mês', icon: Users, color: 'blue' },
  { label: 'Receita Recorrente (MRR)', value: 'R$ 892K', sub: '+12.4% crescimento mensal', icon: DollarSign, color: 'emerald' },
  { label: 'Expansion Revenue', value: 'R$ 357K', sub: '40% da receita total', icon: Zap, color: 'violet' },
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { name: 'Enterprise', count: 18, mrr: 720000, arpu: 40000, ltv: 480000, churn: 0.5, health: 94 },
  { name: 'Mid-Market', count: 67, mrr: 536000, arpu: 8000, ltv: 96000, churn: 1.5, health: 82 },
  { name: 'SMB', count: 245, mrr: 612500, arpu: 2500, ltv: 22500, churn: 3.8, health: 68 },
];

// --- CAMPAIGNS DATA ---

export const CAMPAIGN_KPIS = [
  { label: 'Receita Gerada', value: 'R$ 886K', change: 18.4, trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'ROI Médio', value: '1,495%', change: 12.7, trend: 'up', icon: TrendingUp, color: 'violet' },
  { label: 'CAC (Custo de Aquisição)', value: 'R$ 142', change: -8.3, trend: 'down', icon: Users, color: 'blue' },
  { label: 'LTV:CAC Ratio', value: '4.2:1', change: 5.8, trend: 'up', icon: Award, color: 'orange' },
] satisfies ReadonlyArray<{
  label: KPICardProps["label"];
  value: KPICardProps["value"];
  change: KPICardProps["change"];
  trend: KPICardProps["trend"];
  icon: NonNullable<KPICardProps["icon"]>;
  color: NonNullable<KPICardProps["color"]>;
  context?: string;
}>;

export const REVENUE_PIPELINE_TREND_DATA = [
  { month: 'Ago', pipeline: 1200 },
  { month: 'Set', pipeline: 1350 },
  { month: 'Out', pipeline: 1500 },
  { month: 'Nov', pipeline: 1700 },
  { month: 'Dez', pipeline: 1900 },
  { month: 'Jan', pipeline: 2100 },
  { month: 'Fev', pipeline: 2300 },
  { month: 'Mar', pipeline: 2500 },
];

export const CONVERSION_FUNNEL_DATA = [
  { stage: 'Visitantes', value: 45000 },
  { stage: 'Leads', value: 12000 },
  { stage: 'MQLs', value: 5000 },
  { stage: 'SQLs', value: 1500 },
  { stage: 'Oportunidades', value: 800 },
  { stage: 'Negociações', value: 400 },
  { stage: 'Fechados', value: 150 },
];

export const PIPELINE_VELOCITY_DATA = [
  { month: 'Set', real: 18, meta: 21, ciclo: 32 },
  { month: 'Out', real: 22, meta: 21, ciclo: 28 },
  { month: 'Nov', real: 25, meta: 23, ciclo: 26 },
  { month: 'Dez', real: 28, meta: 24, ciclo: 24 },
  { month: 'Jan', real: 31, meta: 25, ciclo: 22 },
  { month: 'Fev', real: 34, meta: 26, ciclo: 20 },
];

export const REVENUE_ATTRIBUTION_DATA = [
  { name: 'LinkedIn Ads', value: 30, color: '#0077b5' },
  { name: 'Google Ads', value: 25, color: '#4285f4' },
  { name: 'Email Marketing', value: 15, color: '#0f9d58' },
  { name: 'Partner Network', value: 10, color: '#f4b400' },
  { name: 'Organic Search', value: 12, color: '#8b5cf6' },
  { name: 'Display Ads', value: 8, color: '#db4437' },
];

export const CAMPAIGN_PERFORMANCE_TABLE = [
  { name: 'Enterprise SaaS - LinkedIn', channel: 'LinkedIn Ads', status: 'Ativa', investment: 15000, leads: 245, opportunities: 42, revenue: 168000, roi: 1020 },
  { name: 'Product Launch - Google', channel: 'Google Ads', status: 'Ativa', investment: 22000, leads: 512, opportunities: 68, revenue: 284000, roi: 1191 },
  { name: 'Webinar Series', channel: 'Email', status: 'Ativa', investment: 3500, leads: 389, opportunities: 54, revenue: 142000, roi: 3957 },
  { name: 'Content Syndication', channel: 'Partner Network', status: 'Ativa', investment: 8000, leads: 156, opportunities: 23, revenue: 96000, roi: 1100 },
  { name: 'Retargeting Campaign', channel: 'Display', status: 'Pausada', investment: 5500, leads: 98, opportunities: 18, revenue: 72000, roi: 1209 },
];

export const CAMPAIGNS: Campaign[] = [
  { id: 'c1', name: 'Black Friday 2024', status: 'Active', investment: 95000, leads: 1250, revenue: 425000, roi: 4.47, channels: ['Google', 'Meta'] },
  { id: 'c2', name: 'Lançamento Produto X', status: 'Active', investment: 78000, leads: 890, revenue: 335000, roi: 4.29, channels: ['Multi'] },
  { id: 'c3', name: 'Trial Grátis 30 dias', status: 'Active', investment: 125000, leads: 1850, revenue: 510000, roi: 4.08, channels: ['All'] },
  { id: 'c4', name: 'Webinar Series Q2', status: 'Completed', investment: 42000, leads: 620, revenue: 260000, roi: 6.19, channels: ['Email', 'LinkedIn'] },
];

// --- GROWTH DASHBOARD MOCK DATA ---

export const S_CURVE_DATA: SCurvePoint[] = Array.from({ length: 24 }, (_, i) => {
  const x = i;
  const L = 100;
  const k = 0.3;
  const x0 = 12;
  const y = L / (1 + Math.exp(-k * (x - x0)));
  return {
    month: i,
    revenue: y * 0.8 + (Math.random() * 5),
    marketCrash: i > 15 ? y * 0.5 : null,
    growth: y,
  };
});

export const DISTRIBUTION_DATA: DistributionPoint[] = Array.from({ length: 20 }, (_, i) => {
  const x = i - 10;
  const y = (1 / (Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * x * x);
  return {
    value: i,
    p90: y * 100,
    p70: y * 120,
  };
});

export const MATRIX_DATA: MatrixCell[] = [
  { x: 'Pequenas', y: 'AQUISIÇÃO', active: false, intensity: 0 },
  { x: 'Médias', y: 'AQUISIÇÃO', active: false, intensity: 0 },
  { x: 'Grandes', y: 'AQUISIÇÃO', active: true, intensity: 0.9 },
  { x: 'Pequenas', y: 'RETENÇÃO', active: true, intensity: 0.6 },
  { x: 'Médias', y: 'RETENÇÃO', active: false, intensity: 0 },
  { x: 'Grandes', y: 'RETENÇÃO', active: false, intensity: 0 },
  { x: 'Pequenas', y: 'EXPANSÃO', active: false, intensity: 0 },
  { x: 'Médias', y: 'EXPANSÃO', active: true, intensity: 0.8 },
  { x: 'Grandes', y: 'EXPANSÃO', active: false, intensity: 0 },
];

export const HORIZONTAL_FUNNEL_DATA: FunnelStep[] = [
  { id: '1', label: 'Consciência', value: 15241, previousValue: 14000, category: 'ACQUISITION', height: 300 },
  { id: '2', label: 'Educação', value: 4203, previousValue: 3800, category: 'ACQUISITION', height: 260 },
  { id: '3', label: 'Seleção', value: 1448, previousValue: 1200, category: 'ACQUISITION', height: 220 },
  { id: '4', label: 'Priorização', value: 665, previousValue: 600, category: 'ACQUISITION', height: 180 },
  { id: '5', label: 'MQL', value: 501, previousValue: 450, category: 'ACQUISITION', height: 150 },
  { id: '6', label: 'SQL', value: 377, previousValue: 320, category: 'ACQUISITION', height: 130 },
  { id: '7', label: 'Novos Clientes', value: 189, previousValue: 150, category: 'ACQUISITION', height: 110 },
  { id: '8', label: 'MRR1', value: 95, previousValue: 80, category: 'RETENTION', height: 120 },
  { id: '9', label: 'MRR2', value: 70, previousValue: 60, category: 'RETENTION', height: 140 },
  { id: '10', label: 'MRR3', value: 50, previousValue: 45, category: 'RETENTION', height: 180 },
  { id: '11', label: 'Expansão', value: 35, previousValue: 30, category: 'RETENTION', height: 220 },
  { id: '12', label: 'LTV', value: 25, previousValue: 20, category: 'RETENTION', height: 260 },
];

export const REVENUE_DATA: RevenueData[] = [
  { month: 'Jan', revenue: 1.85, target: 2.0, mrr: 1.6 },
  { month: 'Fev', revenue: 1.98, target: 2.0, mrr: 1.7 },
  { month: 'Mar', revenue: 2.25, target: 2.2, mrr: 1.9 },
  { month: 'Abr', revenue: 2.42, target: 2.4, mrr: 2.1 },
  { month: 'Mai', revenue: 2.68, target: 2.6, mrr: 2.3 },
  { month: 'Jun', revenue: 2.89, target: 2.8, mrr: 2.75 },
];

export const CAMPAIGN_EVOLUTION_DATA = [
  { date: '01/Nov', 'Black Friday 2024': 120, 'Lançamento Produto X': 80, 'Trial Grátis 30 dias': 200 },
  { date: '05/Nov', 'Black Friday 2024': 180, 'Lançamento Produto X': 90, 'Trial Grátis 30 dias': 210 },
  { date: '10/Nov', 'Black Friday 2024': 350, 'Lançamento Produto X': 110, 'Trial Grátis 30 dias': 230 },
  { date: '15/Nov', 'Black Friday 2024': 420, 'Lançamento Produto X': 150, 'Trial Grátis 30 dias': 250 },
  { date: '20/Nov', 'Black Friday 2024': 550, 'Lançamento Produto X': 140, 'Trial Grátis 30 dias': 240 },
  { date: '25/Nov', 'Black Friday 2024': 890, 'Lançamento Produto X': 160, 'Trial Grátis 30 dias': 260 },
  { date: '30/Nov', 'Black Friday 2024': 1250, 'Lançamento Produto X': 180, 'Trial Grátis 30 dias': 280 },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 'e1', type: 'sale', title: 'Nova venda fechada', description: 'Carlos Silva fechou um deal de R$ 45.000', time: 'Agora', color: 'emerald' },
  { id: 'e2', type: 'meeting', title: 'Reunião agendada', description: 'Ana Santos agendou demo com lead Enterprise', time: 'Há 2 horas', color: 'blue' },
  { id: 'e3', type: 'campaign', title: 'Campanha lançada', description: 'Black Friday 2024 iniciada com investimento de R$ 95k', time: 'Há 4 horas', color: 'violet' },
  { id: 'e4', type: 'alert', title: 'Meta atingida', description: 'Equipe de vendas atingiu 105% da meta mensal', time: 'Ontem', color: 'emerald' },
  { id: 'e5', type: 'lead', title: 'Novo MQL qualificado', description: '45 novos MQLs adicionados ao pipeline', time: 'Há 2 dias', color: 'blue' },
];

export const DATA_RUNS: DataRun[] = [
  { id: 'run_1023', status: 'SUCCESS', rowsProcessed: 15420, source: 'HubSpot API', timestamp: '2023-10-27 08:00:00' },
  { id: 'run_1024', status: 'SUCCESS', rowsProcessed: 4201, source: 'Google Ads', timestamp: '2023-10-27 08:05:00' },
  { id: 'run_1025', status: 'FAILED', rowsProcessed: 0, source: 'Salesforce', timestamp: '2023-10-27 08:10:00' },
  { id: 'run_1026', status: 'RUNNING', rowsProcessed: 120, source: 'Stripe', timestamp: '2023-10-27 08:15:00' },
];
