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
  Optimal: "bg-emerald-100 text-emerald-700",
  "In range": "bg-green-100 text-green-700",
  "Out of range": "bg-rose-100 text-rose-700",
  Pending: "bg-gray-100 text-gray-700",
};

export default function BiomarkerTable({ rows }: { rows: BiomarkerRow[] }) {
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
    <div className="overflow-hidden rounded-2xl border border-white/70 bg-card/95 shadow-soft backdrop-blur">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-lg font-semibold">Biomarkers</h2>
        <p className="text-sm text-muted">{rows.length} results</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Marker</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Value</th>
              <th className="px-5 py-3 font-semibold">Measured</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold">{row.marker_name}</p>
                  <p className="text-xs text-muted">{row.marker_category ?? "General"}</p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      statusStyles[row.status ?? "Pending"] ?? statusStyles.Pending
                    }`}
                  >
                    {row.status ?? "Pending"}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm">
                  {row.value_text}
                  {row.unit ? ` ${row.unit}` : ""}
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {row.measured_at ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
