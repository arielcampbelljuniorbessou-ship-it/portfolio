"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";
import { Badge } from "@/components/ui/Badge";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLanguage();
  const copy = messages[locale].projectDetails;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      ref={dialogRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] overflow-y-auto bg-void/92 px-4 py-6 backdrop-blur-2xl sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
        className="section-shell min-h-[calc(100svh-48px)] rounded-[8px] border border-line bg-obsidian/95 shadow-depth"
      >
        <div className="sticky top-4 z-10 flex justify-end p-4">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-void/90 text-ink transition hover:border-neon hover:text-neon"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-14">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-neon">{copy.label}</p>
            <h2 id="project-modal-title" className="story-title text-4xl leading-tight sm:text-6xl">
              {project.name}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">{project.description}</p>
            <div className="mt-7 overflow-hidden rounded-[8px] border border-line">
              <Image
                src={project.visual}
                alt={`${messages[locale].projects.detailedPreview} ${project.name}`}
                width={900}
                height={560}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-7">
            <DetailBlock title={copy.problem} content={project.problem} />
            <DetailBlock title={copy.solution} content={project.solution} />
            <section>
              <h3 className="mb-3 font-display text-lg font-black text-ink">{copy.technologies}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => <Badge key={technology} tone="aqua">{technology}</Badge>)}
              </div>
            </section>
            <section>
              <h3 className="mb-3 font-display text-lg font-black text-ink">{copy.difficulties}</h3>
              <ul className="grid gap-2 text-sm leading-7 text-muted">
                {project.difficulties.map((difficulty) => (
                  <li key={difficulty} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                    <span>{difficulty}</span>
                  </li>
                ))}
              </ul>
            </section>
            <DetailBlock title={copy.learning} content={project.learning} />
            <DetailBlock title={copy.status} content={project.status} />
            <DetailBlock title={copy.innovation} content={project.innovation} />
            {project.link ? (
              <a href={project.link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neon/40 bg-neon px-5 font-display text-sm font-black text-void shadow-glow transition hover:-translate-y-1">
                {project.link.label}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <h3 className="mb-3 font-display text-lg font-black text-ink">{title}</h3>
      <p className="text-sm leading-7 text-muted">{content}</p>
    </section>
  );
}
