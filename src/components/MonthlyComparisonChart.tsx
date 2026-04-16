import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatRupiah } from "@/lib/format";

interface Props {
  data: { category: string; thisMonth: number; lastMonth: number }[];
}

export default function MonthlyComparisonChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={2}>
        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
        <Tooltip formatter={(value: number) => formatRupiah(value)} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="lastMonth" name="Last Month" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="thisMonth" name="This Month" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
