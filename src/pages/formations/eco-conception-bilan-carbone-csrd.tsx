import { Clock, Users, BookOpen, BarChart3, Layers, FileText, Rocket, Cpu, Link as LinkIcon, Blocks, Recycle } from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout";

const CAL_LINK = "https://calendar.app.google/MHJFvXizPczcPjnB7";

export default function EcoConceptionBilanCarboneCsrd() {
  return (
    <FormationLayout
      badge="Éco-conception & Reporting"
      title="Éco-conception, bilan carbone, CSRD"
      summary="Comprendre les référentiels, mesurer les impacts et structurer un reporting crédible. Une approche concrète pour intégrer l’éco-conception et anticiper la CSRD."
  formatList={['Masterclass', 'Atelier collectif', 'Format hybride', 'Séminaire']}
      meta={[
        { icon: Clock, text: "Discuter" },
        { icon: Users, text: "Managers, responsables RSE, chefs de projet, intrapreneurs" },
      ]}
      // Pourquoi
      whyText="Pression réglementaire (CSRD, loi AGEC, taxonomie…), attentes clients et concurrence internationale : mesurer, éviter, réduire et rendre compte n’est plus optionnel. Beaucoup d’équipes manquent de repères pour conduire un bilan carbone, lire une ACV ou structurer un reporting fiable. Ce parcours offre un cadre clair et des ateliers pratico-pratiques pour passer à l’action."
      pills={[
        { icon: BarChart3, label: "Mesurer & prioriser" },
        { icon: Layers, label: "Cycle de vie & ACV" },
      ]}
      // Objectifs
      objectives={[
        "S’approprier les principes d’éco-conception et la logique cycle de vie.",
        "Mener un premier diagnostic environnemental (bilan GES, bases ACV).",
        "Identifier risques & opportunités liés à l’éco-innovation et aux normes.",
        "Comprendre l’essentiel de la CSRD : périmètre, double matérialité, ESRS.",
        "Construire un plan d’action bas carbone et partager des résultats fiables.",
      ]}
      // Contenu & déroulé
      modules={[
        { title: "Panorama & repères", desc: "ODD, loi AGEC, taxonomie, CSRD, tendances de consommation responsable." },
        { title: "Éco-conception & cycle de vie", desc: "Bases ACV (ISO 14040/14044), roue de Brezet, cadre PEF : où agir concrètement." },
        { title: "Atelier pratique — mini bilan carbone", desc: "Base Carbone ADEME (tableur), hypothèses, facteurs d’émission, premiers résultats utilisables." },
        { title: "Éco-innovation & circularité", desc: "Intelligence collective, économie circulaire, modèles hybrides (réemploi, réparation, serviciel)." },
        { title: "CSRD en pratique", desc: "Double matérialité, architecture ESRS, jalons de reporting et gouvernance minimale." },
        { title: "Impacts & numérique responsable", desc: "Lier empreinte environnementale et usages numériques ; bonnes pratiques de sobriété numérique." },
        { title: "Feuille de route bas carbone", desc: "Priorisation (impact × faisabilité), indicateurs, planification 60–90 jours." },
        { title: "Zoom sectoriel", desc: "Adaptations par filière (industrie, services, mobilité, finance…)." },
      ]}
      // Formats & modalités
      formats={[
        { name: "Atelier découverte", lines: ["½ journée", "Acculturation + mini-atelier bilan GES"] },
        { name: "Séminaire + Ateliers", lines: ["1–2 jours", "Présentiel / distanciel", "Cas concrets des participants"] },
        { name: "Parcours", lines: ["2–6 semaines", "Accompagnement à la mise en œuvre"] },
      ]}
      // Exemples d’applications
      useCases={[
        "Comparer plusieurs designs produits via PEF pour réduire l’empreinte carbone.",
        "Structurer un premier reporting CSRD avec atelier de double matérialité.",
        "Réaliser un bilan GES simplifié pour cibler les postes les plus émissifs.",
        "Tester un modèle circulaire (abonnement, réemploi, réparation) pour allonger la durée de vie.",
      ]}
      // CTA manamind
      ctaTitle="Intégrons l’éco-conception dans vos décisions"
      ctaText="Discuter"
      ctaButton="Discuter"
      ctaHref={CAL_LINK}
    />
  );
}