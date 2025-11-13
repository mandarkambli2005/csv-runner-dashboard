"use client";

import { useMemo, useState } from "react";
import { Upload } from "lucide-react";
import { parseCsv, ValidationErrorReport, Row } from "@/lib/csv";
import { computeOverallMetrics, computePerPersonMetrics, groupByDateTotal, uniquePeople } from "@/lib/stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PersonSelect } from "@/components/person-select";
import { MetricsCards } from "@/components/metrics-cards";
import { OverallChart } from "@/components/overall-chart";
import { PersonChart } from "@/components/person-chart";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [errors, setErrors] = useState<ValidationErrorReport | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | "ALL">("ALL");

  const people = useMemo(() => uniquePeople(rows), [rows]);
  const overallMetrics = useMemo(() => computeOverallMetrics(rows), [rows]);
  const perPersonMetrics = useMemo(() => computePerPersonMetrics(rows), [rows]);
  const groupedTotals = useMemo(() => groupByDateTotal(rows), [rows]);

  const handleFile = async () => {
    if (!file) return;
    const text = await file.text();
    const { data, errors } = parseCsv(text);
    if (errors) {
      setErrors(errors);
      setRows([]);
    } else {
      setErrors(null);
      setRows(data);
    }
  };

  const downloadSample = () => {
    const link = document.createElement("a");
    link.href = "/sample.csv";
    link.download = "sample.csv";
    link.click();
  };

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">CSV Runner Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={downloadSample} variant="outline">Download sample</Button>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <Button variant="outline">GitHub (add your repo)</Button>
          </a>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upload CSV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="file">CSV file with headers: date, person, miles run</Label>
              <Input id="file" type="file" accept=".csv,text/csv" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </div>
            <Button onClick={handleFile} disabled={!file}>
              <Upload className="mr-2 h-4 w-4" /> Parse & Load
            </Button>
          </div>

          {errors && (
            <Alert variant="destructive">
              <AlertTitle>Invalid CSV</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-6 space-y-1">
                  {errors.messages.map((m, i) => (<li key={i}>{m}</li>))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <section className="grid grid-cols-1 gap-6">
        <MetricsCards overall={overallMetrics} perPerson={perPersonMetrics} selected={selectedPerson} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overall Miles per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <OverallChart data={groupedTotals} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Per Person</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PersonSelect people={people} value={selectedPerson} onChange={setSelectedPerson} />
            <PersonChart rows={rows} person={selectedPerson} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
