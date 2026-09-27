"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Globe2, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";
import type { Locale } from "@/data/localization";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const { scrollYProgress } = useScroll();
  const { locale, changeLocale } = useLanguage();
  const copy = messages[locale];
  const navItems = [
    { label: copy.nav.story, href: "#histoire" },
    { label: copy.nav.projects, href: "#realisations" },
    { label: copy.nav.skills, href: "#competences" },
    { label: copy.nav.mission, href: "#mission" },
    { label: copy.nav.contact, href: "#contact" }
  ];

  useEffect(() => {
    const sectionIds = [
      "accueil",
      "histoire",
      "realisations",
      "competences",
      "mission",
      "contact"
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let frame = 0;
    const updateActiveSection = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const contact = document.getElementById("contact");
        const contactBounds = contact?.getBoundingClientRect();
        if (
          contactBounds &&
          contactBounds.top < window.innerHeight &&
          contactBounds.bottom > 0
        ) {
          setActive("contact");
          return;
        }

        const activationLine = window.innerHeight * 0.4;
        let currentId = "accueil";
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) {
            currentId = section.id;
          } else {
            break;
          }
        }
        setActive(currentId);
      });
    };

    updateActiveSection();
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        className="fixed left-0 top-0 h-1 w-full bg-neon shadow-glow"
      />
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-line bg-void/72 px-4 shadow-depth backdrop-blur-xl">
        <a
          href="#accueil"
          className="flex min-h-10 items-center rounded-full px-3 font-display text-sm font-extrabold text-ink"
          onClick={() => setOpen(false)}
        >
          ARIEL
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === id ? "location" : undefined}
                className={`relative flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition ${
                  active === id ? "text-void" : "text-muted hover:text-ink"
                }`}
              >
                {active === id ? (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-1 rounded-full bg-neon"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        <label className="flex h-10 items-center gap-2 rounded-full border border-line px-3 text-muted transition hover:border-neon/50 hover:text-neon">
          <Globe2 aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="sr-only">{copy.language}</span>
          <select
            aria-label={copy.language}
            value={locale}
            onChange={(event) => changeLocale(event.target.value as Locale)}
            className="max-w-[92px] cursor-pointer bg-transparent text-sm font-semibold text-ink outline-none"
          >
            <option value="fr" className="bg-void text-ink">Français</option>
            <option value="en" className="bg-void text-ink">English</option>
            <option value="es" className="bg-void text-ink">Español</option>
            <option value="ar" className="bg-void text-ink">العربية</option>
          </select>
        </label>

        <button
          type="button"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:border-neon/50 hover:text-neon md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-3xl border border-line bg-void/92 p-3 shadow-depth backdrop-blur-xl md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href.slice(1) ? "location" : undefined}
              onClick={() => setOpen(false)}
              className={`min-h-11 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active === item.href.slice(1)
                  ? "bg-neon/10 text-neon"
                  : "text-muted hover:bg-neon/10 hover:text-neon"
              }`}
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      ) : null}
    </header>
  );
}
