import {
  Clock,
  Users,
  BookOpen,
  Target,
  LayoutList,
  Rocket,
  Cpu,
  Link as LinkIcon,
  Blocks,
} from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function VisionMissionRaisonDetreValeurs() {
  return (
    <FormationLayout
      badge="Identité & stratégie"
      title="Vision, mission, raison d’être & valeurs"
      summary="Clarifier les fondamentaux identitaires de votre organisation pour renforcer l’engagement et la cohérence stratégique."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "COMEX, CODIR, managers, RH/stratégie" },
      ]}

      // Pourquoi
      whyText="Dans un contexte de transformations rapides (numérique, sociétale, écologique), beaucoup d’organisations peinent à exprimer une vision singulière, une mission mobilisatrice et des valeurs réellement opérantes. Ce format aide à clarifier ces fondamentaux et à les relier à la stratégie pour créer un récit cohérent, engageant et différenciant."
      pills={[
        { icon: Target, label: "Cap stratégique clair" },
        { icon: LayoutList, label: "Valeurs opérantes" },
      ]}

      // Objectifs
      objectives={[
        "Distinguer vision, mission, raison d’être et valeurs, et comprendre leur rôle stratégique.",
        "Identifier la singularité identitaire de l’organisation (pôles en tension créatrice).",
        "Définir une raison d’être authentique et mobilisatrice.",
        "Relier vision et mission aux objectifs stratégiques de long terme.",
        "Traduire les valeurs en comportements observables et décisions concrètes.",
        "Créer un alignement narratif pour renforcer l’engagement et la différenciation.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Panorama des notions", desc: "Définitions opérationnelles et cas inspirants." },
        { title: "Atelier introspectif", desc: "Identifier les pôles identitaires en tension (ex. performance / humanité)." },
        { title: "Cartographie stratégique", desc: "Relier vision/mission/valeurs aux parties prenantes et aux choix clés." },
        { title: "Atelier raison d’être", desc: "Formulation, test de robustesse et critères d’authenticité." },
        { title: "Traduction en valeurs", desc: "Choix resserré, comportements associés, rituels d’appropriation." },
        { title: "Narratif stratégique", desc: "Transformer vision, mission et raison d’être en récit engageant." },
        { title: "Feuille de route", desc: "Ancrage dans la gouvernance, la communication et les rituels managériaux." },
      ]}

      // Formats
      formats={[
        { name: "Séminaire + Atelier", lines: ["1–2 jours", "Présentiel / distanciel"] },
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-atelier"] },
        { name: "Parcours", lines: ["2–6 semaines", "Itérations + accompagnement d’équipe"] },
      ]}

      // Cas d’usage
      useCases={[
        "Redéfinir une raison d’être mobilisatrice et crédible.",
        "Clarifier des valeurs et les traduire en comportements managériaux.",
        "Mettre en cohérence mission et vision avec des choix stratégiques à 5 ans.",
        "Utiliser les pôles identitaires comme source d’énergie créative.",
      ]}

      // (Liens numériques – si tu veux une section dédiée, on peut l’ajouter au layout, sinon garde ici)
      // Ex : IA = éthique & rôle de l’humain ; Plateformes = mission & écosystèmes ; Blockchain = gouvernance & confiance

      // CTA Manamind
      ctaTitle="Articulons votre identité et votre stratégie"
      ctaText="On formalise une vision claire, une mission mobilisatrice et des valeurs actionnables."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}