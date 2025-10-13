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
  Recycle,
} from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function StrategieTransformationDurableRseOperationnelle() {
  return (
    <FormationLayout
      badge="RSE & transition durable"
      title="Stratégie de transformation durable & RSE opérationnelle"
      summary="Passer de la sensibilisation à des plans d’action activables pour créer de la valeur multicritère: de la vision stratégique à la transformation opérationnelle, des méthodes et outils concrets pour faire de la RSE un levier de création de valeur."
      formatList={['Masterclass', 'Atelier collectif', 'Format hybride', 'Séminaire']}
      meta={[
        { icon: Clock, text: "Séminaire, Cas pratiques, Accompagnement terrain, Hybride" },
        { icon: Users, text: "Managers, responsables RSE, chefs de projet, intrapreneurs" },
      ]}

      // Pourquoi
      whyText="Au-delà de la posture de conformité aux pressions réglementaires (taxonomie, CSRD, RE2020, loi AGEC…) et sociétales (clients, talents), cette formation fournit les clés pour concevoir et opérationnaliser les stratégies de transformation durable et créer de la valeur multicritères (économique, sociale et environnementale) pour les entreprises."
      pills={[
        { icon: Target, label: "Impact multicritères" },
        { icon: Recycle, label: "Stratégie opérationnelle" },
      ]}

      // Objectifs
      objectives={[
        "Maîtriser les fondamentaux RSE (People • Planet • Profit) et les critères clés.",
        "Se positionner face aux exigences (CSRD, SNBC, RE2020, taxonomie européenne…).",
        "Évaluer les impacts majeurs par secteur / chaîne de valeur et repérer les leviers de création de valeur multicritères.",
        "Construire une feuille de route RSE pragmatique, mesurable et suivie par les équipes.",
        "Intégrer la durabilité aux produits, processus et modèles d’affaires.",
        "Installer une boucle continue : mesurer, itérer, communiquer.",
      ]}

      // Contenu & déroulé
      modules={[
        { title: "Cadrage & inspirations", desc: "17 ODD, piliers RSE, cas récents : pourquoi agir maintenant et où se situer." },
        { title: "Lecture des enjeux", desc: "Conformité court terme, bénéfices moyen terme, transformation long terme : arbitrer sans se disperser." },
        { title: "Diagnostic express", desc: "Cartographier les impacts sur la chaîne de valeur (carbone, ressources, social) et prioriser." },
        { title: "Éco-innovation & éco-conception", desc: "Principes cycle de vie / multicritères / multi-composants ; leviers concrets par typologie d’offre." },
        { title: "Feuille de route d’équipe", desc: "Priorités 3–6 mois, indicateurs, responsabilités, risques et moyens." },
        { title: "Rituels & reporting", desc: "Embarquer les équipes, standardiser les suivis, préparer CSRD / taxonomie (gouvernance data minimale)." },
        { title: "Numérique responsable", desc: "Relier empreinte et usages numériques : sobriété, choix techniques, garde-fous (IA, plateformes, blockchain)." },
        { title: "Option sectorielle", desc: "Adaptations par filière (énergie, construction, mobilité, finance, …)." },
      ]}

      // Formats & modalités
      formats={[
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-diagnostic"] },
        { name: "Séminaire + Ateliers", lines: ["1–2 jours", "Présentiel / distanciel", "Livrables actionnables"] },
        { name: "Parcours", lines: ["2–6 semaines", "Mise en œuvre accompagnée"] },
      ]}

      // Exemples d’applications
      useCases={[
        "Formaliser un premier plan RSE avec actions réalistes et KPI mensuels.",
        "Intégrer l’éco-conception dans les offres et lancer un pilote produit-service.",
        "Consolider un socle d’indicateurs communs pour anticiper la CSRD.",
        "Revisiter le business model avec une logique d’impact et d’écosystèmes.",
      ]}

      // CTA Manamind
      ctaTitle="Passons de l’intention aux résultats"
      ctaText="Discuter"
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}