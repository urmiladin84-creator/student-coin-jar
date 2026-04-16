import { useMemo, lazy, Suspense } from "react";
import { useApp } from "@/context/AppContext";
import { formatRupiah } from "@/lib/format";
import { CATEGORY_ICONS } from "@/types/expense";

const LazyPieChart = lazy(() => import("@/components/SpendingPieChart"));
const LazyBarChart = lazy(() => import("@/components/DailyBarChart"));
const LazyComparisonChart = lazy(() => import("@/components/MonthlyComparisonChart"));

export default function Analytics() {
  const { data } = useApp();
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  const lastMonth = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, "0")}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}`;

  const monthExpenses = useMemo(
    () => data.expenses.filter((e) => e.date.startsWith(currentMonth)),
    [data.expenses, currentMonth]
  );

  const lastMonthExpenses = useMemo(
    () => data.expenses.filter((e) => e.date.startsWith(lastMonthKey)),
    [data.expenses, lastMonthKey]
  );

  const comparisonData = useMemo(() => {
    const thisMap: Record<string, number> = {};
    const lastMap: Record<string, number> = {};
    monthExpenses.forEach((e) => { thisMap[e.category] = (thisMap[e.category] || 0) + e.amount; });
    lastMonthExpenses.forEach((e) => { lastMap[e.category] = (lastMap[e.category] || 0) + e.amount; });
    const allCats = new Set([...Object.keys(thisMap), ...Object.keys(lastMap)]);
    return Array.from(allCats)
      .map((category) => ({ category, thisMonth: thisMap[category] || 0, lastMonth: lastMap[category] || 0 }))
      .sort((a, b) => (b.thisMonth + b.lastMonth) - (a.thisMonth + a.lastMonth));
  }, [monthExpenses, lastMonthExpenses]);

  const totalThisMonth = useMemo(() => monthExpenses.reduce((s, e) => s + e.amount, 0), [monthExpenses]);
  const totalLastMonth = useMemo(() => lastMonthExpenses.reduce((s, e) => s + e.amount, 0), [lastMonthExpenses]);
  const diffPercent = totalLastMonth > 0 ? Math.round(((totalThisMonth - totalLastMonth) / totalLastMonth) * 100) : null;

  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    monthExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value, icon: CATEGORY_ICONS[name] || "📦" }))
      .sort((a, b) => b.value - a.value);
  }, [monthExpenses]);

  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    monthExpenses.forEach((e) => {
      map[e.date] = (map[e.date] || 0) + e.amount;
    });
    return Object.entries(map)
      .map(([date, amount]) => ({ date: date.slice(5), amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [monthExpenses]);

  // Insights
  const dayOfWeekTotals = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const map: Record<string, number> = {};
    monthExpenses.forEach((e) => {
      const day = days[new Date(e.date + "T00:00:00").getDay()];
      map[day] = (map[day] || 0) + e.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [monthExpenses]);

  if (monthExpenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-4 pt-20 pb-24 text-muted-foreground">
        <span className="text-4xl">📊</span>
        <p className="text-sm">No data this month yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="text-xl font-bold">Analytics</h1>

      {/* Pie Chart */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Spending by Category</h2>
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>}>
          <LazyPieChart data={categoryData} />
        </Suspense>
        <div className="mt-3 flex flex-col gap-2">
          {categoryData.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-sm">
              <span>
                {c.icon} {c.name}
              </span>
              <span className="font-medium">{formatRupiah(c.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Daily Spending</h2>
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>}>
          <LazyBarChart data={dailyData} />
        </Suspense>
      </div>

      {/* Monthly Comparison */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-1 text-sm font-semibold text-muted-foreground">📅 This Month vs Last Month</h2>
        {diffPercent !== null ? (
          <p className="mb-3 text-sm">
            {diffPercent > 0 ? (
              <span className="text-destructive font-medium">↑ {diffPercent}% more</span>
            ) : diffPercent < 0 ? (
              <span className="font-medium" style={{ color: "hsl(160, 84%, 39%)" }}>↓ {Math.abs(diffPercent)}% less</span>
            ) : (
              <span className="font-medium">Same as last month</span>
            )}{" "}
            than last month ({formatRupiah(totalLastMonth)})
          </p>
        ) : (
          <p className="mb-3 text-xs text-muted-foreground">No data from last month to compare</p>
        )}
        {comparisonData.length > 0 && (
          <Suspense fallback={<div className="h-48 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>}>
            <LazyComparisonChart data={comparisonData} />
          </Suspense>
        )}
      </div>


      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground">💡 Insights</h2>
        <div className="flex flex-col gap-2 text-sm">
          {categoryData[0] && (
            <p>
              You spend most on <span className="font-semibold">{categoryData[0].icon} {categoryData[0].name}</span>{" "}
              ({formatRupiah(categoryData[0].value)})
            </p>
          )}
          {dayOfWeekTotals[0] && (
            <p>
              Your highest spending day is <span className="font-semibold">{dayOfWeekTotals[0][0]}</span>{" "}
              ({formatRupiah(dayOfWeekTotals[0][1])})
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
