import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  LineChart,
  MessageSquare,
  Users,
  Wrench
} from "lucide-react";

const CAL_LINK =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ213VTwIZ6r0XmNarZHYKlh1gtHMEIpW0c0JAM7dCNTZxCkbJKTxIg6PV1qhMqr43FIJVpmZjsZ";

// DA Manacademy
const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

export default function AgiliteInnovation() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Fil d’ariane / retour */}
      <section className="pt-24 pb-6 border-b">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            to="/manacademy"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux formations
          </Link>
        </div>
      </section>

      {/* HERO */}
      <section className="py-12 bg-gradient-to-br from-manacademy-light via-white to-manacademy-light/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Badge
                variant="secondary"
                className="border"
                style={{
                  backgroundColor: `${manaGold}14`,
                  borderColor: `${manaGold}33`,
                  color: manaDark,
                }}
              >
                Innovation • Industrie
              </Badge>
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ color: manaDark }}
            >
              Agilité & innovation en contexte industriel
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Passer d’un pilotage rigide à un mode d’action agile, adapté aux
              réalités du terrain industriel : rythmes, rituels, responsabilités
              et outils qui fluidifient la collaboration et accélèrent la
              valeur.
            </p>

            {/* meta */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <span className="inline-flex items-center">
                <Clock className="h-4 w-4 mr-2" style={{ color: manaGold }} />
                1–3 jours (dispositif modulable)
              </span>
              <span className="inline-flex items-center">
                <Users className="h-4 w-4 mr-2" style={{ color: manaGold }} />
                Atelier, séminaire ou parcours hybride
              </span>
            </div>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-xl"
                style={{ backgroundColor: manaGold, color: "#fff" }}
              >
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                  Échanger sur votre contexte
                  <Calendar className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLÉMATIQUE */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-[1fr,280px] gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: manaDark }}>
                Le défi
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Projets multiples, dépendances techniques, équipes
                pluridisciplinaires : les approches “waterfall / cycle en V”
                atteignent vite leurs limites (délais, rigidités, faible
                capacité d’adaptation). Cette formation installe un
                <span className="font-medium"> mindset agile</span> et vous
                aide à <span className="font-medium">co-concevoir</span> un
                modèle de conduite de projet <span className="font-medium">hors
                logiciel</span> adapté au terrain industriel.
              </p>
            </div>

            {/* mini card highlights */}
            <div className="grid gap-3">
              {[
                { icon: Layers, label: "Complexité opérationnelle" },
                { icon: Wrench, label: "Contexte industriel réel" },
                { icon: LineChart, label: "Efficacité & alignement" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-3 flex items-center gap-3"
                  style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
                >
                  <b.icon className="h-5 w-5" style={{ color: manaGold }} />
                  <span className="text-sm" style={{ color: manaDark }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="py-14" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: manaDark }}>
            Objectifs pédagogiques
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Décoder les fondamentaux agiles, lean et design : apports, périmètre, forces/limites.",
              "Choisir et adapter les méthodes pertinentes à son contexte industriel.",
              "Pratiquer les principes agiles via un atelier collaboratif cadré et transposable.",
              "Co-construire l’esquisse d’un modèle de projet agile : rythmes, rituels, rôles et pilotage.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white border p-4"
                style={{ borderColor: `${manaGold}33` }}
              >
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: manaGold }} />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENU / DISPOSITIF */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: manaDark }}>
            Contenu & déroulé (exemple modulable)
          </h2>

          <div className="space-y-5">
            {[
              {
                title: "Séquence interactive • fondamentaux (~1h)",
                desc:
                  "Limites du waterfall / cycle en V, manifeste agile, principes lean & design. Quiz collectif sur atouts/limites et champs d’application.",
              },
              {
                title: "Focus méthodes",
                desc:
                  "Panorama Scrum / Kanban / Design Sprint et outils éprouvés. Quand les utiliser, comment les combiner en environnement technique.",
              },
              {
                title: "Applicabilité industrie",
                desc:
                  "Discussion guidée « dans notre contexte, ça donne quoi ? » (hors dev logiciel). Apports de la recherche et clés d’adaptation.",
              },
              {
                title: "Atelier collaboratif (~2h avec restitutions)",
                desc:
                  "Travail en tables sur un cas réel (à préciser), 1 animateur pour 2 tables. Restitution en pitch (3 min / table) pour partager freins & opportunités.",
              },
              {
                title: "Co-construction du modèle agile “maison”",
                desc:
                  "Synthèse des outputs pour esquisser principes, rituels de pilotage, responsabilités et métriques utiles.",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="rounded-xl border p-5"
                style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold" style={{ color: manaDark }}>
                    {m.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="py-14" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: manaDark }}>
            Formats & modalités
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
                lines: ["2–8 semaines", "6–12 pers", "Formation-action sur projet réel"],
              },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-xl border p-6 text-center bg-white"
                style={{ borderColor: `${manaGold}33` }}
              >
                <h3 className="font-semibold text-lg mb-2" style={{ color: manaDark }}>
                  {f.name}
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  {f.lines.map((l, k) => (
                    <div key={k}>{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAS D’USAGE */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: manaDark }}>
            Exemples d’applications
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Diffuser une culture agile dans un département Études / Méthodes / Projets pour fluidifier la priorisation et les interactions.",
              "Transposer Scrum / Kanban / Lean à un processus industriel (hors logiciel) pour accélérer les cycles et intégrer les changements.",
              "Coordonner des programmes complexes multi-équipes : rituels courts, visuels de pilotage, synchronisation et arbitrages clairs.",
              "Mettre en place un modèle de gouvernance agile « maison » : rôles, cadences, jalons, boucles d’amélioration.",
            ].map((u, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 flex items-start gap-3"
                style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
              >
                <MessageSquare className="h-5 w-5 mt-0.5" style={{ color: manaGold }} />
                <p className="text-muted-foreground">{u}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-manacademy/5 to-manacademy-light/20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: manaDark }}>
            On conçoit le dispositif qui vous ressemble
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Partagez vos enjeux : nous adaptons contenus, cas et rituels à vos
            équipes et à vos contraintes terrain.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl"
            style={{ backgroundColor: manaGold, color: "#fff" }}
          >
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              Planifier un échange
              <Calendar className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
