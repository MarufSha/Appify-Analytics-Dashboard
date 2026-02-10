export type Kpis = {
  revenue: number;
  orders: number;
  users: number;
  conversionRate: number; 
};

export type TimePoint = {
  date: string; 
  revenue: number;
  orders: number;
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

export type DateRangeKey = "7d" | "30d" | "90d";
export type UserTypeKey = "all" | "new" | "returning";
