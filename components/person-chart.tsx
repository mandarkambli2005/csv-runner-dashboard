import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { Row } from "@/lib/csv";
import { filterRowsByPerson } from "@/lib/stats";

type Props = {
  rows: Row[];
  person: string | "ALL";
};

export function PersonChart({ rows, person }: Props) {
  const data = filterRowsByPerson(rows, person).map(r => ({ date: r.date.slice(0,10), miles: r.miles }));
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="miles" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
