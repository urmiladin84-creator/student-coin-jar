import { useApp } from "@/context/AppContext";
import { formatRupiah, getDaysRemainingInMonth } from "@/lib/format";
import { CATEGORY_ICONS } from "@/types/expense";
import { Wallet, TrendingDown, CalendarDays, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const { data, todaySpending, monthSpending, remainingBudget, budgetPercent } = useApp();
  const daysLeft = getDaysRemainingInMonth();
  const dailySuggestion = remainingBudget > 0 ? Math.floor(remainingBudget / daysLeft) : 0;

  const budgetStatus =
    budgetPercent >= 90 ? "critical" : budgetPercent >= 70 ? "warning" : "normal";

  // Get top category this month
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = data.expenses.filter((e) => e.date.startsWith(currentMonth));
  const categoryTotals: Record<string, number> = {};
  monthExpenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="text-xl font-bold">Student Expense Tracker</h1>

      {/* Budget Overview Card */}
      <div className="rounded-xl bg-primary p-5 text-primary-foreground">
        <div className="mb-1 flex items-center gap-2 text-sm opacity-90">
          <Wallet className="h-4 w-4" />
          Monthly Budget
        </div>
        <div className="text-2xl font-bold">
          {data.budget.monthly > 0 ? formatRupiah(data.budget.monthly) : "Not set"}
        </div>
        {data.budget.monthly > 0 && (
          <>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
              <div
                className="h-full rounded-full bg-primary-foreground transition-all duration-500"
                style={{ width: `${Math.min(budgetPercent, 100)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs opacity-90">
              <span>{budgetPercent.toFixed(0)}% used</span>
              <span>{formatRupiah(remainingBudget)} left</span>
            </div>
            {budgetStatus !== "normal" && (
              <div className="mt-2 flex items-center gap-1 rounded-lg bg-primary-foreground/20 px-3 py-1.5 text-xs font-medium">
                <AlertTriangle className="h-3.5 w-3.5" />
                {budgetStatus === "critical"
                  ? "Budget almost depleted!"
                  : "Budget running low"}
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-card p-4 shadow-sm border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            Today
          </div>
          <div className="mt-1 text-lg font-bold">{formatRupiah(todaySpending)}</div>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-sm border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingDown className="h-3.5 w-3.5" />
            This Month
          </div>
          <div className="mt-1 text-lg font-bold">{formatRupiah(monthSpending)}</div>
        </div>
      </div>

      {/* Daily Suggestion */}
      {data.budget.monthly > 0 && remainingBudget > 0 && (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="text-xs text-muted-foreground">Daily spending suggestion</div>
          <div className="mt-1 text-lg font-semibold text-primary">
            {formatRupiah(dailySuggestion)}
            <span className="text-xs font-normal text-muted-foreground"> / day</span>
          </div>
          <div className="text-xs text-muted-foreground">{daysLeft} days remaining this month</div>
        </div>
      )}

      {/* Insights */}
      {topCategory && (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="text-xs font-medium text-muted-foreground mb-2">💡 Insight</div>
          <p className="text-sm">
            You spend most on{" "}
            <span className="font-semibold">
              {CATEGORY_ICONS[topCategory[0]] || "📦"} {topCategory[0]}
            </span>{" "}
            ({formatRupiah(topCategory[1])} this month)
          </p>
        </div>
      )}

      {/* Recent Expenses */}
      {monthExpenses.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">Recent</h2>
          <div className="flex flex-col gap-2">
            {monthExpenses.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{CATEGORY_ICONS[e.category] || "📦"}</span>
                  <div>
                    <div className="text-sm font-medium">{e.category}</div>
                    {e.note && <div className="text-xs text-muted-foreground">{e.note}</div>}
                  </div>
                </div>
                <div className="text-sm font-semibold">{formatRupiah(e.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.expenses.length === 0 && (
        <div className="mt-8 text-center text-muted-foreground">
          <p className="text-3xl mb-2">📝</p>
          <p className="text-sm">No expenses yet. Tap + to add your first!</p>
        </div>
      )}
    </div>
  );
}
