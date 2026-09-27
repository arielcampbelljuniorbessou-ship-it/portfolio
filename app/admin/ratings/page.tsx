"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, RefreshCw, ShieldCheck } from "lucide-react";

type StoredRating = {
  projectSlug: string;
  projectName: string;
  score: number;
  comment: string;
};

type StoredSubmission = {
  id: string;
  createdAt: string;
  visitorName: string;
  ratings: StoredRating[];
};

const tokenStorageKey = "ariel-ratings-admin-token";

function toCsvCell(value: string) {
  const safeValue = /^[\s\uFEFF]*[=+\-@＝＋－＠]/u.test(value)
    ? `'${value}`
    : value;
  return `"${safeValue.replaceAll('"', '""')}"`;
}

export default function RatingsAdminPage() {
  const [token, setToken] = useState("");
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalRatings = useMemo(
    () =>
      submissions.reduce(
        (total, submission) => total + submission.ratings.length,
        0
      ),
    [submissions]
  );

  const averageScore = useMemo(() => {
    const scores = submissions.flatMap((submission) =>
      submission.ratings.map((rating) => rating.score)
    );

    if (scores.length === 0) {
      return "0.0";
    }

    return (
      scores.reduce((total, score) => total + score, 0) / scores.length
    ).toFixed(1);
  }, [submissions]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setToken(window.localStorage.getItem(tokenStorageKey) ?? "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    setError("");
    window.localStorage.setItem(tokenStorageKey, token);

    try {
      const response = await fetch("/api/ratings", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: "no-store"
      });

      const payload = (await response.json().catch(() => null)) as {
        submissions?: StoredSubmission[];
        error?: string;
      } | null;

      if (!response.ok) {
        setSubmissions([]);
        setError(payload?.error ?? "Impossible de charger les avis.");
        return;
      }

      setSubmissions(payload?.submissions ?? []);
    } catch {
      setSubmissions([]);
      setError("Impossible de charger les avis.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    const rows = submissions.flatMap((submission) =>
      submission.ratings.map((rating) => [
        submission.createdAt,
        submission.visitorName || "Anonyme",
        rating.projectName,
        String(rating.score),
        rating.comment
      ])
    );

    const csv = [
      ["Date", "Visiteur", "Projet", "Note", "Commentaire"],
      ...rows
    ]
      .map((row) => row.map(toCsvCell).join(","))
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "avis-portfolio-ariel.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-void px-4 py-10 text-ink">
      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-neon">
              <ShieldCheck className="h-4 w-4" />
              Administration
            </p>
            <h1 className="story-title text-4xl leading-tight sm:text-6xl">
              Avis reçus
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              aria-label="Token admin"
              placeholder="Token admin"
              className="min-h-12 rounded-[8px] border border-line bg-panel px-4 text-sm text-ink placeholder:text-muted focus:border-neon"
            />
            <button
              type="button"
              onClick={loadSubmissions}
              disabled={loading || token.trim().length === 0}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neon/35 bg-neon/10 px-5 font-display text-sm font-black text-neon transition hover:bg-neon hover:text-void disabled:cursor-not-allowed disabled:opacity-55"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Charger
            </button>
            <button
              type="button"
              onClick={downloadCsv}
              disabled={submissions.length === 0}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 font-display text-sm font-black text-ink transition hover:border-neon hover:text-neon disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Download className="h-4 w-4" />
              CSV
            </button>
          </div>
        </div>

        {error ? (
          <p className="mb-6 rounded-[8px] border border-brass/35 bg-brass/10 p-4 text-sm font-semibold text-brass">
            {error}
          </p>
        ) : null}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Soumissions" value={String(submissions.length)} />
          <Stat label="Notes" value={String(totalRatings)} />
          <Stat label="Moyenne" value={`${averageScore}/10`} />
        </div>

        <div className="grid gap-5">
          {submissions.map((submission) => (
            <article key={submission.id} className="glass-line rounded-[8px] p-5">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-display text-xl font-black text-ink">
                  {submission.visitorName || "Visiteur anonyme"}
                </h2>
                <time className="text-sm font-semibold text-muted">
                  {new Date(submission.createdAt).toLocaleString("fr-FR")}
                </time>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                {submission.ratings.map((rating) => (
                  <section
                    key={`${submission.id}-${rating.projectSlug}`}
                    className="rounded-[8px] border border-line bg-void/55 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-black text-ink">
                        {rating.projectName}
                      </h3>
                      <strong className="text-xl text-neon">
                        {rating.score}/10
                      </strong>
                    </div>
                    <p className="text-sm leading-6 text-muted">
                      {rating.comment || "Aucun commentaire."}
                    </p>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-line bg-white/[0.025] p-5">
      <p className="text-xs font-bold uppercase text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-black text-neon">{value}</p>
    </div>
  );
}
