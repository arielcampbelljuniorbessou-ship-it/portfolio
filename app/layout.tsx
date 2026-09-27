import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, Inter, Space_Grotesk } from "next/font/google";
import { PageLoader } from "@/components/animations/PageLoader";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { isLocale } from "@/data/localization";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk"
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant-garamond"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ariel - Portfolio developpeur & cybersecurite",
    template: "%s | Ariel"
  },
  description:
    "Portfolio immersif d'Ariel, etudiant en informatique oriente developpement, cybersécurité et hacking ethique.",
  keywords: [
    "Ariel",
    "portfolio",
    "developpeur",
    "cybersecurite",
    "hacking ethique",
    "Python",
    "Django",
    "React"
  ],
  authors: [{ name: "Ariel" }],
  creator: "Ariel",
  openGraph: {
    title: "Ariel - Portfolio developpeur & cybersecurite",
    description:
      "Une experience sombre, moderne et interactive autour des projets et de l'ambition d'Ariel.",
    url: siteUrl,
    siteName: "Portfolio Ariel",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Portfolio Ariel - developpeur et cybersecurite"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#030706",
  colorScheme: "dark"
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("ariel-site-language")?.value;
  const initialLocale = isLocale(localeCookie) ? localeCookie : "fr";

  return (
    <html lang={initialLocale} dir={initialLocale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cormorantGaramond.variable}`}
      >
        <LanguageProvider initialLocale={initialLocale}>
          <PageLoader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
