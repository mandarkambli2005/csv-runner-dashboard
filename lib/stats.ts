import type { Row } from "./csv";

export type Metrics = { avg: number; min: number; max: number; count: number };

function round2(n: number) { return Math.round(n * 100) / 100; }

export function computeOverallMetrics(rows: Row[]): Metrics {
  if (!rows.length) return { avg: 0, min: 0, max: 0, count: 0 };
  let sum = 0, min = Infinity, max = -Infinity;
  for (const r of rows) {
    sum += r.miles;
    if (r.miles < min) min = r.miles;
    if (r.miles > max) max = r.miles;
  }
  return { avg: round2(sum / rows.length), min, max, count: rows.length };
}

export function uniquePeople(rows: Row[]): string[] {
  return Array.from(new Set(rows.map(r => r.person))).sort();
}

export function computePerPersonMetrics(rows: Row[]): Record<string, Metrics> {
  const map: Record<string, number[]> = {};
  for (const r of rows) {
    map[r.person] ??= [];
    map[r.person].push(r.miles);
  }
  const out: Record<string, Metrics> = {};
  for (const person of Object.keys(map)) {
    const vals = map[person];
    let sum = 0, min = Infinity, max = -Infinity;
    for (const v of vals) { sum += v; if (v < min) min = v; if (v > max) max = v; }
    out[person] = { avg: round2(sum / vals.length), min, max, count: vals.length };
  }
  return out;
}

export function groupByDateTotal(rows: Row[]): { date: string; total: number }[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const d = new Date(r.date);
    const key = d.toISOString().slice(0,10);
    map.set(key, (map.get(key) ?? 0) + r.miles);
  }
  return Array.from(map.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function filterRowsByPerson(rows: Row[], person: string | "ALL"): Row[] {
  if (person === "ALL") return rows;
  return rows.filter(r => r.person === person);
}
