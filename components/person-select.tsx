import { Label } from "@/components/ui/label";

type Props = {
  people: string[];
  value: string | "ALL";
  onChange: (v: string | "ALL") => void;
};

export function PersonSelect({ people, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="person">Select person</Label>
      <select
        id="person"
        className="w-full rounded-2xl border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
      >
        <option value="ALL">All</option>
        {people.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
}
