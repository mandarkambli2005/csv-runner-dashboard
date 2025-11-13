import Papa from "papaparse";
import { z } from "zod";

export type Row = {
  date: string;      // ISO-ish
  person: string;
  miles: number;
};

const HeaderSchema = z.object({
  date: z.string(),
  person: z.string(),
  "miles run": z.string()
}).passthrough();

const RowSchema = z.object({
  date: z.string().refine(v => !isNaN(new Date(v).getTime()), { message: "Invalid date" }),
  person: z.string().min(1, "Person required"),
  miles: z.number().nonnegative("Miles must be >= 0")
});

export type ValidationErrorReport = {
  messages: string[];
};

export function parseCsv(text: string): { data: Row[]; errors: null } | { data: []; errors: ValidationErrorReport } {
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  const errors: string[] = [];

  // Validate headers
  if (!parsed.meta.fields) {
    return { data: [], errors: { messages: ["Missing headers. Expected: date, person, miles run"] } };
  }
  const normalizedFields = parsed.meta.fields.map(f => f.trim().toLowerCase());
  const hasDate = normalizedFields.includes("date");
  const hasPerson = normalizedFields.includes("person");
  const hasMiles = normalizedFields.includes("miles run");

  if (!hasDate || !hasPerson || !hasMiles) {
    const missing = ["date","person","miles run"].filter(h => !normalizedFields.includes(h));
    errors.push(`Missing headers: ${missing.join(", ")}`);
  }

  if (errors.length) {
    return { data: [], errors: { messages: errors } };
  }

  const rows: Row[] = [];
  const rowErrors: string[] = [];

  for (let i = 0; i < parsed.data.length; i++) {
    const raw = parsed.data[i] as Record<string, any>;

    const date = String(raw["date"]).trim();
    const person = String(raw["person"]).trim();
    const milesStr = String(raw["miles run"]).trim();
    const miles = Number(milesStr);

    const result = RowSchema.safeParse({ date, person, miles });
    if (!result.success) {
      const issues = result.error.issues.map(e => e.message).join("; ");
      rowErrors.push(`Row ${i + 2}: ${issues}`); // +2 header + 1-index
    } else {
      rows.push({ date, person, miles });
    }
  }

  if (rowErrors.length) {
    return { data: [], errors: { messages: rowErrors } };
  }

  return { data: rows, errors: null };
}
