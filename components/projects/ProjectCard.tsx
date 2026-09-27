"use client";

import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";

type ProjectCardProps = {
  project: Project;
  onExplore: (project: Project) => void;
};

export function ProjectCard({ project, onExplore }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDone = project.status === "Terminé";

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -8, rotateX: 2 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="glass-line group flex min-h-[580px] flex-col overflow-hidden rounded-[8px]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-white/[0.02]">
        <Image
          src={project.visual}
          alt={`Visuel du projet ${project.name}`}
          width={900}
          height={560}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4">
          <Badge tone={isDone ? "green" : "brass"}>
            <span className="mr-2">
              {isDone ? (
                <CheckCircle2 className="inline h-4 w-4" />
              ) : (
                <Clock3 className="inline h-4 w-4" />
              )}
            </span>
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-black text-ink">
          {project.name}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-muted">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Badge key={technology} tone="muted">
              {technology}
            </Badge>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onExplore(project)}
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neon/35 bg-neon/10 px-5 font-display text-sm font-black text-neon transition hover:border-neon hover:bg-neon hover:text-void focus-visible:bg-neon focus-visible:text-void"
        >
          EXPLORER
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}
