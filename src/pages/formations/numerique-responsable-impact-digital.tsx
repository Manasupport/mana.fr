import {
  Clock,
  Users,
  BookOpen,
  Cpu,
  RefreshCcw,
  Layers,
  FileText,
  LineChart,
  LayoutList,
  Rocket,
  Link as LinkIcon,
  Blocks,
  Recycle,
} from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function NumeriqueResponsableImpactDigital() {
  return (
    <FormationLayout
      badge="Numérique durable"
      title="Numérique responsable & impact digital"
      summary="Mesurer l’empreinte environnementale du numérique, mettre en place une stratégie digitale durable et intégrée."
      formatList={['Masterclass', 'Atelier collectif', 'Format hybride', 'Séminaire']}
      meta={[
        { icon: Clock, text: "Discuter" },
        { icon: Users, text: "Managers, RSE, produit, intrapreneurs" },
      ]}

      // Pourquoi
      whyText="Souvent perçu comme un levier de transition, le numérique — et plus encore l’IA — génère pourtant des impacts environnementaux majeurs. Cette formation invite à repenser les usages digitaux en entreprise et à intégrer les principes du numérique responsable, en donnant aux participants les clés opérationnelles pour réduire l’empreinte écologique de leurs pratiques et bâtir une stratégie digitale durable."
      pills={[
        { icon: Cpu, label: "Numérique responsable & IA frugale" },
        { icon: LineChart, label: "Stratégie digitale durable" },
      ]}

      // Objectifs
      objectives={[
        "Comprendre les principes de l’éco-conception appliquée aux technologies digitales.",
        "Maîtriser les méthodes d’éco-innovation (ACV, PEF, Roue de Brezet) pour des services digitaux.",
        "Maîtriser les fondamentaux du numérique responsable et de l’IA frugale.",
        "Réinterroger les usages numériques en entreprise au regard des limites planétaires.",
        "Élaborer des plans d’action numériques responsables et activables.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Panorama introductif", desc: "Définitions, périmètres (production, usage, fin de vie), ordres de grandeur des impacts environnementaux du numérique." },
        { title: "Éco-conception & cycle de vie", desc: "ACV (ISO 14040/14044), méthode PEF, Roue de Brezet appliqués au numérique : où agir concrètement." },
        { title: "Atelier pratique", desc: "Modéliser le cycle de vie d’un produit/service digital et prioriser les leviers d’écoconception." },
        { title: "Éco-innovation", desc: "Écotechnologies sobres, IA frugale, éco-management des services numériques." },
        { title: "Cas inspirants", desc: "Référentiel AFNOR d’IA frugale, Référentiel général d'écoconception de services numériques (ARCEP, ARCOM, ADEME) — lecture critique et transposabilité." },
        { title: "Feuille de route", desc: "Quick wins, indicateurs (sobriété numérique, empreinte matière, référentiels AFNOR, ADEME…), jalons 60–90 jours." },
      ]}

      // Formats
      formats={[
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-atelier"] },
        { name: "Ateliers & Workshops", lines: ["1–2 jours", "Présentiel / distanciel", "Cas concrets des participants"] },
        { name: "Parcours", lines: ["2–6 semaines", "Accompagnement à la mise en œuvre"] },
      ]}

      // Cas d’usage
      useCases={[
        "Cartographier l’empreinte environnementale du système d’information et définir des actions concrètes de réduction.",
        "Prolonger la durée de vie des équipements numériques grâce au reconditionnement, à la mutualisation ou à la location.",
        "Intégrer des critères de sobriété et d’éco-conception dans les projets digitaux et les appels d’offres IT.",
        "Concevoir des parcours utilisateurs plus légers et responsables, limitant la consommation de données et d’énergie.",
      ]}

      // CTA Manamind
  ctaTitle="Faites du numérique un levier durable"
  ctaText="Discuter"
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}