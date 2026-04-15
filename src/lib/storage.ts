import { AppData, INITIAL_DATA } from "@/types/expense";

const STORAGE_KEY = "student-expense-tracker";

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_DATA };
    const parsed = JSON.parse(raw);
    return { ...INITIAL_DATA, ...parsed };
  } catch {
    return { ...INITIAL_DATA };
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data:", e);
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportData(): string {
  const data = loadData();
  return JSON.stringify(data, null, 2);
}

export function importData(json: string): AppData {
  const parsed = JSON.parse(json);
  const data: AppData = { ...INITIAL_DATA, ...parsed };
  saveData(data);
  return data;
}
