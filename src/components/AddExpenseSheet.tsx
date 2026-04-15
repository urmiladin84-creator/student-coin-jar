import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CATEGORY_ICONS } from "@/types/expense";
import { getToday } from "@/lib/format";
import { X } from "lucide-react";

interface AddExpenseSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function AddExpenseSheet({ open, onClose }: AddExpenseSheetProps) {
  const { data, addExpense } = useApp();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(data.categories[0] || "Food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(getToday());

  if (!open) return null;

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    addExpense({ amount: num, category, note, date });
    setAmount("");
    setNote("");
    setDate(getToday());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-in slide-in-from-bottom rounded-t-2xl bg-card p-5 pb-8 safe-bottom">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Add Expense</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Amount */}
        <label className="text-xs font-medium text-muted-foreground">Amount (Rp)</label>
        <input
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          autoFocus
          className="mt-1 mb-4 w-full rounded-xl border bg-background px-4 py-3 text-xl font-bold outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Category */}
        <label className="text-xs font-medium text-muted-foreground">Category</label>
        <div className="mt-1 mb-4 flex flex-wrap gap-2">
          {data.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <span>{CATEGORY_ICONS[cat] || "📦"}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* Note */}
        <label className="text-xs font-medium text-muted-foreground">Note (optional)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Lunch at campus"
          className="mt-1 mb-4 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Date */}
        <label className="text-xs font-medium text-muted-foreground">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 mb-6 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleSubmit}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
        >
          Save Expense
        </button>
      </div>
    </div>
  );
}
