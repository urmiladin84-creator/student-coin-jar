import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatRupiah } from "@/lib/format";

interface Props {
  data: { date: string; amount: number }[];
}

export default function DailyBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
        <Tooltip formatter={(value: number) => formatRupiah(value)} />
        <Bar dataKey="amount" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
