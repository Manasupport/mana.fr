import { Clock, Users, Layers, RefreshCw, Wallet, Network, Rocket, Target, Recycle, BarChart3 } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function BusinessModelDesign() {
  return (
    <FormationLayout
      badge="Stratégie"
      title="Business Model Design"
      summary="Prototyper, tester et faire évoluer votre modèle d’affaires à l’ère des plateformes, de l’IA et des nouvelles attentes sociétales — de façon pragmatique et durable."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Direction, managers, équipes transverses" },
      ]}
        formatList={['Masterclass', 'Atelier collectif', 'Format hybride', 'Séminaire']}
      whyText="Face à la pression des nouveaux entrants, aux usages digitaux et aux impératifs de durabilité, les modèles historiques s’essoufflent. Cette formation propose un cadre de design, d’expérimentation et d’itération pour faire évoluer votre business model rapidement et de manière mesurable."
      pills={[
        { icon: Layers, label: "Clarifier le modèle actuel" },
        { icon: Wallet, label: "Optimiser la captation de valeur" },
        { icon: RefreshCw, label: "Prototyper & itérer vite" },
      ]}
      objectives={[
        "Intégrer la durabilité (RSE) et la transformation numérique dans les modèles d’architecture de valeur.",
        "Diagnostiquer le modèle actuel et cibler les zones d’innovation prioritaires.",
        "Prototyper des alternatives et les confronter rapidement au terrain.",
        "Structurer une feuille de route opérationnelle avec des résultats mesurables.",
      ]}
      modules={[
        {
          title: "Diagnostic express du modèle",
          desc: "Cartographier le BMC actuel (clients, valeur, canaux, revenus, coûts…), identifier tensions & hypothèses clés, prioriser (impact × faisabilité × délai).",
        },
        {
          title: "Panorama des modèles émergents",
          desc: "Plateformes, abonnements, freemium, data-driven, effets de réseau & modèles multi-faces.",
        },
        {
          title: "Cas d’économie circulaire & servicielle",
          desc: "Focus sur l’économie de la fonctionnalité et les modèles d’économie circulaire (où créer/pérenniser la valeur).",
        },
        {
          title: "Atelier prototypage",
          desc: "Concevoir 1–2 variantes de business model, storyboard côté client/interne, critères Go/No-Go partagés.",
        },
        {
          title: "Tests & validation rapide",
          desc: "Mise en situation, collecte de preuves (apprentissages > opinions), décider : itérer, pivoter ou arrêter.",
        },
        {
          title: "Feuille de route & métriques",
          desc: "Plan 60–90 jours, ressources & risques, KPI (usage, revenus, coûts, risques), passage à l’échelle.",
        },
      ]}
      formats={[
        { name: "Séminaire intensif", lines: ["1–2 jours", "12–20 pers", "Design + prototypage + tests"] },
        { name: "Atelier découverte", lines: ["½ journée ~ 4h", "8–30 pers", "Acculturation + mini-atelier"] },
        { name: "Parcours / Accompagnement", lines: ["2–8 semaines", "6–12 pers", "Formation-action sur projet"] },
      ]}
      useCases={[
        "Repositionner la proposition de valeur face à une plateforme concurrente.",
        "Intégrer l’économie circulaire & la durabilité sans dégrader la viabilité.",
        "Tester une transition vers l’abonnement avec segment pilote et KPI d’adoption.",
        "Itérer plusieurs versions du BMC avant levée de fonds.",
      ]}
      ctaTitle="On challenge votre modèle actuel ?"
      ctaText="Variante « 1 jour » possible, ou panier d’activités sur-mesure selon vos besoins."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}