import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Network,
  RefreshCw,
  Rocket,
  Recycle,
  BarChart3,
  Target,
  Gauge,
  Wallet,
  Globe,
  ClipboardList,
  Users,
  Clock,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const CAL_LINK =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ213VTwIZ6r0XmNarZHYKlh1gtHMEIpW0c0JAM7dCNTZxCkbJKTxIg6PV1qhMqr43FIJVpmZjsZ";

const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

export default function BusinessModelDesign() {
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
              Stratégie
            </Badge>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: manaDark }}
          >
            Business Model Design
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Prototyper, tester et faire évoluer votre modèle d’affaires à l’ère
            des plateformes, de l’IA et des nouvelles attentes sociétales.
            Objectif : maximiser la valeur créée et capturée, de façon pragmatique.
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
                <Globe className="h-4 w-4" />
                Pourquoi cette formation ?
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: manaDark }}>
                Passer d’un schéma figé à un modèle vivant
              </h2>
              <p className="text-muted-foreground">
                Face à la pression des nouveaux entrants, aux usages digitaux et
                aux impératifs de durabilité, les modèles historiques s’essoufflent.
                Cette formation installe un cadre de design, d’expérimentation et
                d’itération pour faire évoluer votre business model rapidement et
                de manière mesurable.
              </p>
            </div>

            <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
              {[
                { icon: Layers, title: "Clarifier", desc: "Décomposer votre BMC et repérer les tensions." },
                { icon: RefreshCw, title: "Prototyper", desc: "Imaginer des alternatives et les tester vite." },
                { icon: Wallet, title: "Capturer", desc: "Affiner prix, coûts et canaux pour créer du ROI." },
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
            Objectifs pédagogiques
          </h2>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid md:grid-cols-2 gap-5">
            {[
              "Comprendre les composants d’un business model (BMC) et leurs interactions.",
              "Diagnostiquer le modèle actuel et cibler les zones d’innovation.",
              "Prototyper des alternatives et les confronter au terrain rapidement.",
              "Intégrer la durabilité (RSE) et la transformation numérique dans la réflexion.",
              "Construire une feuille de route opérationnelle et mesurable.",
            ].map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: manaGold }} />
                <p className="text-muted-foreground">{obj}</p>
              </li>
            ))}
          </ul>
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
              Atelier expérientiel « cherry-picking » : on sélectionne les activités selon vos enjeux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ModuleCard
              icon={ClipboardList}
              title="Diagnostic express du modèle"
              bullets={[
                "Cartographier le BMC actuel (clients, valeur, canaux, revenus, coûts…).",
                "Identifier tensions & hypothèses clés.",
                "Prioriser : impact × faisabilité × délai.",
              ]}
              hint="~1h"
            />
            <ModuleCard
              icon={Network}
              title="Panorama des modèles émergents"
              bullets={[
                "Plateformes, abonnements, freemium, data-driven.",
                "Boucles d’effets de réseau & multi-faces.",
                "Cas d’économie circulaire & serviciel.",
              ]}
              hint="~45 min"
            />
            <ModuleCard
              icon={Rocket}
              title="Atelier prototypage"
              bullets={[
                "Concevoir 1–2 variantes de business model en 45 min.",
                "Storyboards « comment ça marche » côté client et interne.",
                "Critères Go/No-Go partagés.",
              ]}
              hint="~1h"
            />
            <ModuleCard
              icon={Target}
              title="Tests & validation rapide"
              bullets={[
                "Scénariser une mise en situation avec clients/utilisateurs internes.",
                "Collecter des preuves (apprentissage > opinions).",
                "Décider : itérer, pivoter, arrêter.",
              ]}
              hint="~1h"
            />
            <ModuleCard
              icon={Recycle}
              title="Intégrer la durabilité"
              bullets={[
                "Impacts RSE & attentes réglementaires/sociétales.",
                "Éco-conception & circularité : où jouer ?",
                "Aligner valeur d’usage, valeur captée et impact.",
              ]}
              hint="~45 min"
            />
            <ModuleCard
              icon={BarChart3}
              title="Feuille de route & métriques"
              bullets={[
                "Étapes 60–90 jours, ressources & risques.",
                "KPI d’atterrissage (usage, revenus, coûts, risques).",
                "Plan de passage à l’échelle.",
              ]}
              hint="~45 min"
            />
          </div>
        </div>
      </section>

      {/* REPÈRES / DATAS */}
      <section className="py-12" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: manaDark }}>
              Repères pour concevoir un modèle robuste
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FactCard
              icon={Gauge}
              title="Cycle itératif"
              text="Observer → formuler des hypothèses → prototyper → tester → décider. La vitesse d’apprentissage prime sur le plan parfait."
            />
            <FactCard
              icon={Wallet}
              title="Captation de valeur"
              text="Prix, coûts, mix revenus : penser bundle, abonnement, subventions croisées. Tester la disposition à payer tôt."
            />
            <FactCard
              icon={Globe}
              title="Plateformes & écosystèmes"
              text="Passer du pipeline à l’orchestration d’interactions : effets de réseau, multi-faces, stratégies d’amorçage."
            />
            <FactCard
              icon={Recycle}
              title="Durabilité intégrée"
              text="Créer de la valeur en limitant l’empreinte : circularité, sobriété, conformité — sans sacrifier la viabilité."
            />
          </div>
        </div>
      </section>

      {/* CAS D’USAGE */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: manaDark }}>
              Exemples de cas d’usage (anonymisés)
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Direction générale : réviser son modèle face à des plateformes concurrentes et repositionner la proposition de valeur.",
              "BU industrielle : intégrer économie circulaire & durabilité sans dégrader la rentabilité — scénarios & tests ciblés.",
              "B2B : tester une bascule vers l’abonnement avec un segment pilote et des indicateurs d’adoption.",
              "Startup : challenger la viabilité en itérant plusieurs versions du BMC avant levée de fonds.",
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
            <InfoCard icon={Clock} title="Durée" text="1–2 jours — Atelier / Workshop (présentiel ou distanciel)" />
            <InfoCard
              icon={Users}
              title="Public"
              text="Cadres, managers, intrapreneurs, directions de BU/innovation."
            />
            <InfoCard icon={BookOpen} title="Pré-requis" text="Aucun — venir avec un cas/projet à travailler." />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-manacademy/5 to-manacademy-light/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: manaDark }}>
            On challenge votre modèle actuel ?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Variante « 1 jour » possible, ou panier d’activités sur-mesure selon votre BU.
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
