export interface Expense {
  id: string;
  amount: number;
  category: string;
  note: string;
  date: string; // YYYY-MM-DD
}

export interface Budget {
  monthly: number;
}

export interface AppData {
  expenses: Expense[];
  budget: Budget;
  categories: string[];
  darkMode: boolean;
  onboarded: boolean;
}

export const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Study",
  "Entertainment",
  "Bills",
  "Shopping",
  "Others",
];

export const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍔",
  Transport: "🚌",
  Study: "📚",
  Entertainment: "🎮",
  Bills: "💡",
  Shopping: "🛍️",
  Others: "📦",
};

export const INITIAL_DATA: AppData = {
  expenses: [],
  budget: { monthly: 0 },
  categories: [...DEFAULT_CATEGORIES],
  darkMode: false,
  onboarded: false,
};
