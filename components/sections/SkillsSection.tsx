"use client";

import { useMemo, useState } from "react";
import type { SkillCategory, SkillItem } from "@/data/portfolio";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { InteractiveSkillsGlobe } from "@/components/sections/InteractiveSkillsGlobe";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeSkill, messages } from "@/data/localization";

type SkillsSectionProps = {
  categories: SkillCategory[];
};

export function SkillsSection({ categories }: SkillsSectionProps) {
  const { locale } = useLanguage();
  const copy = messages[locale].skills;
  const allSkills = useMemo(
    () => categories.flatMap((category) => category.items),
    [categories]
  );
  const firstSkill = allSkills[0];
  const [selectedName, setSelectedName] = useState(firstSkill?.name ?? "");
  const selectedSkill = useMemo<SkillItem | undefined>(
    () => allSkills.find((skill) => skill.name === selectedName) ?? firstSkill,
    [allSkills, firstSkill, selectedName]
  );
  const localizedSelectedSkill = selectedSkill
    ? localizeSkill(selectedSkill, locale)
    : undefined;

  return (
    <section id="competences" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal>
            <InteractiveSkillsGlobe
              skills={allSkills}
              selectedName={selectedSkill?.name ?? ""}
              locale={locale}
              onSelect={setSelectedName}
            />
          </Reveal>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <aside className="glass-line rounded-[8px] p-6">
              <p className="mb-3 text-xs font-bold uppercase text-neon">
                {copy.selection}
              </p>
              {localizedSelectedSkill ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-neon/35 bg-neon/10 text-neon">
                      <localizedSelectedSkill.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-3xl font-black text-ink">
                      {localizedSelectedSkill.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {localizedSelectedSkill.description}
                  </p>
                  <div className="mt-6">
                    <p className="mb-3 text-sm font-bold text-ink">
                      {copy.relatedProjects}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {localizedSelectedSkill.projects.map((project) => (
                        <Badge key={project} tone="aqua">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
