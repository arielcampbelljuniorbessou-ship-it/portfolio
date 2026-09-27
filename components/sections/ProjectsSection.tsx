"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  CheckCircle2,
  Clock3,
  Power,
  Signal,
  Wifi
} from "lucide-react";
import type { Project } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeProject, messages } from "@/data/localization";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isPhoneOn, setIsPhoneOn] = useState(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy = messages[locale].projects;
  const localizedProjects = projects.map((project) => localizeProject(project, locale));
  const activeProject = localizedProjects[activeProjectIndex];
  const selectedProject = localizedProjects.find(
    (project) => project.slug === selectedProjectSlug
  );

  const showProject = (index: number) => {
    setActiveProjectIndex((index + localizedProjects.length) % localizedProjects.length);
  };

  const moveProject = (direction: number) => {
    setActiveProjectIndex(
      (current) => (current + direction + localizedProjects.length) % localizedProjects.length
    );
  };

  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartX.current === null) return;
    const distance = clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 48) return;

    didSwipe.current = true;
    moveProject(distance > 0 ? 1 : -1);
    window.setTimeout(() => {
      didSwipe.current = false;
    }, 0);
  };

  return (
    <section id="realisations" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        {activeProject ? (
          <Reveal className="mx-auto flex w-full flex-col items-center">
            <div className="relative w-[min(330px,100%)]">
              <span aria-hidden="true" className="absolute -left-[3px] top-[18%] h-10 w-[4px] rounded-l bg-gradient-to-b from-[#e5e7e9] via-[#45494d] to-[#aeb2b5]" />
              <span aria-hidden="true" className="absolute -left-[3px] top-[27%] h-7 w-[4px] rounded-l bg-gradient-to-b from-[#c7cbce] via-[#45494d] to-[#858a8e]" />
              <span aria-hidden="true" className="absolute -left-[3px] top-[32%] h-7 w-[4px] rounded-l bg-gradient-to-b from-[#c7cbce] via-[#45494d] to-[#858a8e]" />
              <span aria-hidden="true" className="absolute -right-[3px] top-[25%] h-16 w-[4px] rounded-r bg-gradient-to-b from-[#e5e7e9] via-[#45494d] to-[#aeb2b5]" />

              <div className="rounded-[55px] border border-white/30 bg-[linear-gradient(125deg,#e5e8ea_0%,#4d5257_5%,#111316_12%,#070809_78%,#5a5e62_94%,#e1e3e5_100%)] p-[7px] shadow-[0_42px_100px_rgba(0,0,0,0.62),0_0_0_1px_rgba(255,255,255,0.12)]">
                <div className={`relative flex aspect-[393/852] flex-col overflow-hidden rounded-[48px] ring-1 ring-black/90 transition-colors duration-500 ${isPhoneOn ? "bg-[#f2f5f2] text-[#142019]" : "bg-[#030404] text-white"}`}>
                  {isPhoneOn ? (
                    <>
                      <div className="relative flex h-9 shrink-0 items-center justify-between px-6 pt-1 text-[11px] font-extrabold tracking-[0.02em]">
                        <span>9:41</span>
                        <span aria-hidden="true" className="absolute left-1/2 top-[7px] h-[25px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-inner" />
                        <div className="flex items-center gap-1">
                          <Signal className="h-[13px] w-[13px]" />
                          <Wifi className="h-[13px] w-[13px]" />
                          <BatteryFull className="h-[15px] w-[15px]" />
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-2">
                        <div>
                          <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#738078]">ARIEL / PORTFOLIO</p>
                          <p className="mt-0.5 font-display text-[21px] font-black leading-6">{copy.phoneTitle}</p>
                        </div>
                        <span className="rounded-full border border-[#dbe3dd] bg-white/80 px-2.5 py-1 font-mono text-[10px] font-bold text-[#67766b]">
                          {String(activeProjectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-label={`${copy.showDetails} ${activeProject.name}`}
                        onPointerDown={(event) => {
                          if (event.pointerType === "mouse" && event.button !== 0) return;
                          swipeStartX.current = event.clientX;
                        }}
                        onPointerUp={(event) => handleSwipeEnd(event.clientX)}
                        onPointerCancel={() => { swipeStartX.current = null; }}
                        onClick={() => {
                          if (didSwipe.current) {
                            didSwipe.current = false;
                            return;
                          }
                          setSelectedProjectSlug(activeProject.slug);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowRight") {
                            event.preventDefault();
                            moveProject(1);
                          } else if (event.key === "ArrowLeft") {
                            event.preventDefault();
                            moveProject(-1);
                          }
                        }}
                        className="mx-3 mb-3 flex min-h-0 flex-1 touch-pan-y flex-col overflow-hidden rounded-[29px] border border-[#dce4de] bg-white text-left shadow-[0_12px_30px_rgba(34,56,42,0.12)] transition focus-visible:outline-[#1e8d56]"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={activeProject.slug}
                            initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -16 }}
                            transition={{ duration: 0.2 }}
                            className="flex min-h-0 flex-1 flex-col"
                          >
                            <div className="relative mx-2 mt-2 aspect-[1.5] overflow-hidden rounded-[22px] bg-[#e8eee9]">
                              <Image src={activeProject.visual} alt={`${copy.preview} ${activeProject.name}`} fill sizes="300px" className="object-cover" />
                              <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold shadow-sm backdrop-blur-md ${activeProject.slug === "pythonlearning" ? "bg-white/90 text-[#176b40]" : "bg-[#17231c]/85 text-[#f2fff5]"}`}>
                                {activeProject.slug === "pythonlearning" ? <CheckCircle2 className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />}
                                {activeProject.status}
                              </span>
                            </div>
                            <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3">
                              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#78857c]">{copy.selected}</p>
                              <h3 className="mt-1 font-display text-[21px] font-black leading-6 tracking-normal text-[#142019]">{activeProject.name}</h3>
                              <p className="mt-2 line-clamp-3 text-[11px] leading-[1.55] text-[#657168]">{activeProject.description}</p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {activeProject.technologies.slice(0, 3).map((technology) => (
                                  <span key={technology} className="rounded-full border border-[#e2e9e4] bg-[#f6f8f6] px-2 py-1 text-[9px] font-semibold text-[#56635a]">{technology}</span>
                                ))}
                              </div>
                              <div className="mt-auto flex items-center justify-between border-t border-[#edf0ed] pt-3">
                                <span className="text-[10px] font-bold text-[#526057]">{copy.view}</span>
                                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#142019] text-white"><ArrowUpRight className="h-4 w-4" /></span>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </button>
                      <span aria-hidden="true" className="absolute bottom-[7px] left-1/2 h-[4px] w-[92px] -translate-x-1/2 rounded-full bg-[#17201a]" />
                    </>
                  ) : (
                    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-7 bg-[#030404] px-8 text-center">
                      <button type="button" onClick={() => setIsPhoneOn(true)} aria-label={copy.turnOn} className="group grid h-[84px] w-[84px] place-items-center rounded-full border border-white/35 bg-[linear-gradient(145deg,#272c2b,#090b0a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_32px_rgba(103,255,154,0.12)] transition duration-300 hover:border-neon/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0_42px_rgba(103,255,154,0.28)] focus-visible:border-neon">
                        <span className="grid h-[66px] w-[66px] place-items-center rounded-full border border-white/10 bg-black/70 text-neon transition group-hover:bg-neon/10"><Power className="h-8 w-8" strokeWidth={1.7} /></span>
                      </button>
                      <p className="max-w-[205px] text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-white/80">{copy.turnOnPrompt}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isPhoneOn ? (
              <div aria-label={copy.eyebrow} className="mt-6 flex items-center justify-center gap-5">
                <button type="button" onClick={() => moveProject(-1)} aria-label={copy.previous} title={copy.previous} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-ink transition hover:border-neon/50 hover:text-neon"><ArrowLeft className="h-4 w-4" /></button>
                <div className="flex items-center gap-2.5">
                  {localizedProjects.map((project, index) => (
                    <button key={project.slug} type="button" onClick={() => showProject(index)} aria-label={`${copy.showDetails} ${project.name}`} aria-current={index === activeProjectIndex ? "true" : undefined} className={`h-2.5 rounded-full transition-all ${index === activeProjectIndex ? "w-7 bg-neon" : "w-2.5 bg-muted/50 hover:bg-muted"}`} />
                  ))}
                </div>
                <button type="button" onClick={() => moveProject(1)} aria-label={copy.next} title={copy.next} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-ink transition hover:border-neon/50 hover:text-neon"><ArrowRight className="h-4 w-4" /></button>
              </div>
            ) : null}
          </Reveal>
        ) : null}
      </div>
      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal key={selectedProject.slug} project={selectedProject} onClose={() => setSelectedProjectSlug(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
