import { subDays, parseISO } from "date-fns";
import type {
  DashboardData,
  DateRangeKey,
  UserTypeKey,
  TimePoint,
  Kpis,
  KpiView,
} from "@/types/dashboard";
import { DATE_RANGE_DAYS } from "@/lib/constants";

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

function pickRevenue(p: TimePoint, userType: UserTypeKey) {
  if (userType === "new") return p.revenueNew ?? 0;
  if (userType === "returning") return p.revenueReturning ?? 0;
  return p.revenue;
}

function pickOrders(p: TimePoint, userType: UserTypeKey) {
  if (userType === "new") return p.ordersNew ?? 0;
  if (userType === "returning") return p.ordersReturning ?? 0;
  return p.orders;
}

function computeKpis(points: TimePoint[], userType: UserTypeKey): Kpis {
  const revenue = sum(points.map((p) => pickRevenue(p, userType)));
  const orders = sum(points.map((p) => pickOrders(p, userType)));

  const baseUsers = Math.round(orders * 4.1);
  const users =
    userType === "new"
      ? Math.round(baseUsers * 0.38)
      : userType === "returning"
        ? Math.round(baseUsers * 0.62)
        : baseUsers;

  const conversionRate =
    userType === "returning" ? 3.9 : userType === "new" ? 2.8 : 3.4;

  return { revenue, orders, users, conversionRate };
}

function delta(value: number, prevValue: number) {
  const diff = value - prevValue;
  const deltaPercent =
    prevValue === 0 ? (value === 0 ? 0 : 100) : (diff / prevValue) * 100;

  const trend =
    Math.abs(deltaPercent) < 0.01 ? "flat" : deltaPercent > 0 ? "up" : "down";

  return { value, prevValue, deltaPercent, trend } as const;
}

function computeKpiView(current: Kpis, previous: Kpis): KpiView {
  return {
    revenue: delta(current.revenue, previous.revenue),
    orders: delta(current.orders, previous.orders),
    users: delta(current.users, previous.users),
    conversionRate: delta(current.conversionRate, previous.conversionRate),
  };
}

function sortByDate(points: TimePoint[]) {
  return [...points].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
  );
}

export function selectDashboardView(
  raw: DashboardData,
  dateRange: DateRangeKey,
  userType: UserTypeKey,
) {
  const isMonthly = dateRange === "12m";

  const series = isMonthly ? raw.monthlyTimeseries : raw.dailyTimeseries;
  const sorted = sortByDate(series);

  const latest = parseISO(sorted[sorted.length - 1].date);

  let currentPoints: TimePoint[] = [];
  let prevPoints: TimePoint[] = [];

  if (isMonthly) {
    const last12 = sorted.slice(-12);
    const prev12 = sorted.slice(-24, -12);

    currentPoints = last12;
    prevPoints = prev12;
  } else {
    const days = DATE_RANGE_DAYS[dateRange];
    const currentCutoff = subDays(latest, days - 1);
    const prevStart = subDays(currentCutoff, days);
    const prevEnd = subDays(currentCutoff, 1);

    currentPoints = sorted.filter((p) => parseISO(p.date) >= currentCutoff);
    prevPoints = sorted.filter((p) => {
      const d = parseISO(p.date);
      return d >= prevStart && d <= prevEnd;
    });
  }

  const timeseries =
    userType === "all"
      ? currentPoints
      : currentPoints.map((p) => ({
          ...p,
          revenue: pickRevenue(p, userType),
          orders: pickOrders(p, userType),
        }));

  const currentKpis = computeKpis(currentPoints, userType);
  const prevKpis = computeKpis(prevPoints, userType);
  const kpis = computeKpiView(currentKpis, prevKpis);

  return {
    kpis,
    timeseries,
    userBreakdown: raw.userBreakdown,
    trafficSources: raw.trafficSources,
  };
}
