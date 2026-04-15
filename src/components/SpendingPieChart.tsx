import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatRupiah } from "@/lib/format";

const COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(200, 80%, 50%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(330, 70%, 50%)",
  "hsl(60, 70%, 45%)",
];

interface Props {
  data: { name: string; value: number }[];
}

export default function SpendingPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatRupiah(value)} />
      </PieChart>
    </ResponsiveContainer>
  );
}
