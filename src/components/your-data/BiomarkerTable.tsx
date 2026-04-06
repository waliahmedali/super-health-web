"use client";

import { useMemo, useState } from "react";

type BiomarkerRow = {
  id: string;
  marker_name: string;
  marker_category: string | null;
  value_text: string;
  unit: string | null;
  status: string | null;
  measured_at: string | null;
};

const statusStyles: Record<string, string> = {
  Optimal: "bg-[#022c22] text-[#00E0A1]",
  "In range": "bg-[#052e16] text-[#4ade80]",
  "Out of range": "bg-[#450a0a] text-[#fb7185]",
  Pending: "bg-[#111827] text-[#e5e7eb]",
};

export default function BiomarkerTable({ rows }: { rows: BiomarkerRow[] }) {
  const [activeTab, setActiveTab] = useState<"Summary" | "All markers">("Summary");
  const counts = useMemo(() => {
    const optimal = rows.filter((r) => r.status === "Optimal").length;
    const inRange = rows.filter((r) => r.status === "In range").length;
    const outOfRange = rows.filter((r) => r.status === "Out of range").length;
    const pending = rows.filter((r) => !r.status || r.status === "Pending").length;
    return { optimal, inRange, outOfRange, pending };
  }, [rows]);

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/70 bg-card/95 p-6 shadow-soft backdrop-blur">
        <h2 className="text-lg font-semibold">Biomarkers</h2>
        <p className="mt-2 text-sm text-muted">
          No biomarker results yet. Add rows in Supabase table{" "}
          <code>biomarker_results</code> for your account.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex rounded-full bg-gray-100 p-1">
        {(["Summary", "All markers"] as const).map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full px-3 py-2 text-sm transition ${
                isActive ? "bg-white font-semibold text-ink shadow-sm" : "text-muted"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === "Summary" ? (
        <div className="mb-4 rounded-2xl bg-gray-50 p-4">
          <p className="text-base font-semibold text-ink">Blood Biomarkers</p>
          <p className="mt-1 text-sm text-muted">
            {rows.length} markers · {counts.optimal} optimal · {counts.outOfRange} out of range
          </p>
          <div className="mt-3 flex h-2 overflow-hidden rounded-full">
            <div className="bg-[#00E0A1]" style={{ flex: counts.optimal || 0.01 }} />
            <div className="bg-[#4ade80]" style={{ flex: counts.inRange || 0.01 }} />
            <div className="bg-[#fb7185]" style={{ flex: counts.outOfRange || 0.01 }} />
            <div className="bg-[#e5e7eb]" style={{ flex: counts.pending || 0.01 }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted">
            <LegendDot color="#00E0A1" label="Optimal" />
            <LegendDot color="#4ade80" label="In range" />
            <LegendDot color="#fb7185" label="Out of range" />
            <LegendDot color="#e5e7eb" label="Pending" />
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-gray-200 pb-2 text-xs text-muted">
        <p>Name</p>
        <p>Status</p>
        <p>Value</p>
      </div>
      <div>
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-b border-gray-100 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{row.marker_name}</p>
              <p className="text-xs text-muted">{row.marker_category ?? "General"}</p>
            </div>
            <div>
              <span
                className={`rounded-full px-2 py-1 text-[11px] ${
                  statusStyles[row.status ?? "Pending"] ?? statusStyles.Pending
                }`}
              >
                {row.status ?? "Pending"}
              </span>
            </div>
            <p className="text-xs text-ink">
              {row.value_text}
              {row.unit ? ` ${row.unit}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
