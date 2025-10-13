import {
  Clock,
  Users,
  Layers,
  LineChart,
} from "lucide-react";
import FormationLayout from "@/pages/formations/FormationLayout"; // ton layout réplicable

const CAL_LINK =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ213VTwIZ6r0XmNarZHYKlh1gtHMEIpW0c0JAM7dCNTZxCkbJKTxIg6PV1qhMqr43FIJVpmZjsZ";

export default function AgiliteInnovation() {
  return (
    <FormationLayout
      calendarHref={CAL_LINK}
      badge="Innovation • Industrie"
      title="Agilité & innovation en contexte industriel"
      summary="Passer d’un pilotage rigide à un mode d’action agile, adapté aux réalités du terrain industriel : rythmes, rituels, responsabilités et outils qui fluidifient la collaboration et accélèrent la valeur."
      formatList={['Masterclass', 'Atelier collectif', 'Format hybride', 'Séminaire']}
      meta={[
        { icon: Clock, text: "Séquence interactive • fondamentaux" },
        { icon: Users, text: "Directeur de programme, Directeur innovation, Chef de projet" },
      ]}
  whyText="Passer d’un pilotage rigide à un mode d’action agile, adapté aux réalités du terrain industriel : rythmes, rituels, responsabilités et outils qui fluidifient la collaboration et accélèrent la valeur."
      pills={[
        { icon: Layers, label: "Complexité opérationnelle" },
        { icon: LineChart, label: "Efficacité & alignement" },
      ]}
      objectives={[
        "Comprendre les fondamentaux agiles et leur applicabilité en industrie.",
        "Expérimenter des rituels et outils pour fluidifier la collaboration.",
        "Co-construire un modèle de gouvernance agile « maison » adapté à vos équipes.",
        "Produire des artefacts opérationnels (rituels, responsabilités, métriques).",
      ]}
      modules={[
        {
          title: "Séquence interactive • fondamentaux",
          desc: "Introduction aux fondamentaux : manifeste agile, principes lean & design, limites des approches rigides. Discussion interactive et diagnostic de maturité.",
        },
        {
          title: "Atelier collaboratif",
          desc: "Travail en équipes sur un cas réel, restitution en pitch pour partager freins et opportunités. Co-construction du modèle agile 'maison'.",
        },
        {
          title: "Co-construction du modèle agile « maison »",
          desc: "Synthèse des outputs : principes, rituels, responsabilités et métriques utiles dans votre contexte industriel.",
        },
        {
          title: "Synthèse & plan d'action",
          desc: "Synthèse des outputs et proposition d'une roadmap pour implémenter la gouvernance agile adaptée (rituels, rôles, métriques).",
        },
      ]}
      formats={[
        {
          name: "Atelier découverte",
          lines: ["½ journée ~ 4h", "8–30 pers", "Acculturation + mini-atelier"],
        },
        {
          name: "Séminaire intensif",
          lines: ["2 jours", "12–20 pers", "Cas pratiques + restitutions"],
        },
        {
          name: "Parcours / Accompagnement",
          lines: ["Atelier, séminaire ou parcours hybride", "6–12 pers", "Formation-action sur projet"],
        },
      ]}
      useCases={[
        "Diffuser une culture agile dans un département Études / Méthodes / Projets pour fluidifier la priorisation et les interactions.",
        "Transposer Scrum / Kanban / Lean à un processus industriel pour accélérer les cycles et intégrer les changements.",
        "Coordonner des programmes complexes multi-équipes : rituels courts, visuels de pilotage, synchronisation et arbitrages clairs.",
        "Mettre en place un modèle de gouvernance agile « maison » — définir rituels, rôles et espaces d’autonomie.",
      ]}
    />
  );
}
