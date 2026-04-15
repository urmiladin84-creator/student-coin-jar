import React, { createContext, useContext, useCallback, useMemo, useState } from "react";
import { AppData, Expense, INITIAL_DATA } from "@/types/expense";
import { loadData, saveData, clearAllData as clearStorage } from "@/lib/storage";
import { getToday, getCurrentMonth } from "@/lib/format";

interface AppContextType {
  data: AppData;
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  setBudget: (amount: number) => void;
  addCategory: (name: string) => void;
  deleteCategory: (name: string) => void;
  toggleDarkMode: () => void;
  clearAllData: () => void;
  setData: (data: AppData) => void;
  setOnboarded: () => void;
  todaySpending: number;
  monthSpending: number;
  remainingBudget: number;
  budgetPercent: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<AppData>(loadData);

  const persist = useCallback((updater: (prev: AppData) => AppData) => {
    setDataState((prev) => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  const addExpense = useCallback(
    (expense: Omit<Expense, "id">) => {
      persist((prev) => ({
        ...prev,
        expenses: [
          { ...expense, id: crypto.randomUUID() },
          ...prev.expenses,
        ],
      }));
    },
    [persist]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      persist((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((e) => e.id !== id),
      }));
    },
    [persist]
  );

  const setBudget = useCallback(
    (amount: number) => {
      persist((prev) => ({ ...prev, budget: { monthly: amount } }));
    },
    [persist]
  );

  const addCategory = useCallback(
    (name: string) => {
      persist((prev) => ({
        ...prev,
        categories: prev.categories.includes(name)
          ? prev.categories
          : [...prev.categories, name],
      }));
    },
    [persist]
  );

  const deleteCategory = useCallback(
    (name: string) => {
      persist((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== name),
      }));
    },
    [persist]
  );

  const toggleDarkMode = useCallback(() => {
    persist((prev) => {
      const next = { ...prev, darkMode: !prev.darkMode };
      document.documentElement.classList.toggle("dark", next.darkMode);
      return next;
    });
  }, [persist]);

  const clearAllDataFn = useCallback(() => {
    clearStorage();
    const fresh = { ...INITIAL_DATA };
    setDataState(fresh);
    document.documentElement.classList.remove("dark");
  }, []);

  const setData = useCallback((newData: AppData) => {
    saveData(newData);
    setDataState(newData);
    document.documentElement.classList.toggle("dark", newData.darkMode);
  }, []);

  const setOnboarded = useCallback(() => {
    persist((prev) => ({ ...prev, onboarded: true }));
  }, [persist]);

  const today = getToday();
  const currentMonth = getCurrentMonth();

  const todaySpending = useMemo(
    () => data.expenses.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0),
    [data.expenses, today]
  );

  const monthSpending = useMemo(
    () => data.expenses.filter((e) => e.date.startsWith(currentMonth)).reduce((s, e) => s + e.amount, 0),
    [data.expenses, currentMonth]
  );

  const remainingBudget = data.budget.monthly - monthSpending;
  const budgetPercent = data.budget.monthly > 0 ? (monthSpending / data.budget.monthly) * 100 : 0;

  return (
    <AppContext.Provider
      value={{
        data,
        addExpense,
        deleteExpense,
        setBudget,
        addCategory,
        deleteCategory,
        toggleDarkMode,
        clearAllData: clearAllDataFn,
        setData,
        setOnboarded,
        todaySpending,
        monthSpending,
        remainingBudget,
        budgetPercent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
