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
      summary="Passer de la sensibilisation à des plans d’action activables : cadre clair, outils concrets et alignement avec les exigences réglementaires et les attentes du marché."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Managers, responsables RSE, chefs de projet, intrapreneurs" },
      ]}

      // Pourquoi
      whyText="Double pression réglementaire (taxonomie, CSRD, RE2020, loi AGEC…) et sociétale (clients, talents) : beaucoup d’organisations peinent à traduire ces enjeux en priorités concrètes. Ce format propose une méthode simple pour bâtir une stratégie RSE intégrée et la déployer dans le quotidien des équipes."
      pills={[
        { icon: Target, label: "Prioriser ce qui compte" },
        { icon: Recycle, label: "Ancrer l’impact dans l’opérationnel" },
      ]}

      // Objectifs
      objectives={[
        "Maîtriser les fondamentaux RSE (People • Planet • Profit) et les critères clés.",
        "Se positionner face aux exigences (CSRD, SNBC, RE2020, taxonomie européenne…).",
        "Évaluer les impacts majeurs par secteur / chaîne de valeur et repérer les leviers.",
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

      // Formats
      formats={[
        { name: "Séminaire + Ateliers", lines: ["1–2 jours", "Présentiel / distanciel", "Livrables actionnables"] },
        { name: "Découverte", lines: ["½ journée", "Acculturation + mini-diagnostic"] },
        { name: "Parcours", lines: ["2–6 semaines", "Mise en œuvre accompagnée"] },
      ]}

      // Cas d’usage
      useCases={[
        "Formaliser un premier plan RSE avec actions réalistes et KPI mensuels.",
        "Intégrer l’éco-conception dans les offres et lancer un pilote produit-service.",
        "Consolider un socle d’indicateurs communs pour anticiper la CSRD.",
        "Revisiter le business model avec une logique d’impact et d’écosystèmes.",
      ]}

      // CTA Manamind
      ctaTitle="Passons de l’intention aux résultats"
      ctaText="On priorise, on outille, on met en rythme votre transformation durable."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}