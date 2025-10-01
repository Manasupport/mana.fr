import { Clock, Users, BookOpen, Target, Layers3, BrainCircuit, LayoutList, BarChart3, Rocket, Cpu, Network } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function DiagnosticStrategique() {
  return (
    <FormationLayout
      badge="Stratégie & décision"
      title="Diagnostic stratégique"
      summary="Maîtriser et appliquer les outils d’analyse (PESTEL, 5 forces, chaîne de valeur, VRIO/VRIN, SWOT, BCG) pour éclairer et aligner vos décisions."
      meta={[
        { icon: Clock, text: "1–2 jours (modulable)" },
        { icon: Users, text: "Managers, équipes stratégie/innovation, CODIR/COMEX" },
      ]}
      // Pourquoi
      whyText="Dans un environnement instable (économie, numérique, société), les décisions réactives coûtent cher. Cette formation fournit un cadre clair pour analyser l’externe et l’interne, structurer un diagnostic robuste et formuler des recommandations actionnables."
      pills={[
        { icon: Target, label: "Prioriser avec des preuves" },
        { icon: Layers3, label: "Relier interne & externe" },
      ]}
      // Objectifs (pas « pédagogiques »)
      objectives={[
        "Analyser l’environnement externe (PESTEL, 5+1 forces, groupes stratégiques).",
        "Identifier ressources, compétences et capacités distinctives (RBV, chaîne de valeur, VRIO/VRIN).",
        "Réaliser une synthèse SWOT utile à la décision.",
        "Formuler des recommandations étayées et priorisées.",
        "Relier diagnostic et choix de business model / portefeuille d’activités.",
      ]}
      // Contenu & déroulé
      modules={[
        { title: "Introduction & cadrage", desc: "Pourquoi diagnostiquer avant d’agir ? Périmètre et livrables attendus." },
        { title: "Externe — PESTEL", desc: "Facteurs macro, signaux faibles et impacts pour votre secteur." },
        { title: "Externe — 5+1 forces & groupes stratégiques", desc: "Cartes de jeu concurrentielles et dynamiques sectorielles." },
        { title: "Interne — chaîne de valeur & RBV", desc: "Ressources, compétences distinctives et liens avec la performance." },
        { title: "Interne — VRIO/VRIN", desc: "Tester la durabilité des avantages concurrentiels." },
        { title: "Synthèse — SWOT", desc: "Options, scénarios et choix prioritaires basés sur les faits." },
        { title: "Portefeuille — BCG (selon contexte)", desc: "Arbitrages d’investissement et trajectoires." },
        { title: "Ateliers d’application", desc: "Travail sur cas réels des participants, cadrage des next steps." },
      ]}
      // Formats & modalités (adapté aux infos pratiques)
      formats={[
        { name: "Format", lines: ["1–2 jours", "Séminaire & atelier pratique"] },
        { name: "Public", lines: ["Managers", "Stratégie/Innovation", "CODIR/COMEX"] },
        { name: "Pré-requis", lines: ["Aucun", "Cas concrets encouragés"] },
      ]}
      // Cas d’usage
      useCases={[
        "Identifier des compétences distinctives et ajuster le positionnement face à de nouveaux entrants.",
        "Anticiper un virage réglementaire via PESTEL & Porter, puis traduire en clés de succès.",
        "Croiser VRIO et SWOT pour prioriser un plan stratégique à 12–24 mois.",
        "Confronter le diagnostic aux business models émergents (plateformes, IA, blockchain) et orienter l’innovation.",
      ]}
      // CTA manamind
      ctaTitle="On aligne vos décisions sur un diagnostic solide"
      ctaText="Atelier modulable, livrables actionnables, cap sur l’impact."
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}