import { useState } from "react";
import { Plus } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import AddExpenseSheet from "@/components/AddExpenseSheet";

export default function Index() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <Dashboard />
      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95 transition-transform"
      >
        <Plus className="h-6 w-6" />
      </button>
      <AddExpenseSheet open={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}
