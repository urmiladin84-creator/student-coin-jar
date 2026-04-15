import { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { formatRupiah } from "@/lib/format";
import { exportData, importData } from "@/lib/storage";
import { Moon, Sun, Plus, Trash2, Download, Upload, Shield, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { data, setBudget, addCategory, deleteCategory, toggleDarkMode, clearAllData, setData } = useApp();
  const navigate = useNavigate();
  const [budgetInput, setBudgetInput] = useState(data.budget.monthly > 0 ? String(data.budget.monthly) : "");
  const [newCat, setNewCat] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSaveBudget = () => {
    const num = parseFloat(budgetInput);
    if (num > 0) setBudget(num);
  };

  const handleAddCategory = () => {
    if (newCat.trim()) {
      addCategory(newCat.trim());
      setNewCat("");
    }
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expense-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const result = importData(evt.target?.result as string);
        setData(result);
      } catch {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    clearAllData();
    setShowClearConfirm(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="text-xl font-bold">Settings</h1>

      {/* Budget */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Monthly Budget</h2>
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="e.g. 2000000"
            className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSaveBudget}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Save
          </button>
        </div>
        {data.budget.monthly > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Current: {formatRupiah(data.budget.monthly)}
          </p>
        )}
      </div>

      {/* Categories */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Categories</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.categories.map((cat) => (
            <div key={cat} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
              {cat}
              <button onClick={() => deleteCategory(cat)} className="ml-1 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="New category"
            className="flex-1 rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddCategory}
            className="rounded-xl bg-secondary px-3 py-2 text-secondary-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Appearance</h2>
        <button
          onClick={toggleDarkMode}
          className="flex w-full items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm"
        >
          <span className="flex items-center gap-2">
            {data.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {data.darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <span className="text-xs text-muted-foreground">Tap to toggle</span>
        </button>
      </div>

      {/* Data Management */}
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Data</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm text-foreground"
          >
            <Download className="h-4 w-4" /> Export Data (JSON)
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm text-foreground"
          >
            <Upload className="h-4 w-4" /> Import Data (JSON)
          </button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          
          {!showClearConfirm ? (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <Trash2 className="h-4 w-4" /> Clear All Data
            </button>
          ) : (
            <div className="rounded-xl bg-destructive/10 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-destructive mb-2">
                <AlertTriangle className="h-4 w-4" /> This will delete ALL your data!
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  className="flex-1 rounded-lg bg-destructive py-2 text-sm font-medium text-destructive-foreground"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 rounded-lg bg-muted py-2 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Privacy */}
      <button
        onClick={() => navigate("/privacy")}
        className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm"
      >
        <Shield className="h-4 w-4 text-primary" /> Privacy Policy
      </button>
    </div>
  );
}
