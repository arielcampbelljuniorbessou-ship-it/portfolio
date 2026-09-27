import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { contactLinks } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";

export function Footer() {
  const { locale } = useLanguage();
  const copy = messages[locale].footer;

  return (
    <footer id="contact" className="border-t border-line py-12">
      <div className="section-shell">
        <div className="grid gap-10 text-center md:grid-cols-[1fr_1.4fr] md:text-left">
          <div>
            <h2 className="font-display text-3xl font-black text-ink">ARIEL</h2>
            <p className="mt-2 text-sm font-semibold text-muted">
              {copy.role}
            </p>
            <p className="mt-6 text-sm leading-7 text-mint">
              {copy.tagline}
            </p>
          </div>

          <address className="grid gap-3 not-italic sm:grid-cols-2">
            <FooterLink href={contactLinks.phoneHref} icon={Phone}>
              {copy.phone} : {contactLinks.phone}
            </FooterLink>
            <FooterLink href={contactLinks.emailHref} icon={Mail}>
              {copy.email} : {contactLinks.email}
            </FooterLink>
            <FooterLink href={contactLinks.githubHref} icon={Github}>
              GitHub : {contactLinks.githubLabel}
            </FooterLink>
            <FooterLink href={contactLinks.linkedInHref} icon={Linkedin}>
              LinkedIn
            </FooterLink>
          </address>
        </div>

        <div className="mt-10 flex min-h-12 items-center justify-center border-t border-line pt-8 text-center text-sm text-muted">
          © 2026 Ariel — {copy.rights}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon: Icon,
  children
}: {
  href: string;
  icon: typeof Phone;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-h-12 items-center justify-center gap-3 rounded-full border border-line bg-white/[0.02] px-4 text-sm font-semibold text-muted transition hover:border-neon/45 hover:bg-neon/8 hover:text-neon md:justify-start"
    >
      <Icon className="h-4 w-4 shrink-0 text-neon" />
      <span className="min-w-0 break-words">{children}</span>
    </a>
  );
}
