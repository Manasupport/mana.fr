import { Clock, Users, Cpu, Network, Sparkles, Wrench, Shield, ShieldCheck, Layers, Workflow, BarChart3, Rocket, Gauge, Leaf } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function IntelligenceArtificielle() {
  return (
    <FormationLayout
      badge="IA • Digital"
      title="Acculturation à l’IA (plateformes & blockchain)"
      summary="Acculturation à l’IA, prise en main d’outils IA/LLM et ateliers d’idéation métiers, avec une attention aux impacts, à l’éthique et à l’empreinte environnementale numérique. Objectif : passer des idées aux résultats mesurables."
      meta={[
        { icon: Clock, text: "1 jour (modulable ½ à 1j)" },
        { icon: Users, text: "Décideurs, métiers, opérations, IT" },
      ]}
      whyText="L’IA et les plateformes transforment usages et modèles. On installe un cadre commun, on outille les métiers et on fait atterrir des POC utiles, mesurables et responsables."
      pills={[
        { icon: Cpu, label: "IA générative & LLM" },
        { icon: Network, label: "Plateformes & blockchain" },
      ]}
      objectives={[
        "Acculturer aux usages de l’IA générative et des innovations digitales.",
        "Prendre en main des outils IA/LLM et cadrer leurs périmètres d’utilisation.",
        "Identifier et prioriser des cas d’usage métiers à impact.",
        "Sensibiliser aux impacts, à l’éthique et à l’empreinte environnementale numérique.",
      ]}
      modules={[
        { title: "Fondamentaux & cadrage", desc: "Panorama IA (ML, deep, IA générative) & limites actuelles. Cartographie express des cas d’usage par métier. Priorisation impact × faisabilité × risques." },
        { title: "Idéation cas d’usage", desc: "Atelier problème → opportunité → hypothèses. Matrice de décision & critères Go/No-Go. Storyboards de parcours utilisateur." },
        { title: "Prise en main d’outils IA/LLM", desc: "Prompting responsable & patterns réutilisables. Automatisations (no/low-code). Prototype rapide & protocole de test." },
        { title: "Impacts, éthique & empreinte environnementale numérique", desc: "Risques, biais, sécurité & conformité. Sobriété d’usage et choix techniques responsables." },
        { title: "Plan d’atterrissage", desc: "Roadmap 30–60–90 jours : responsabilités, critères de succès, passage à l’échelle." },
      ]}
      formats={[
        { name: "Découverte", lines: ["½ journée", "jusqu’à 30 pers", "Conf + démos + mini-atelier"] },
        { name: "Immersion", lines: ["1 journée", "15–25 pers", "Idéation + outils + cadrage POC"] },
        { name: "Parcours", lines: ["2–6 semaines", "Équipe cœur", "Pilote outillé + gouvernance légère"] },
      ]}
      useCases={[
        "Acculturer des équipes métiers à l’IA générative sur des cas concrets.",
        "Définir une charte d’usage et des garde-fous (sécurité, conformité, éthique).",
        "Cadrer un POC IA prêt à mesurer l’impact et la valeur.",
        "Standardiser les rituels & indicateurs pour industrialiser 2–3 POC.",
      ]}
      // CTA cohérent Manamind
      ctaTitle="Passez des idées aux résultats mesurables"
      ctaText="On priorise vos cas d’usage, on outille vos équipes et on cadre une trajectoire responsable."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}