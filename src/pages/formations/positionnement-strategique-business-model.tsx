import { Clock, Users, BookOpen, Target, LineChart, Grid, LayoutGrid, Waves, Compass, Rocket, Cpu, Link as LinkIcon, Blocks } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function PositionnementStrategiqueBusinessModel() {
  return (
    <FormationLayout
      badge="Stratégie & modèle économique"
      title="Positionnement stratégique & business model"
      summary="Travailler la proposition de valeur, cartographier la concurrence et concevoir un business model lisible et différenciant (BMC, VPD, Océan Bleu)."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Managers, stratégie, innovation, intrapreneurs" },
      ]}

      // Pourquoi
      whyText="Beaucoup d’organisations confondent stratégie et business model : récit inspirant sans ancrage dans une proposition de valeur claire ni un modèle économique robuste. Résultat : positionnement flou et arbitrages instables. Ce format apporte un cadre concret (BMC, Value Proposition Design, Océan Bleu) pour aligner stratégie, offre et création/capture de valeur."
      pills={[
        { icon: Target, label: "Proposition de valeur claire" },
        { icon: LineChart, label: "Création & capture de valeur" },
      ]}

      // Objectifs
      objectives={[
        "Clarifier la proposition de valeur et la relier aux attentes clients.",
        "Choisir un positionnement concurrentiel pertinent (coût, différenciation, focus, hybride).",
        "Structurer l’offre avec Business Model Canvas et Value Proposition Design.",
        "Explorer des espaces de valeur avec l’approche Océan Bleu (ERAC, courbe de valeur).",
        "Relier business model et stratégie pour construire un avantage durable.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Panorama des stratégies concurrentielles", desc: "Coûts, différenciation, niche, hybrides — critères de choix et risques." },
        { title: "Création & capture de valeur", desc: "De la promesse à la marge : bénéfices > coûts, moteurs de revenu, structure de coûts." },
        { title: "Atelier Value Proposition Design", desc: "Formaliser l’offre, problématiques client, adéquation problème/solution et preuves." },
        { title: "Business Model Canvas", desc: "Activités clés, ressources, partenaires, revenus, coûts — cohérence d’ensemble." },
        { title: "Océan Bleu", desc: "Courbe de valeur et grille ERAC (Éliminer, Réduire, Augmenter, Créer) pour déplacer la frontière coût/valeur." },
        { title: "Benchmark & mapping concurrentiel", desc: "Cartographier, repérer les espaces libres et les menaces latentes." },
        { title: "Études inspirantes", desc: "Comment le business model transforme la stratégie (Apple, Tesla, Airbnb… — lecture critique)." },
        { title: "Feuille de route", desc: "Narratif stratégique clair pour l’interne et l’externe, étapes 60–90 jours." },
      ]}

      // Formats
      formats={[
        { name: "Atelier + Séminaire", lines: ["1–2 jours", "Présentiel / distanciel"] },
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-atelier VPD/BMC"] },
        { name: "Parcours", lines: ["2–6 semaines", "Accompagnement sur un cas réel"] },
      ]}

      // Cas d’usage
      useCases={[
        "Aligner l’offre sur les segments prioritaires via une proposition de valeur clarifiée.",
        "Redéfinir le business model avec le Canvas et ajuster le positionnement face à de nouveaux entrants.",
        "Explorer un espace concurrentiel inédit avec l’approche Océan Bleu.",
        "Transformer la stratégie en un narratif différenciant pour partenaires et investisseurs.",
      ]}

      // Liens numériques (facultatif : déjà couvert par d'autres pages, mais utile ici)
      // Tu peux aussi les garder en 'useCases' si tu préfères limiter les sections.
      // (Si tu veux une section dédiée, on l’ajoute dans le layout.)

      // CTA Manamind
      ctaTitle="Concevons un positionnement clair et différenciant"
      ctaText="On structure votre proposition de valeur et votre business model pour convaincre et exécuter."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}