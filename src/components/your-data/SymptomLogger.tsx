"use client";

import { useMemo, useState } from "react";

type Frequency = "Once" | "Recurring" | "Constant";
type TimeOfDay = "Any" | "Morning" | "Afternoon" | "Evening" | "Night";

type SymptomDraft = {
  severity: number;
  duration: "30m" | "2h" | "1d" | "3d" | "1w" | "6mo" | "1y";
  frequency: Frequency;
  timeOfDay: TimeOfDay;
  triggers: string[];
  relievers: string[];
  notes: string;
};

type SymptomDef = {
  id: string;
  label: string;
};

type SystemDef = {
  id: string;
  emoji: string;
  name: string;
  symptoms: SymptomDef[];
};

type SymptomLog = {
  symptomId: string;
  symptomLabel: string;
  systemName: string;
  loggedAt: string;
  data: SymptomDraft;
};

const systems: SystemDef[] = [
  {
    id: "neurological",
    emoji: "🧠",
    name: "Neurological",
    symptoms: [
      { id: "headache", label: "Headache" },
      { id: "dizziness", label: "Dizziness / vertigo" },
      { id: "brain_fog", label: "Brain fog" },
      { id: "memory_issues", label: "Memory issues" },
      { id: "tingling", label: "Numbness / tingling" },
      { id: "weakness", label: "Weakness" },
    ],
  },
  {
    id: "mental",
    emoji: "💭",
    name: "Psychiatric / Mental Health",
    symptoms: [
      { id: "anxiety", label: "Anxiety" },
      { id: "depression", label: "Depression / low mood" },
      { id: "panic_attacks", label: "Panic attacks" },
      { id: "insomnia", label: "Insomnia / poor sleep quality" },
      { id: "motivation", label: "Loss of motivation" },
      { id: "focus", label: "Difficulty concentrating" },
    ],
  },
  {
    id: "gi",
    emoji: "🍽️",
    name: "Gastrointestinal",
    symptoms: [
      { id: "abd_pain", label: "Abdominal pain" },
      { id: "bloating", label: "Bloating" },
      { id: "nausea", label: "Nausea" },
      { id: "diarrhea", label: "Diarrhea" },
      { id: "constipation", label: "Constipation" },
      { id: "heartburn", label: "Acid reflux / heartburn" },
    ],
  },
  {
    id: "cardio",
    emoji: "❤️",
    name: "Cardiovascular",
    symptoms: [
      { id: "chest_pain", label: "Chest pain" },
      { id: "palpitations", label: "Palpitations" },
      { id: "sob", label: "Shortness of breath" },
      { id: "edema", label: "Edema" },
    ],
  },
  {
    id: "resp",
    emoji: "🫁",
    name: "Respiratory",
    symptoms: [
      { id: "cough", label: "Cough" },
      { id: "wheeze", label: "Wheezing" },
      { id: "congestion", label: "Nasal congestion" },
      { id: "loss_smell", label: "Loss of smell" },
    ],
  },
  {
    id: "musculo",
    emoji: "🦴",
    name: "Musculoskeletal",
    symptoms: [
      { id: "joint_pain", label: "Joint pain" },
      { id: "muscle_pain", label: "Muscle pain" },
      { id: "stiffness", label: "Stiffness" },
      { id: "back_pain", label: "Back pain" },
    ],
  },
];

const defaultDraft: SymptomDraft = {
  severity: 5,
  duration: "1d",
  frequency: "Once",
  timeOfDay: "Any",
  triggers: [],
  relievers: [],
  notes: "",
};

const triggerOptions = ["Food", "Stress", "Sleep", "Exercise", "Not Sure"];
const relieverOptions = ["Hydration", "Rest", "Heat", "Medication", "Not Sure"];

function pillClass(active: boolean) {
  return active
    ? "rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white"
    : "rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink";
}

export default function SymptomLogger() {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [selected, setSelected] = useState<{
    symptomId: string;
    symptomLabel: string;
    systemName: string;
  } | null>(null);
  const [draft, setDraft] = useState<SymptomDraft>(defaultDraft);

  const visibleSystems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return systems;
    return systems
      .map((sys) => ({
        ...sys,
        symptoms: sys.symptoms.filter((s) => s.label.toLowerCase().includes(q)),
      }))
      .filter((sys) => sys.symptoms.length > 0);
  }, [search]);

  const openEditor = (systemName: string, symptom: SymptomDef) => {
    setSelected({
      systemName,
      symptomId: symptom.id,
      symptomLabel: symptom.label,
    });
    const existing = logs.find((l) => l.symptomId === symptom.id);
    setDraft(existing?.data ?? defaultDraft);
  };

  const saveLog = () => {
    if (!selected) return;
    const next: SymptomLog = {
      symptomId: selected.symptomId,
      symptomLabel: selected.symptomLabel,
      systemName: selected.systemName,
      loggedAt: new Date().toISOString(),
      data: draft,
    };
    setLogs((prev) => [next, ...prev.filter((p) => p.symptomId !== next.symptomId)]);
    setSelected(null);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl bg-card p-6 shadow-soft">
        <h2 className="text-xl font-semibold">Add Symptoms</h2>
        <p className="mt-1 text-sm text-muted">
          What&apos;s bothering you? Search or browse by body system.
        </p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search symptoms..."
          className="mt-4 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
        />

        <div className="mt-5 space-y-5">
          {visibleSystems.map((sys) => (
            <div key={sys.id}>
              <h3 className="mb-2 text-sm font-semibold text-ink">
                {sys.emoji} {sys.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sys.symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => openEditor(sys.name, symptom)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-ink hover:border-accent hover:text-accent"
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-soft">
        <h2 className="text-xl font-semibold">Symptom Log</h2>
        {!selected ? (
          <p className="mt-2 text-sm text-muted">
            Select a symptom to log severity, duration, triggers, and notes.
          </p>
        ) : (
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-xs font-medium text-muted">{selected.systemName}</p>
              <h3 className="text-base font-semibold">{selected.symptomLabel}</h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted">Severity: {draft.severity}</label>
              <input
                type="range"
                min={1}
                max={10}
                value={draft.severity}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, severity: Number(e.target.value) }))
                }
                className="mt-2 w-full"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-muted">Duration</p>
              <div className="flex flex-wrap gap-2">
                {(["30m", "2h", "1d", "3d", "1w", "6mo", "1y"] as const).map((x) => (
                  <button
                    key={x}
                    onClick={() => setDraft((d) => ({ ...d, duration: x }))}
                    className={pillClass(draft.duration === x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-muted">Frequency</p>
              <div className="flex gap-2">
                {(["Once", "Recurring", "Constant"] as const).map((x) => (
                  <button
                    key={x}
                    onClick={() => setDraft((d) => ({ ...d, frequency: x }))}
                    className={pillClass(draft.frequency === x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-muted">Time of day</p>
              <div className="flex flex-wrap gap-2">
                {(["Any", "Morning", "Afternoon", "Evening", "Night"] as const).map((x) => (
                  <button
                    key={x}
                    onClick={() => setDraft((d) => ({ ...d, timeOfDay: x }))}
                    className={pillClass(draft.timeOfDay === x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-muted">Triggers</p>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        triggers: d.triggers.includes(t)
                          ? d.triggers.filter((x) => x !== t)
                          : [...d.triggers, t],
                      }))
                    }
                    className={pillClass(draft.triggers.includes(t))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-muted">Relieving factors</p>
              <div className="flex flex-wrap gap-2">
                {relieverOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        relievers: d.relievers.includes(r)
                          ? d.relievers.filter((x) => x !== r)
                          : [...d.relievers, r],
                      }))
                    }
                    className={pillClass(draft.relievers.includes(r))}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted">Notes</label>
              <textarea
                value={draft.notes}
                onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
                className="mt-2 h-24 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={saveLog}
                className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
              >
                Save Symptom
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-gray-100 pt-4">
          <h3 className="text-sm font-semibold">Recent Logs</h3>
          <div className="mt-3 space-y-2">
            {logs.length === 0 ? (
              <p className="text-sm text-muted">No symptom logs yet.</p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.symptomId}
                  className="rounded-xl border border-gray-200 bg-white p-3"
                >
                  <p className="text-sm font-semibold">{log.symptomLabel}</p>
                  <p className="text-xs text-muted">
                    Severity {log.data.severity} · {log.data.duration} ·{" "}
                    {log.data.frequency}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
