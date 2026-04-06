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

const fallbackRows: BiomarkerRow[] = [
  {
    id: "ldl",
    marker_name: "LDL Cholesterol",
    marker_category: "Cardiovascular",
    value_text: "90",
    unit: "mg/dL",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "total_cholesterol",
    marker_name: "Total Cholesterol",
    marker_category: "Cardiovascular",
    value_text: "168",
    unit: "mg/dL",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "vitamin_d",
    marker_name: "Vitamin D (25-OH)",
    marker_category: "Micronutrients",
    value_text: "28",
    unit: "ng/mL",
    status: "Out of range",
    measured_at: "2024-05-04",
  },
  {
    id: "ferritin",
    marker_name: "Ferritin",
    marker_category: "Iron",
    value_text: "62",
    unit: "ng/mL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "free_testosterone",
    marker_name: "Free Testosterone",
    marker_category: "Hormones",
    value_text: "14.2",
    unit: "ng/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "hrv",
    marker_name: "Heart Rate Variability (HRV)",
    marker_category: "Recovery",
    value_text: "58",
    unit: "ms",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_non_hdl_cholesterol",
    marker_name: "Non HDL Cholesterol",
    marker_category: "Cardiovascular",
    value_text: "126",
    unit: "mg/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_hdl_cholesterol",
    marker_name: "HDL Cholesterol",
    marker_category: "Cardiovascular",
    value_text: "54",
    unit: "mg/dL",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_triglycerides",
    marker_name: "Triglycerides",
    marker_category: "Cardiovascular",
    value_text: "102",
    unit: "mg/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_cholesterol_hdl_ratio",
    marker_name: "Cholesterol/HDL Ratio",
    marker_category: "Cardiovascular",
    value_text: "3.4",
    unit: null,
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_ldl_hdl_ratio",
    marker_name: "LDL/HDL Ratio",
    marker_category: "Cardiovascular",
    value_text: "1.8",
    unit: null,
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_apob",
    marker_name: "Apolipoprotein B (ApoB)",
    marker_category: "Cardiovascular",
    value_text: "86",
    unit: "mg/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_lipoprotein_a",
    marker_name: "Lipoprotein (a)",
    marker_category: "Cardiovascular",
    value_text: "36",
    unit: "nmol/L",
    status: "Out of range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_ldl_p",
    marker_name: "LDL P (LDL particle number)",
    marker_category: "Cardiovascular",
    value_text: "1100",
    unit: "nmol/L",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_nhr",
    marker_name: "Neutrophil to HDL Cholesterol Ratio (NHR)",
    marker_category: "Cardiovascular",
    value_text: "0.11",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_tg_hdl_molar",
    marker_name: "Triglyceride / HDL Cholesterol (Molar Ratio)",
    marker_category: "Cardiovascular",
    value_text: "1.5",
    unit: null,
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_aip",
    marker_name: "Atherogenic Index of Plasma (AIP)",
    marker_category: "Cardiovascular",
    value_text: "0.08",
    unit: null,
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_small_ldl_p",
    marker_name: "Small LDL P",
    marker_category: "Cardiovascular",
    value_text: "190",
    unit: "nmol/L",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_non_hdl_total_ratio",
    marker_name: "Non HDL Cholesterol / Total Cholesterol (Mass Ratio)",
    marker_category: "Cardiovascular",
    value_text: "0.68",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_hdl_size",
    marker_name: "HDL Size",
    marker_category: "Cardiovascular",
    value_text: "9.2",
    unit: "nm",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_large_hdl_p",
    marker_name: "Large HDL P",
    marker_category: "Cardiovascular",
    value_text: "6.3",
    unit: "umol/L",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_ldl_size",
    marker_name: "LDL Size",
    marker_category: "Cardiovascular",
    value_text: "21.2",
    unit: "nm",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_large_vldl_p",
    marker_name: "Large VLDL P",
    marker_category: "Cardiovascular",
    value_text: "2.1",
    unit: "nmol/L",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top20_atherogenic_coefficient",
    marker_name: "Atherogenic Coefficient",
    marker_category: "Cardiovascular",
    value_text: "2.4",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_ldl_total_ratio",
    marker_name: "LDL Cholesterol / Total Cholesterol (Mass Ratio)",
    marker_category: "Cardiovascular",
    value_text: "0.51",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_hdl_p",
    marker_name: "HDL P (HDL particle number)",
    marker_category: "Cardiovascular",
    value_text: "32.6",
    unit: "umol/L",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_vldl_size",
    marker_name: "VLDL Size",
    marker_category: "Cardiovascular",
    value_text: "46.8",
    unit: "nm",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_ldlc_apob",
    marker_name: "LDL C / ApoB",
    marker_category: "Cardiovascular",
    value_text: "1.09",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_uric_acid_hdlc",
    marker_name: "Uric Acid / HDL C",
    marker_category: "Cardiovascular",
    value_text: "0.09",
    unit: null,
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_tg_apob",
    marker_name: "TG / ApoB",
    marker_category: "Cardiovascular",
    value_text: "1.19",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_non_hdl_apob",
    marker_name: "Non HDL Cholesterol / Apolipoprotein B (Non HDL-C / ApoB)",
    marker_category: "Cardiovascular",
    value_text: "1.47",
    unit: null,
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_tsh",
    marker_name: "Thyroid Stimulating Hormone (TSH)",
    marker_category: "Thyroid",
    value_text: "2.3",
    unit: "mIU/L",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_t3_uptake",
    marker_name: "T3 Uptake",
    marker_category: "Thyroid",
    value_text: "30",
    unit: "%",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_t4_total",
    marker_name: "Thyroxine (T4), Total",
    marker_category: "Thyroid",
    value_text: "7.8",
    unit: "ug/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_tpo",
    marker_name: "Thyroid Peroxidase Antibodies (TPO)",
    marker_category: "Thyroid",
    value_text: "14",
    unit: "IU/mL",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_thyroglobulin_ab",
    marker_name: "Thyroglobulin Antibodies",
    marker_category: "Thyroid",
    value_text: "1.2",
    unit: "IU/mL",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_t3_free",
    marker_name: "Triiodothyronine (T3), Free",
    marker_category: "Thyroid",
    value_text: "3.1",
    unit: "pg/mL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_glucose",
    marker_name: "Glucose",
    marker_category: "Metabolic",
    value_text: "92",
    unit: "mg/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_hba1c",
    marker_name: "Hemoglobin A1c (HbA1c)",
    marker_category: "Metabolic",
    value_text: "5.4",
    unit: "%",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_eag_mmol",
    marker_name: "Estimated Average Glucose (mmol/L)",
    marker_category: "Metabolic",
    value_text: "6.0",
    unit: "mmol/L",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_eag_mgdl",
    marker_name: "Estimated Average Glucose (mg/dL)",
    marker_category: "Metabolic",
    value_text: "108",
    unit: "mg/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_uric_acid",
    marker_name: "Uric Acid",
    marker_category: "Metabolic",
    value_text: "5.4",
    unit: "mg/dL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_insulin",
    marker_name: "Insulin",
    marker_category: "Metabolic",
    value_text: "8.2",
    unit: "uIU/mL",
    status: "In range",
    measured_at: "2024-05-04",
  },
  {
    id: "top40_corrected_calcium",
    marker_name: "Corrected Calcium (albumin adjusted)",
    marker_category: "Metabolic",
    value_text: "9.3",
    unit: "mg/dL",
    status: "Optimal",
    measured_at: "2024-05-04",
  },
];

const statusStyles: Record<string, string> = {
  Optimal: "bg-[#022c22] text-[#00E0A1]",
  "In range": "bg-[#052e16] text-[#4ade80]",
  "Out of range": "bg-[#450a0a] text-[#fb7185]",
  Pending: "bg-[#111827] text-[#e5e7eb]",
};

export default function BiomarkerTable({ rows }: { rows: BiomarkerRow[] }) {
  const [activeTab, setActiveTab] = useState<"Summary" | "All markers">("Summary");
  const displayRows = rows.length > 0 ? rows : fallbackRows;
  const counts = useMemo(() => {
    const optimal = displayRows.filter((r) => r.status === "Optimal").length;
    const inRange = displayRows.filter((r) => r.status === "In range").length;
    const outOfRange = displayRows.filter((r) => r.status === "Out of range").length;
    const pending = displayRows.filter((r) => !r.status || r.status === "Pending").length;
    return { optimal, inRange, outOfRange, pending };
  }, [displayRows]);

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
            {displayRows.length} markers · {counts.optimal} optimal · {counts.outOfRange} out of range
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

      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-gray-200 pb-2 text-xs text-muted">
        <p>Name</p>
        <p>Status</p>
        <p>Value</p>
        <p>Trend</p>
      </div>
      <div>
        {displayRows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-gray-100 py-3"
          >
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
            <Sparkline values={trendFor(row.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 72},${22 - v * 22}`)
    .join(" ");
  return (
    <svg width="72" height="22" viewBox="0 0 72 22" className="text-accent">
      <polyline fill="none" stroke="currentColor" strokeWidth="1.8" points={points} />
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * 72;
        const y = 22 - v * 22;
        return (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={i === values.length - 1 ? 2.2 : 1.6}
            fill="currentColor"
            opacity={i === values.length - 1 ? 1 : 0.65}
          />
        );
      })}
    </svg>
  );
}

function trendFor(id: string): number[] {
  switch (id) {
    case "ldl":
      return [0.62, 0.58, 0.55, 0.52, 0.5];
    case "vitamin_d":
      return [0.32, 0.26, 0.22, 0.27, 0.33];
    case "total_cholesterol":
      return [0.55, 0.56, 0.54, 0.52, 0.53];
    case "hrv":
      return [0.42, 0.6, 0.48, 0.66, 0.56];
    case "ferritin":
      return [0.58, 0.5, 0.44, 0.5, 0.57];
    case "free_testosterone":
      return [0.46, 0.5, 0.43, 0.55, 0.6];
    default:
      return [0.4, 0.48, 0.44, 0.52, 0.5];
  }
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
