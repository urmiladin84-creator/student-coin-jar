import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { CATEGORY_ICONS } from "@/types/expense";
import { formatRupiah, formatDate } from "@/lib/format";
import { Search, Trash2 } from "lucide-react";

export default function History() {
  const { data, deleteExpense } = useApp();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = useMemo(() => {
    return data.expenses.filter((e) => {
      if (filterCat !== "All" && e.category !== filterCat) return false;
      if (search && !e.note.toLowerCase().includes(search.toLowerCase()) && !e.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [data.expenses, filterCat, search]);

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="text-xl font-bold">Expense History</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-xl border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {["All", ...data.categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filterCat === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {cat !== "All" && <span className="mr-1">{CATEGORY_ICONS[cat] || "📦"}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* Expense List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No expenses found.</p>
        )}
        {filtered.map((e) => (
          <div key={e.id} className="flex items-center justify-between rounded-xl border bg-card p-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">{CATEGORY_ICONS[e.category] || "📦"}</span>
              <div>
                <div className="text-sm font-medium">{e.category}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(e.date)}
                  {e.note && ` · ${e.note}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{formatRupiah(e.amount)}</span>
              <button
                onClick={() => deleteExpense(e.id)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
