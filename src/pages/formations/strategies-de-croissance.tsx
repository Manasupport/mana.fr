import {
  Clock,
  Users,
  BookOpen,
  Target,
  Layers3,
  BarChart3,
  GitBranch,
  Briefcase,
  Rocket,
  Cpu,
  Link as LinkIcon,
  Blocks,
} from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function StrategiesDeCroissance() {
  return (
    <FormationLayout
      badge="Stratégie & développement"
      title="Stratégies de croissance"
      summary="Explorer les voies de développement : diversification, internationalisation, croissance interne ou externe, alliances et partenariats."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Managers, CODIR/COMEX, stratégie/innovation" },
      ]}

      // Pourquoi
      whyText="Les organisations hésitent entre plusieurs options de développement. Sans cadre, les décisions deviennent opportunistes et coûteuses. Cette formation apporte des outils pour comparer les voies de croissance et choisir celles qui créent une valeur durable."
      pills={[
        { icon: Target, label: "Choisir en connaissance de cause" },
        { icon: Layers3, label: "Structurer le portefeuille" },
      ]}

      // Objectifs (pas « pédagogiques »)
      objectives={[
        "Identifier et comparer les options de croissance (matrice Ansoff : pénétration, développement, diversification).",
        "Analyser les conditions de succès de l’internationalisation : drivers, sélection des marchés, modes d’entrée.",
        "Évaluer les modes de croissance : interne, externe (M&A), joint-ventures, alliances.",
        "Mobiliser les outils de portfolio management : BCG, McKinsey/GE, ADL, options réelles.",
        "Relier croissance et innovation de business model dans un contexte numérique.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Voies de croissance — panorama", desc: "Diversification, internationalisation, innovation, partenariats : quand activer quel levier." },
        { title: "Matrice d’Ansoff", desc: "Pénétration, développement produit/marché, diversification — risques et prérequis." },
        { title: "Diversification", desc: "Synergies, économies d’échelle, complexité ; les 3 tests de Porter (attractivité, coût d’entrée, effet better-off)." },
        { title: "Internationalisation", desc: "Drivers, sélection des pays, modes d’entrée (export, licences, JV, filiales), adaptation vs standardisation." },
        { title: "Modes de croissance", desc: "Interne vs externe (M&A), alliances stratégiques : création de valeur et risques d’intégration." },
        { title: "Portfolio management", desc: "BCG, McKinsey/GE, ADL, options réelles : allouer les ressources et séquencer les paris." },
        { title: "Atelier pratique", desc: "Cartographier vos options et construire 1–2 scénarios de croissance outillés." },
      ]}

      // Formats
      formats={[
        { name: "Séminaire & Ateliers", lines: ["1–2 jours", "Présentiel / distanciel"] },
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-atelier"] },
        { name: "Parcours", lines: ["2–6 semaines", "Accompagnement sur cas réel"] },
      ]}

      // Cas d’usage
      useCases={[
        "Tester l’opportunité d’une diversification et arbitrer avec les 3 tests de Porter.",
        "Choisir un mode d’entrée pertinent pour l’internationalisation d’une activité.",
        "Repositionner un portefeuille avec la matrice BCG ou McKinsey/GE.",
        "Nouer des partenariats/alliances pour accélérer l’innovation et l’accès marché.",
      ]}

      // (Liens numériques : si tu veux une section dédiée plus tard, on peut l’ajouter au layout)
      // Ex : IA = nouveaux relais de croissance ; Plateformes = modèles écosystémiques ; Blockchain = confiance distribuée

      // CTA Manamind
      ctaTitle="Éclairons votre trajectoire de croissance"
      ctaText="On compare objectivement les options et on bâtit un scénario créateur de valeur."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}