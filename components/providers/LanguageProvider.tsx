"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { isLocale, messages } from "@/data/localization";
import type { Locale } from "@/data/localization";

type LanguageContextValue = {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "ariel-site-language";
const languageChangeEvent = "ariel-language-change";

function subscribeToLanguage(onChange: () => void) {
  window.addEventListener(languageChangeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(languageChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getStoredLanguage(): Locale {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${storageKey}=`))
    ?.slice(storageKey.length + 1);
  if (isLocale(cookieValue)) return cookieValue;

  try {
    const savedLocale = window.localStorage.getItem(storageKey);
    return isLocale(savedLocale) ? savedLocale : "fr";
  } catch {
    return "fr";
  }
}

export function LanguageProvider({
  children,
  initialLocale
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const locale = useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    () => initialLocale
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.title = messages[locale].siteTitle;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", messages[locale].siteDescription);
  }, [locale]);

  const changeLocale = (nextLocale: Locale) => {
    try {
      window.localStorage.setItem(storageKey, nextLocale);
    } catch {
      // Le cookie suffit à conserver la langue entre les pages.
    }
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${storageKey}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    window.dispatchEvent(new Event(languageChangeEvent));
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}