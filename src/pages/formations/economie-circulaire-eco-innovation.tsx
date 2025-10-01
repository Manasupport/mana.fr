import { Clock, Users, BookOpen, Recycle, Layers, LineChart, LayoutList, Rocket, Cpu, Link as LinkIcon, Blocks } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function EconomieCirculaireEcoInnovation() {
  return (
    <FormationLayout
      badge="Économie circulaire"
      title="Économie circulaire & éco-innovation"
      summary="Découvrir les modèles économiques durables, intégrer l’écoconception et revisiter son business model à l’aune des limites planétaires."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Managers, RSE, chefs de produit, intrapreneurs" },
      ]}

      // Pourquoi
      whyText="Raréfaction des ressources, réglementation (CSRD, loi AGEC, taxonomie) et attentes sociétales imposent de sortir du modèle linéaire « extraire → produire → jeter ». Ce format fournit des repères concrets et des outils opérationnels pour passer d’une logique de fin de vie à une économie de bouclage des flux — en liant durabilité, compétitivité et innovation."
      pills={[
        { icon: LineChart, label: "Décider avec des preuves" },
        { icon: Recycle, label: "Passer du linéaire au circulaire" },
      ]}

      // Objectifs
      objectives={[
        "Comprendre les principes de l’économie circulaire (réduction, réemploi, recyclage, fonctionnalité, écoconception).",
        "Maîtriser les méthodes d’éco-innovation (ACV, PEF, Roue de Brezet, intelligence collective).",
        "Cartographier risques & opportunités selon circularité faible vs forte.",
        "Réinterroger son business model au regard des limites planétaires.",
        "Construire un plan d’actions concret et adapté à sa filière.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Panorama introductif", desc: "Définitions, cadres académiques et institutionnels, champs d’application." },
        { title: "Écoconception & cycle de vie", desc: "ACV (ISO 14040/14044), méthode PEF (16 indicateurs), Roue de Brezet." },
        { title: "Atelier pratique", desc: "Modéliser le cycle de vie d’un produit/service (Circulab, Idemat) et prioriser les leviers." },
        { title: "Éco-innovation", desc: "Bouclage déchets-matières, éco-technologies sobres, éco-management." },
        { title: "Circularité faible vs forte", desc: "Impacts et choix de conception/organisation pour changer d’échelle." },
        { title: "Business models circulaires", desc: "Abonnement, réemploi, réparation, économie de la fonctionnalité." },
        { title: "Cas inspirants", desc: "Apple, Decathlon, Renault Refactory, H&M « Close the loop » (lecture critique)." },
        { title: "Feuille de route", desc: "Quick wins, indicateurs (circularity gap, empreinte matière, référentiels ADEME)." },
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
        "Concevoir un modèle d’abonnement circulaire et sécuriser la viabilité sur un segment pilote.",
        "Prioriser des axes d’écoconception avec la Roue de Brezet et des critères ACV.",
        "Confronter les projets aux scénarios de circularité faible vs forte pour orienter la stratégie.",
      ]}

      // CTA Manamind
      ctaTitle="Passons votre modèle en circulaire"
      ctaText="On priorise, on outille, on cadre une feuille de route actionnable."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}