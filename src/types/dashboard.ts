export type Kpis = {
  revenue: number;
  orders: number;
  users: number;
  conversionRate: number;
};

export type KpiDelta = {
  value: number;
  prevValue: number;
  deltaPercent: number;
  trend: "up" | "down" | "flat";
};

export type KpiView = {
  revenue: KpiDelta;
  orders: KpiDelta;
  users: KpiDelta;
  conversionRate: KpiDelta;
};

export type TimePoint = {
  date: string;
  revenue: number;
  orders: number;

  revenueNew?: number;
  revenueReturning?: number;
  ordersNew?: number;
  ordersReturning?: number;
};

export type BreakdownItem = {
  type: string;
  value: number;
};

export type TrafficItem = {
  source: string;
  value: number;
};

export type DashboardData = {
  kpis: Kpis;
  dailyTimeseries: TimePoint[];
  monthlyTimeseries: TimePoint[];
  userBreakdown: BreakdownItem[];
  trafficSources: TrafficItem[];
};

export type DateRangeKey = "7d" | "30d" | "12m";
export type UserTypeKey = "all" | "new" | "returning";
export type RoleKey = "admin" | "manager";
