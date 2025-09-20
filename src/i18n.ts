// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    debug: false,

    detection: {
      // Ordre de détection de la langue
      order: ["localStorage", "htmlTag", "navigator", "querystring"],
      // Où stocker la langue choisie
      caches: ["localStorage"],
      // Clé utilisée dans le localStorage
      lookupLocalStorage: "i18nextLng",
      // Paramètre d’URL (optionnel : ?lng=en)
      lookupQuerystring: "lng",
      // Attribut <html lang="..."> pris en compte
      htmlTag: typeof document !== "undefined" ? document.documentElement : undefined,
    },

    interpolation: { escapeValue: false },

    // Évite le suspens/flash en React si tu n’utilises pas <Suspense>
    react: { useSuspense: false },
  });

// Garde <html lang="..."> sync avec la langue active (utile pour accessibilité/SEO)
i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }
});

export default i18n;
