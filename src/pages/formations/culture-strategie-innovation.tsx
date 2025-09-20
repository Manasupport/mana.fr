import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ArrowLeft,
  CheckCircle,
  Layers,
  Workflow,
  Target,
  Sparkles,
  Compass,
  BookOpen,
  Users,
  Clock,
  Lightbulb,
} from "lucide-react";

const CAL_LINK =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ213VTwIZ6r0XmNarZHYKlh1gtHMEIpW0c0JAM7dCNTZxCkbJKTxIg6PV1qhMqr43FIJVpmZjsZ";

const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

export default function CultureStrategieInnovation() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <section className="pt-24 pb-6 border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-5">
            <Badge
              variant="secondary"
              className="border"
              style={{
                backgroundColor: `${manaGold}14`,
                borderColor: `${manaGold}33`,
                color: manaDark,
              }}
            >
              Innovation
            </Badge>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: manaDark }}
          >
            Culture & stratégie d’innovation
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Clarifier ce que recouvre “l’innovation”, choisir les bons leviers,
            et passer de l’idée à l’usage… puis au business model. Un programme
            pour aligner, prioriser et embarquer durablement vos équipes.
          </p>

          <div className="mt-8">
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
        </div>
      </section>

      {/* POURQUOI */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{ backgroundColor: `${manaGold}1A`, color: manaDark }}
              >
                <Lightbulb className="h-4 w-4" />
                Pourquoi cette formation ?
              </div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: manaDark }}
              >
                Sortir du flou, accélérer l’atterrissage
              </h2>
              <p className="text-muted-foreground">
                Dans beaucoup d’organisations, l’innovation devient un
                fourre-tout : beaucoup d’initiatives, peu de priorisation, des
                POC qui peinent à aboutir. Ici, on met de la clarté (types,
                arbitrages, rôles), on adopte une posture d’intrapreneur et on
                outille le passage de l’idée à l’usage… puis au modèle
                économique.
              </p>
            </div>

            <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Layers,
                  title: "Clarifier",
                  desc: "Types d’innovation et impacts organisationnels.",
                },
                {
                  icon: Workflow,
                  title: "Structurer",
                  desc: "Des rituels et critères communs pour prioriser.",
                },
                {
                  icon: Target,
                  title: "Atterrir",
                  desc: "De l’idée aux usages, puis au business model.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: `${manaGold}33`,
                    backgroundColor: `${manaGold}07`,
                  }}
                >
                  <item.icon
                    className="h-6 w-6 mb-3"
                    style={{ color: manaDark }}
                  />
                  <div
                    className="font-semibold mb-1"
                    style={{ color: manaDark }}
                  >
                    {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="py-12" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: manaDark }}
          >
            Objectifs d’apprentissage
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Comprendre les grands types d’innovation (produit, service, usage, business model) et leurs effets.",
              "Lire les dilemmes clés (market-pull/techno-push, incrémentale/radicale, ouverte/fermée…) pour décider.",
              "Évaluer la maturité d’innovation de l’équipe et cibler des leviers concrets de progression.",
              "Adopter une posture d’intrapreneur : tester vite, partager, sécuriser l’atterrissage.",
              "Choisir et combiner les méthodes adaptées (design thinking, lean startup, C-K, frugale, éco-conception…).",
              "Savoir raconter une initiative (problème → apprentissages → next steps) pour embarquer.",
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                  style={{ color: manaGold }}
                />
                <p className="text-muted-foreground">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENU & DISPOSITIF */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ color: manaDark }}
            >
              Contenu & dispositif (1–2 jours, modulable)
            </h2>
            <p className="text-muted-foreground mt-2">
              Programme personnalisable — on pioche dans les activités selon vos
              enjeux et vos délais.
            </p>
          </div>

          {/* 4 blocs principaux */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cadre & alignement */}
            <CardBlock
              title="Cadre & alignement"
              points={[
                "Cartographie express des types d’innovation vs enjeux de l’organisation.",
                "Lecture guidée des 8 dilemmes de l’innovation appliqués à vos cas.",
              ]}
            />
            {/* Diagnostic & priorisation */}
            <CardBlock
              title="Diagnostic & priorisation"
              points={[
                "Mini indice de maturité (équipe/BU) et lecture des écarts.",
                "Atelier de priorisation : impact × faisabilité × délai.",
              ]}
            />
            {/* Méthodes & pratiques */}
            <CardBlock
              title="Méthodes & pratiques"
              icon={BookOpen}
              points={[
                "Sprint « choisir la bonne méthode » selon chaque problématique.",
                "Micro-ateliers à la carte : problème-solution fit (entretiens d’usage, JTBD, hypothèses), prototype rapide (storyboard/maquette papier/test d’usage), mesure (KPIs d’apprentissage & d’impact), Go/No-Go (critères, risques, compliance), éco-conception/frugale (principes & check-list).",
              ]}
            />
            {/* Diffuser & pérenniser */}
            <CardBlock
              title="Diffuser & pérenniser"
              icon={Compass}
              points={[
                "Rituel d’intrapreneuriat : cadence d’expérimentation et partage inter-équipes.",
                "Narratif d’innovation : structurer un pitch court « problème → apprentissages → décision ».",
              ]}
            />
          </div>
        </div>
      </section>

      {/* LIVRABLES */}
      <section className="py-12" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ color: manaDark }}
            >
              Livrables concrets
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Innovation 360°",
                desc: "Carte claire de votre contexte et des priorités.",
              },
              {
                title: "Maturité & plan d’action",
                desc: "Score de maturité + quick wins court terme.",
              },
              {
                title: "Fiches-méthodes",
                desc: "Prêtes à l’emploi pour vos 2–3 prochains sprints.",
              },
            ].map((l, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 text-center"
                style={{
                  borderColor: `${manaGold}33`,
                  backgroundColor: `${manaGold}07`,
                }}
              >
                <Sparkles
                  className="h-6 w-6 mx-auto mb-3"
                  style={{ color: manaDark }}
                />
                <div
                  className="font-semibold mb-1"
                  style={{ color: manaDark }}
                >
                  {l.title}
                </div>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAS D’USAGE */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ color: manaDark }}
            >
              Exemples de cas d’usage (anonymisés)
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Une équipe Ops doit réduire un délai critique : choix entre optimisation incrémentale vs nouveau service ; dilemmes + test d’usage rapide pour décider.",
              "Une BU hésite à lancer une offre data : travail usages réels, prototypage de parcours, critères Go/No-Go co-construits avec Finance & Compliance.",
              "Un réseau d’agences veut harmoniser les POC : rituel d’apprentissage (KPIs communs, trame de restitution) → 2 initiatives industrialisées plus vite.",
              "Une équipe R&D cherche des partenaires : cadrage « ouvert/fermé », règles de collaboration et feuille de route d’expérimentations.",
            ].map((use, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border bg-white"
                style={{ borderColor: `${manaGold}33` }}
              >
                <Target
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                  style={{ color: manaGold }}
                />
                <p className="text-muted-foreground">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT / PUBLIC */}
      <section className="py-12" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border p-6" style={{ borderColor: `${manaGold}33`, backgroundColor: "#fff" }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: manaDark }}>
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Durée</span>
              </div>
              <p className="text-muted-foreground">1–2 jours (séminaire + ateliers, présentiel ou distanciel)</p>
            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: `${manaGold}33`, backgroundColor: "#fff" }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: manaDark }}>
                <Users className="h-5 w-5" />
                <span className="font-semibold">Public</span>
              </div>
              <p className="text-muted-foreground">
                Managers, chefs de produit/projet, fonctions support, intrapreneurs.
              </p>
            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: `${manaGold}33`, backgroundColor: "#fff" }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: manaDark }}>
                <BookOpen className="h-5 w-5" />
                <span className="font-semibold">Pré-requis</span>
              </div>
              <p className="text-muted-foreground">Aucun — curiosité et cas concrets bienvenus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-manacademy/5 to-manacademy-light/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: manaDark }}>
            On personnalise pour votre contexte ?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            On adapte titres, badges et micro-copies à votre charte — et on peut
            vous proposer une variante « 1 jour » ultra-condensée.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl"
            style={{ backgroundColor: manaGold, color: "#fff" }}
          >
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              Échanger avec nos experts
              <Calendar className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ------- Petit composant interne pour les blocs de contenu ------- */
function CardBlock({
  title,
  points,
  icon: Icon = Sparkles,
}: {
  title: string;
  points: string[];
  icon?: React.ComponentType<any>;
}) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: `${manaGold}33` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5" style={{ color: manaDark }} />
        <h3 className="text-lg font-semibold" style={{ color: manaDark }}>
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="text-muted-foreground">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
