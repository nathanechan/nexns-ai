import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

export function DonutChart({ data }: { data: { name: string; value: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={2}>
          {data.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
