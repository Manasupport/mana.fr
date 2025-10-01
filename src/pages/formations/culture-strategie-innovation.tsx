import { Clock, Users, Target, BookOpen, ShieldCheck, Lightbulb } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function CultureStrategieInnovation() {
  return (
    <FormationLayout
      badge="Stratégie • Organisation"
      title="Culture & stratégie d’innovation"
      summary="Clarifier où jouer et comment gagner : aligner culture, priorités et décisions pour faire de l’innovation un levier mesurable."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Direction, managers, équipes transverses" },
      ]}
      whyText="Trop d’initiatives, pas assez d’impact ? On évalue la maturité, on décrypte les dilemmes de l’innovation et on construit une trajectoire réaliste pour décider, prioriser et pérenniser."
      pills={[
        { icon: Target, label: "Prioriser avec clarté" },
        { icon: Lightbulb, label: "Aligner culture & stratégie" },
      ]}
      objectives={[
        "Évaluer la maturité d’innovation de l’organisation.",
        "Décrypter les dilemmes de l’innovation pour y apporter des réponses stratégiques.",
        "Savoir raconter l’innovation pour embarquer le collectif.",
      ]}
      modules={[
        { title: "Diagnostic & priorisation", desc: "État des lieux, cartographie des initiatives, arbitrages (impact, risques, ressources)." },
        { title: "Cadre stratégique", desc: "Ambition, horizons d’innovation, zones d’exploration/exploitation, gouvernance et critères de décision." },
        { title: "Méthodes & pratiques", desc: "Portefeuille d’outils et rituels adaptés (cadences, critères d’entrée/sortie, revues, métriques d’apprentissage)." },
        { title: "Pérenniser", desc: "Ancrer les boucles d’amélioration continue, capitalisation, rituels d’alignement et indicateurs de réussite." },
        { title: "Roadmap stratégique d’innovation", desc: "Synthèse : étapes, responsables, risques, KPI — pour passer des intentions aux résultats." },
      ]}
      formats={[
        { name: "Séminaire direction", lines: ["1 journée", "8–15 pers", "Vision, arbitrages, feuille de route"] },
        { name: "Atelier équipe", lines: ["½ journée ~ 4h", "10–30 pers", "Diagnostics & quick wins"] },
        { name: "Parcours", lines: ["4–8 semaines", "6–12 pers", "Mise en œuvre accompagnée"] },
      ]}
      useCases={[
        "Structurer un portefeuille d’initiatives et arrêter les projets à faible impact.",
        "Clarifier les dilemmes (court terme vs long terme, efficacité vs exploration).",
        "Créer un rituel de décision et d’alignement transverse.",
        "Déployer un langage commun de l’innovation pour embarquer les équipes.",
      ]}
      ctaTitle="Construisons votre roadmap stratégique d’innovation"
      ctaText="Score de maturité, quick wins et trajectoire claire pour décider et pérenniser."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}