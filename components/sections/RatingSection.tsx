"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareText, Send } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { Reveal } from "@/components/animations/Reveal";
import { TypingHeading } from "@/components/ui/TypingHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";

type RatingDraft = {
  score: number;
  comment: string;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

type RatingSectionProps = {
  projects: Project[];
};

const storageKey = "ariel-project-ratings";

export function RatingSection({ projects }: RatingSectionProps) {
  const { locale } = useLanguage();
  const copy = messages[locale].rating;
  const initialState = useMemo(
    () =>
      projects.reduce<Record<string, RatingDraft>>((drafts, project) => {
        drafts[project.slug] = { score: 8, comment: "" };
        return drafts;
      }, {}),
    [projects]
  );
  const [ratings, setRatings] = useState<Record<string, RatingDraft>>(initialState);
  const [visitorName, setVisitorName] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) {
        return;
      }

      try {
        setRatings({ ...initialState, ...JSON.parse(stored) });
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialState]);

  const updateRating = (
    slug: string,
    field: keyof RatingDraft,
    value: string | number
  ) => {
    setSaveStatus("idle");
    setRatings((current) => ({
      ...current,
      [slug]: {
        ...current[slug],
        [field]: value
      }
    }));
  };

  const saveRatings = async () => {
    setSaveStatus("saving");
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(ratings));
    } catch {
      // L'enregistrement serveur reste possible si le stockage local est indisponible.
    }

    const payload = projects.reduce<
      Record<string, RatingDraft & { projectName: string }>
    >((drafts, project) => {
      drafts[project.slug] = {
        projectName: project.name,
        ...(ratings[project.slug] ?? { score: 8, comment: "" })
      };
      return drafts;
    }, {});

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName,
          ratings: payload
        })
      });

      setSaveStatus(response.ok ? "saved" : "error");
    } catch {
      setSaveStatus("error");
    }
  };

  return (
    <section className="py-20">
      <div className="section-shell">
        <Reveal>
          <div className="border-y border-line py-12">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase text-neon">
                  {copy.eyebrow}
                </p>
                <TypingHeading
                  text={copy.title}
                  className="story-title text-3xl leading-tight sm:text-5xl"
                />
              </div>
              <div className="grid gap-3 sm:min-w-[300px]">
                <input
                  type="text"
                  value={visitorName}
                  onChange={(event) => setVisitorName(event.target.value)}
                  aria-label={copy.name}
                  placeholder={copy.namePlaceholder}
                  maxLength={120}
                  className="min-h-12 rounded-[8px] border border-line bg-void/60 px-4 text-sm font-semibold text-ink placeholder:text-muted/65 focus:border-neon"
                />
                <button
                  type="button"
                  onClick={saveRatings}
                  disabled={saveStatus === "saving"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neon/35 bg-neon/10 px-5 font-display text-sm font-black text-neon transition hover:bg-neon hover:text-void disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {saveStatus === "saving" ? copy.sending : copy.send}
                </button>
                <p
                  className="min-h-5 text-sm font-semibold text-muted"
                  aria-live="polite"
                >
                  {saveStatus === "saved"
                    ? copy.sent
                    : saveStatus === "error"
                      ? copy.error
                      : ""}
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {projects.map((project) => {
                const rating = ratings[project.slug] ?? { score: 8, comment: "" };
                return (
                  <article
                    key={project.slug}
                    className="glass-line rounded-[8px] p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-xl font-black text-ink">
                        {project.name}
                      </h3>
                      <strong className="text-2xl text-neon">
                        {rating.score}/10
                      </strong>
                    </div>
                    <label className="mt-6 block text-sm font-semibold text-muted">
                      {copy.score}
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={rating.score}
                        onChange={(event) =>
                          updateRating(
                            project.slug,
                            "score",
                            Number(event.target.value)
                          )
                        }
                        className="mt-3 h-2 w-full accent-neon"
                      />
                    </label>
                    <label className="mt-5 block text-sm font-semibold text-muted">
                      {copy.comment}
                      <span className="mt-3 flex gap-3 rounded-[8px] border border-line bg-void/60 p-3 focus-within:border-neon/50">
                        <MessageSquareText className="mt-1 h-4 w-4 shrink-0 text-neon" />
                        <textarea
                          value={rating.comment}
                          onChange={(event) =>
                            updateRating(project.slug, "comment", event.target.value)
                          }
                          placeholder={copy.commentPlaceholder}
                          maxLength={1200}
                          rows={3}
                          className="w-full resize-none bg-transparent text-sm leading-6 text-ink placeholder:text-muted/65 focus:outline-none"
                        />
                      </span>
                    </label>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
