import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Target,
  CheckCircle2,
  LayoutList,
  Rocket,
  Globe,
  GitBranch,
  Layers3,
  BarChart3,
  Briefcase,
  Cpu,
  Link as LinkIcon,
  Blocks,
  BookOpen,
  Sparkles,
  Users,
  Calendar,
} from "lucide-react";

export default function StrategiesDeCroissance() {
  return (
    <div className="min-h-screen bg-background text-[#0C3D5E]">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 w-[34rem] h-[34rem] rounded-full bg-[#dfaf2c]/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#0C3D5E]/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold bg-white/80 backdrop-blur-sm"
            style={{ borderColor: "rgba(223,175,44,0.35)" }}
          >
            <Sparkles className="h-4 w-4 text-[#dfaf2c]" />
            Manacademy • Stratégie & développement
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Stratégies de croissance
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Explorer les voies de développement&nbsp;: diversification, internationalisation,
            croissance interne ou externe, alliances et partenariats.
          </p>
        </div>
      </section>

      {/* Pourquoi cette formation ? */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div
            className="rounded-2xl border bg-white p-6 md:p-8"
            style={{ borderColor: "rgba(12,61,94,0.08)" }}
          >
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-[#dfaf2c] shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi cette formation&nbsp;?</h2>
                <p className="text-[#0C3D5E]/80 leading-relaxed">
                  Les organisations hésitent souvent entre plusieurs options de développement.
                  Sans cadre, ces choix se traduisent par des décisions opportunistes et coûteuses.
                  Cette formation donne les outils pour comparer les voies de croissance et choisir
                  celles qui créent de la valeur durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs pédagogiques */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Objectifs pédagogiques</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Identifier et comparer les options de croissance (matrice Ansoff : pénétration, développement, diversification).",
              "Analyser les conditions de succès de l’internationalisation : drivers, sélection des marchés, modes d’entrée.",
              "Évaluer les modes de croissance : interne, externe, partenariats (M&A, JV, alliances).",
              "Mobiliser les outils de portfolio management : BCG, McKinsey, ADL, real options.",
              "Relier croissance et innovation de business model dans un contexte numérique.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#dfaf2c] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contenu proposé */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Contenu proposé</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <LayoutList className="h-5 w-5 text-[#dfaf2c]" />, text: "Introduction aux voies de croissance : diversification, internationalisation, innovation, partenariats." },
              { icon: <Layers3 className="h-5 w-5 text-[#dfaf2c]" />, text: "Matrice d’Ansoff : pénétration, développement produit/marché, diversification." },
              { icon: <Rocket className="h-5 w-5 text-[#dfaf2c]" />, text: "Diversification : synergies, économies d’échelle, risques de complexité." },
              { icon: <BarChart3 className="h-5 w-5 text-[#dfaf2c]" />, text: "3 tests de Porter pour évaluer une diversification : attractivité, coût d’entrée, effet better-off." },
              { icon: <GitBranch className="h-5 w-5 text-[#dfaf2c]" />, text: "Modes de croissance : interne, externe (M&A), JV, alliances stratégiques." },
              { icon: <Briefcase className="h-5 w-5 text-[#dfaf2c]" />, text: "Portfolio management : BCG, McKinsey, ADL, matrice des options réelles." },
              { icon: <Rocket className="h-5 w-5 text-[#dfaf2c]" />, text: "Atelier pratique : cartographier les options de croissance et construire un scénario." },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-4 leading-relaxed"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <div className="flex items-start gap-3">
                  {item.icon}
                  <p className="text-[#0C3D5E]/85">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas d’usage */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Cas d’usage</h3>
          <ul className="space-y-3">
            {[
              "Tester l’opportunité d’une diversification et arbitrer avec les 3 tests de Porter.",
              "Choisir un mode d’entrée pertinent pour l’internationalisation d’une BU.",
              "Repositionner un portefeuille d’activités avec la matrice BCG ou McKinsey.",
              "Explorer des partenariats stratégiques pour accélérer l’innovation.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-[#dfaf2c] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens numériques */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Liens — Révolution numérique & thématiques</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <Cpu className="h-5 w-5 text-[#0C3D5E]" />, text: "IA : nouveaux relais de croissance et modification des barrières à l’entrée." },
              { icon: <LinkIcon className="h-5 w-5 text-[#0C3D5E]" />, text: "Plateformes digitales : diversification et modèles écosystémiques." },
              { icon: <Blocks className="h-5 w-5 text-[#0C3D5E]" />, text: "Blockchain : alliances et confiance distribuée dans les partenariats." },
              { icon: <BookOpen className="h-5 w-5 text-[#0C3D5E]" />, text: "Business models digitaux : penser la croissance via freemium, abonnements, modèles multi-face." },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-4"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <div className="flex items-start gap-3">
                  {item.icon}
                  <p className="text-[#0C3D5E]/85">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repères utiles */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Repères utiles</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Diversification réussie : attractivité du secteur, coût d’entrée soutenable, synergies (better-off).",
              "Matrice BCG : Stars, Cash Cows, Dogs, Question Marks — allocation des ressources.",
              "Options réelles : investir par étapes pour limiter le risque (« fail fast, fail cheap »).",
            ].map((text, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-4 leading-relaxed"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <Sparkles className="h-5 w-5 text-[#dfaf2c] inline mr-2" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-5">
          <div
            className="rounded-2xl border bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{ borderColor: "rgba(12,61,94,0.08)" }}
          >
            <div className="grid sm:grid-cols-3 gap-6 w-full">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Format</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    1–2 jours • Séminaire & ateliers
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Managers, CODIR/COMEX, responsables stratégie/innovation
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Pré-requis</div>
                  <div className="text-[#0C3D5E]/75 text-sm">Aucun • Cas concrets encouragés</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                className="bg-[#dfaf2c] hover:bg-[#c79925] text-[#0C3D5E] font-semibold"
                asChild
              >
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20Strat%C3%A9gies%20de%20croissance">
                  Demander le programme
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
