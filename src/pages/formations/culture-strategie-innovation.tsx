import { Clock, Users, Target, BookOpen, ShieldCheck, Lightbulb } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function CultureStrategieInnovation() {
  return (
    <FormationLayout
        badge="Innover pour s'adapter"
      title="Culture & stratégie d’innovation"
      summary="Évaluer la maturité d’innovation et aligner culture, stratégie et performance."
        formatList={['Masterclass', 'Atelier collectif', 'Format hybride', 'Séminaire']}
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Direction, managers, équipes transverses" },
      ]}
      whyText={`Cette formation vous aide à évaluer la maturité d’innovation de votre organisation et à comprendre les dilemmes stratégiques auxquels elle fait face.
Vous apprendrez à formuler des réponses concrètes et durables pour renforcer votre positionnement et stimuler la créativité collective.
Enfin, vous saurez diffuser une véritable culture de l’innovation, capable d’embarquer vos équipes et de transformer les idées en leviers de performance partagée.`}
      pills={[
        { icon: Target, label: "Prioriser avec clarté" },
        { icon: Lightbulb, label: "Aligner culture & stratégie" },
        { icon: ShieldCheck, label: "Aligner culture de l’innovation, stratégie et performance." },
      ]}
      objectives={[
        "Évaluer la maturité d’innovation de l’organisation.",
        "Décrypter les dilemmes de l’innovation pour y apporter des réponses stratégiques.",
        "Diffuser la culture d’innovation pour embarquer le collectif.",
      ]}
      modules={[
        { title: "Diagnostic & priorisation", desc: "État des lieux, indice de maturité d’innovation, cartographie des initiatives, arbitrages (impact, risques, ressources)." },
        { title: "Cadre stratégique", desc: "Les dilemmes de l’innovation et leurs implications stratégiques, gouvernance et critères de décision." },
        { title: "Méthodes & pratiques", desc: "La boîte à outil de l’innovateur : méthodes, méthodologie et rituels adaptés (cadences, critères d’entrée/sortie, revues, métriques d’apprentissage)." },
        { title: "Roadmap stratégique d’innovation", desc: "Synthèse : étapes, responsables, risques, KPI — pour passer des intentions aux résultats." },
      ]}
      formats={[
        { name: "Atelier équipe", lines: ["½ journée ~ 4h", "10–30 pers", "Diagnostics & quick wins"] },
        { name: "Séminaire direction", lines: ["1 journée", "8–15 pers", "Vision, arbitrages, feuille de route"] },
        { name: "Parcours", lines: ["4–8 semaines", "6–12 pers", "Mise en œuvre accompagnée"] },
      ]}
      useCases={[
        "Structurer un portefeuille d’initiatives et prioriser les projets d’innovations.",
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
