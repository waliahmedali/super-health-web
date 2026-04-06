"use client";

import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type UploadRow = {
  id: string;
  file_name: string;
  file_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_at: string;
};

function fmtBytes(bytes: number | null) {
  if (!bytes) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadCenter({ initialRows }: { initialRows: UploadRow[] }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [rows, setRows] = useState<UploadRow[]>(initialRows);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let mounted = true;
    async function loadRows() {
      const {
        data: { user },
      } = await client.auth.getUser();
      if (!user) return;
      const { data } = await client
        .from("upload_records")
        .select("id, file_name, file_path, mime_type, size_bytes, uploaded_at")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });
      if (mounted && data) setRows(data as UploadRow[]);
    }
    void loadRows();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onUpload = async (file: File) => {
    if (!supabase) {
      setError("App configuration is not ready. Please refresh.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Please log in again.");
        setLoading(false);
        return;
      }

      const safeName = file.name.replace(/\s+/g, "_");
      const filePath = `${user.id}/${Date.now()}_${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("test-results")
        .upload(filePath, file, {
          upsert: false,
          contentType: file.type || undefined,
        });

      if (uploadError) throw uploadError;

      const { data: inserted, error: dbError } = await supabase
        .from("upload_records")
        .insert({
          user_id: user.id,
          file_path: filePath,
          file_name: file.name,
          mime_type: file.type || null,
          size_bytes: file.size || null,
        })
        .select("id, file_name, file_path, mime_type, size_bytes, uploaded_at")
        .single();

      if (dbError) throw dbError;

      setRows((prev) => [inserted as UploadRow, ...prev]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (row: UploadRow) => {
    if (!supabase) {
      setError("App configuration is not ready. Please refresh.");
      return;
    }
    setError(null);
    setDeletingId(row.id);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Please log in again.");
        return;
      }

      // Remove the storage file first to avoid orphaned blobs.
      const { error: storageError } = await supabase.storage
        .from("test-results")
        .remove([row.file_path]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("upload_records")
        .delete()
        .eq("id", row.id)
        .eq("user_id", user.id);
      if (dbError) throw dbError;

      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unable to delete file.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/70 bg-card/95 p-6 shadow-soft backdrop-blur">
        <h2 className="text-lg font-semibold">Upload Test Result</h2>
        <p className="mt-1 text-sm text-muted">
          Add blood tests, reports, and imaging files.
        </p>

        <label className="mt-4 inline-flex cursor-pointer rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
          {loading ? "Uploading..." : "Choose file"}
          <input
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            disabled={loading || !supabase}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onUpload(file);
              e.currentTarget.value = "";
            }}
          />
        </label>

        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/70 bg-card/95 shadow-soft backdrop-blur">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-base font-semibold">Uploaded files</h3>
        </div>
        {rows.length === 0 ? (
          <p className="px-5 py-4 text-sm text-muted">No files uploaded yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {rows.map((row) => (
              <li key={row.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{row.file_name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {row.mime_type ?? "unknown"} · {fmtBytes(row.size_bytes)} ·{" "}
                      {new Date(row.uploaded_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void onDelete(row)}
                    disabled={deletingId === row.id}
                    className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === row.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
