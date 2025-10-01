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
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Managers, RSE, produit, intrapreneurs" },
      ]}

      // Pourquoi
      whyText="Raréfaction des ressources, pression réglementaire (loi AGEC, taxonomie, CSRD) et attentes sociétales poussent à réinventer les modèles numériques. Cette formation fournit des repères clairs et des outils pratiques pour articuler sobriété numérique, circularité et création de valeur."
      pills={[
        { icon: LineChart, label: "Décider avec des preuves" },
        { icon: Recycle, label: "Sobriété & circularité" },
      ]}

      // Objectifs
      objectives={[
        "Comprendre les principes de l’économie circulaire appliquée au numérique.",
        "Maîtriser les méthodes d’éco-innovation (ACV, PEF, Roue de Brezet).",
        "Évaluer risques & opportunités liés à la circularité faible vs forte.",
        "Réinterroger son business model au regard des limites planétaires.",
        "Élaborer des plans d’action numériques responsables et activables.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Panorama introductif", desc: "Définitions, périmètres (production, usage, fin de vie), ordres de grandeur." },
        { title: "Éco-conception & cycle de vie", desc: "ACV (ISO 14040/14044), méthode PEF, Roue de Brezet : où agir concrètement." },
        { title: "Atelier pratique", desc: "Modéliser le cycle de vie d’un produit/service (Circulab, Idemat) et prioriser les leviers." },
        { title: "Éco-innovation", desc: "Écotechnologies sobres, bouclage déchets-matières, éco-management des services numériques." },
        { title: "Économie circulaire", desc: "Circularité faible vs forte, business models circulaires (réemploi, réparation, abonnement)." },
        { title: "Cas inspirants", desc: "Apple, Decathlon, Renault Refactory, H&M « Close the loop » — lecture critique et transposabilité." },
        { title: "Feuille de route", desc: "Quick wins, indicateurs (circularity gap, empreinte matière, référentiels ADEME), jalons 60–90 jours." },
      ]}

      // Formats
      formats={[
        { name: "Ateliers & Workshops", lines: ["1–2 jours", "Présentiel / distanciel", "Cas concrets des participants"] },
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-atelier"] },
        { name: "Parcours", lines: ["2–6 semaines", "Accompagnement à la mise en œuvre"] },
      ]}

      // Cas d’usage
      useCases={[
        "Prolonger la durée de vie des produits via réparation et services associés.",
        "Expérimenter un modèle d’abonnement circulaire sur un segment pilote.",
        "Prioriser des choix d’éco-conception avec la Roue de Brezet et des critères ACV.",
        "Confronter les projets aux scénarios de circularité faible vs forte pour orienter la stratégie.",
      ]}

      // CTA Manamind
      ctaTitle="Faites du numérique un levier durable"
      ctaText="On mesure, on priorise, on outille vos équipes pour une trajectoire responsable."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}