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
      meta={[
        { icon: Clock, text: "1–3 jours (modulable)" },
        { icon: Users, text: "Atelier, séminaire ou parcours hybride" },
      ]}
      whyText="Projets multiples, dépendances techniques, équipes pluridisciplinaires : les approches “waterfall / cycle en V” atteignent vite leurs limites. Cette formation décrypte les clés d’un mindset agile et vous aide à co-concevoir un modèle de conduite de projet adapté au terrain industriel."
      pills={[
        { icon: Layers, label: "Complexité opérationnelle" },
        { icon: LineChart, label: "Efficacité & alignement" },
      ]}
      objectives={[
        "Décoder les fondamentaux agiles, lean et design : apports, périmètre, forces/limites.",
        "Choisir et adapter les méthodes pertinentes à son contexte industriel.",
        "Pratiquer les principes agiles via un atelier collaboratif transposable.",
        "Co-construire l’esquisse d’un modèle de projet agile : rythmes, rituels, rôles et pilotage.",
      ]}
      modules={[
        {
          title: "Séquence interactive • fondamentaux (~1h)",
          desc: "Limites du waterfall / cycle en V, manifeste agile, principes lean & design. Quiz collectif sur atouts/limites et champs d’application.",
        },
        {
          title: "Focus méthodes",
          desc: "Panorama Scrum / Kanban / Design Sprint et outils éprouvés. Quand les utiliser, comment les combiner en environnement technique.",
        },
        {
          title: "Applicabilité industrie",
          desc: "Discussion guidée « dans notre contexte, ça donne quoi ? ». Apports de la recherche et clés d’adaptation.",
        },
        {
          title: "Atelier collaboratif (~2h avec restitutions)",
          desc: "Travail en tables sur un cas, restitution en pitch (3 min / table) pour partager freins & opportunités.",
        },
        {
          title: "Co-construction du modèle agile “maison”",
          desc: "Synthèse des outputs pour esquisser principes, rituels, responsabilités et métriques utiles.",
        },
      ]}
      formats={[
        {
          name: "Séminaire intensif",
          lines: ["2 jours", "12–20 pers", "Cas pratiques + restitutions"],
        },
        {
          name: "Atelier découverte",
          lines: ["½ journée ~ 4h", "8–30 pers", "Acculturation + mini-atelier"],
        },
        {
          name: "Parcours / Accompagnement",
          lines: ["2–8 semaines", "6–12 pers", "Formation-action sur projet"],
        },
      ]}
      useCases={[
        "Diffuser une culture agile dans un département Études / Méthodes / Projets pour fluidifier la priorisation et les interactions.",
        "Transposer Scrum / Kanban / Lean à un processus industriel pour accélérer les cycles et intégrer les changements.",
        "Coordonner des programmes complexes multi-équipes : rituels courts, visuels de pilotage, synchronisation et arbitrages clairs.",
        "Mettre en place un modèle de gouvernance agile « maison ».",
      ]}
    />
  );
}