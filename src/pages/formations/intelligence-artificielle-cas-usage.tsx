import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Brain,
  Sparkles,
  Wrench,
  Shield,
  BarChart3,
  Workflow,
  Rocket,
  Target,
  Leaf,
  Cpu,
  Network,
  Layers,
  ShieldCheck,
  Gauge,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";

const CAL_LINK =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ213VTwIZ6r0XmNarZHYKlh1gtHMEIpW0c0JAM7dCNTZxCkbJKTxIg6PV1qhMqr43FIJVpmZjsZ";

const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

export default function IntelligenceArtificielleCasUsage() {
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
            Intelligence artificielle & cas d’usage
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Acculturation à l’IA, prise en main d’outils IA/LLM et ateliers
            d’idéation métiers, avec une attention aux impacts, à l’éthique et à
            l’empreinte environnementale. Objectif : passer des idées aux
            résultats mesurables.
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
                <Brain className="h-4 w-4" />
                Pourquoi cette formation ?
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: manaDark }}>
                De l’acculturation aux cas d’usage concrets
              </h2>
              <p className="text-muted-foreground">
                Dans beaucoup d’équipes, l’IA intrigue autant qu’elle questionne :
                quelles priorités, quelles méthodes, quelle gouvernance ? Ici, on
                installe un cadre commun, on outille les métiers et on fait
                atterrir des POC utiles, mesurables et responsables.
              </p>
            </div>

            <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
              {[
                { icon: Sparkles, title: "Acculturer", desc: "Comprendre les familles d’IA et ce qu’elles permettent." },
                { icon: Wrench, title: "Pratiquer", desc: "Manipuler des outils IA/LLM et prototyper rapidement." },
                { icon: Shield, title: "Gouverner", desc: "Éthique, risques, conformité & empreinte environnementale." },
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-5"
                  style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
                >
                  <b.icon className="h-6 w-6 mb-3" style={{ color: manaDark }} />
                  <div className="font-semibold mb-1" style={{ color: manaDark }}>
                    {b.title}
                  </div>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="py-12" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: manaDark }}>
            Objectifs d’apprentissage
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Démystifier l’IA (ML, deep, IA générative) et ses domaines d’application par métier.",
              "Identifier, prioriser et scénariser des cas d’usage alignés business & risque.",
              "Prendre en main des outils IA/LLM et prototyper des solutions simples.",
              "Définir des indicateurs d’apprentissage et d’impact (au-delà de la seule production).",
              "Mettre en place des règles de gouvernance : sécurité, conformité, éthique.",
              "Sensibiliser à l’empreinte environnementale et aux bonnes pratiques de sobriété.",
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: manaGold }} />
                <p className="text-muted-foreground">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARCOURS & MODULES */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: manaDark }}>
              Parcours modulable (1–2 jours)
            </h2>
            <p className="text-muted-foreground mt-2">
              Séminaire + ateliers. On « cherry-pick » les activités en fonction de vos enjeux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ModuleCard
              icon={Layers}
              title="Fondamentaux & cadrage"
              bullets={[
                "Panorama IA : ML, deep, IA générative & limites actuelles.",
                "Cartographie express des cas d’usage par métier.",
                "Priorisation : impact × faisabilité × risques.",
              ]}
              hint="~1h"
            />
            <ModuleCard
              icon={Workflow}
              title="Idéation cas d’usage"
              bullets={[
                "Atelier problème → opportunité → hypothèses.",
                "Matrice de décision & critères Go/No-Go.",
                "Storyboards de parcours utilisateur.",
              ]}
              hint="~1h"
            />
            <ModuleCard
              icon={Wrench}
              title="Hands-on outils IA/LLM"
              bullets={[
                "Prompting responsable & patterns réutilisables.",
                "Automatisations simples (sans code/low-code).",
                "Prototype rapide & protocole de test d’usage.",
              ]}
              hint="~1h30"
            />
            <ModuleCard
              icon={Shield}
              title="Gouvernance & éthique"
              bullets={[
                "Risques, biais, sécurité & conformité.",
                "Politique d’usage & règles d’or internes.",
                "Sobriété & empreinte environnementale.",
              ]}
              hint="~45 min"
            />
            <ModuleCard
              icon={BarChart3}
              title="Mesure & atterrissage"
              bullets={[
                "KPI d’apprentissage & d’impact.",
                "Plan 60–90 jours : qui fait quoi, quand.",
                "Pitch d’atterrissage (5 slides).",
              ]}
              hint="~45 min"
            />
            <ModuleCard
              icon={Rocket}
              title="Coaching cas réel (option)"
              bullets={[
                "Accompagnement court sur 1 cas prioritaire.",
                "Itération & revue des preuves de valeur.",
                "Préparation industrialisation / passage à l’échelle.",
              ]}
              hint="Option"
            />
          </div>
        </div>
      </section>

      {/* “DATAS” & CONCEPTS CLÉS */}
      <section className="py-12" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: manaDark }}>
              Repères pour décider vite et bien
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FactCard
              icon={Cpu}
              title="IA = amplificateur humain"
              text="La valeur vient moins de la techno que de l’usage : gouvernance, compétences et cas d’usage pertinents débloquent le ROI."
            />
            <FactCard
              icon={Network}
              title="Plateformes & effets de réseau"
              text="La valeur passe des pipelines aux écosystèmes : orchestrer les interactions compte autant que produire."
            />
            <FactCard
              icon={Gauge}
              title="Mesurer l’apprentissage"
              text="Des KPI métier + des KPI d’expérimentation (preuves, temps gagné, qualité, risques réduits) pour piloter l’atterrissage."
            />
            <FactCard
              icon={Leaf}
              title="Sobriété & empreinte"
              text="Choisir les bons modèles et les bons usages pour limiter l’impact environnemental sans sacrifier l’efficacité."
            />
          </div>
        </div>
      </section>

      {/* CAS D’USAGE */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: manaDark }}>
              Exemples de cas d’usage
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Optimiser un délai critique : arbitrer entre amélioration incrémentale et nouveau service, tester l’usage, décider sur preuves.",
              "Lancer une offre data/IA : clarifier les usages cibles, prototyper un parcours, co-définir les critères Go/No-Go avec Finance/Legal.",
              "Industrialiser les POC : rituels et indicateurs standardisés pour accélérer le passage en production de 2–3 initiatives.",
              "Ouvrir l’écosystème : règles « ouvert/fermé », partenaires clés et feuille de route d’expérimentations multi-acteurs.",
            ].map((use, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border bg-white"
                style={{ borderColor: `${manaGold}33` }}
              >
                <Target className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: manaGold }} />
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
            <InfoCard icon={Clock} title="Durée" text="1–2 jours — Séminaire + ateliers (présentiel ou distanciel)" />
            <InfoCard
              icon={Users}
              title="Public"
              text="Managers, chefs de produit/projet, intrapreneurs, fonctions support."
            />
            <InfoCard icon={BookOpen} title="Pré-requis" text="Aucun — cas concrets bienvenus." />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-manacademy/5 to-manacademy-light/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: manaDark }}>
            On adapte à vos métiers et contraintes ?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Variante « 1 jour » ultra-condensée possible, ou panier d’activités ciblé pour une BU spécifique.
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

/* ---------------- Composants internes ---------------- */

function ModuleCard({
  icon: Icon,
  title,
  bullets,
  hint,
}: {
  icon: React.ComponentType<any>;
  title: string;
  bullets: string[];
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: `${manaGold}33` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color: manaDark }} />
          <h3 className="text-lg font-semibold" style={{ color: manaDark }}>
            {title}
          </h3>
        </div>
        {hint && (
          <span className="text-xs px-2 py-1 rounded-full border" style={{ borderColor: `${manaGold}55`, color: manaDark }}>
            {hint}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="text-muted-foreground">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<any>;
  title: string;
  text: string;
}) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: `${manaGold}33`, backgroundColor: "#fff" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5" style={{ color: manaDark }} />
        <div className="font-semibold" style={{ color: manaDark }}>
          {title}
        </div>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<any>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: `${manaGold}33`, backgroundColor: "#fff" }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: manaDark }}>
        <Icon className="h-5 w-5" />
        <span className="font-semibold">{title}</span>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
