import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metrics } from "@/lib/stats";

type Props = {
  overall: Metrics;
  perPerson: Record<string, Metrics>;
  selected: string | "ALL";
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

export function MetricsCards({ overall, perPerson, selected }: Props) {
  const active = selected === "ALL" ? overall : (perPerson[selected] ?? { avg:0,min:0,max:0,count:0 });
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader><CardTitle>Count</CardTitle></CardHeader>
        <CardContent><Metric label="rows" value={active.count} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Average</CardTitle></CardHeader>
        <CardContent><Metric label="miles" value={active.avg} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Minimum</CardTitle></CardHeader>
        <CardContent><Metric label="miles" value={active.min} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Maximum</CardTitle></CardHeader>
        <CardContent><Metric label="miles" value={active.max} /></CardContent>
      </Card>
    </div>
  );
}
