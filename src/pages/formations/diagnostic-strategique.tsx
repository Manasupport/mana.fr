import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Target,
  CheckCircle2,
  LayoutList,
  Rocket,
  Cpu,
  Link as LinkIcon,
  Blocks,
  BarChart3,
  Layers3,
  BrainCircuit,
  Calendar,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function DiagnosticStrategique() {
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
            Manacademy • Stratégie & décision
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Diagnostic stratégique
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Maîtriser les outils d’analyse (PESTEL, 5 forces, chaîne de valeur, VRIO/VRIN, SWOT, BCG)
            pour éclairer et aligner vos décisions.
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
                  Dans un environnement instable (économie, numérique, société), les décisions réactives coûtent cher.
                  Cette formation fournit un cadre clair pour analyser l’externe et l’interne, structurer un
                  diagnostic robuste et formuler des recommandations stratégiques actionnables.
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
              "Analyser l’environnement externe : PESTEL, 5+1 forces, groupes stratégiques.",
              "Identifier ressources, compétences et capacités distinctives (RBV, chaîne de valeur, VRIO).",
              "Réaliser une synthèse SWOT utile à la décision.",
              "Formuler des recommandations étayées et priorisées.",
              "Relier diagnostic et choix de business model / portefeuille d’activités.",
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
              { icon: <LayoutList className="h-5 w-5 text-[#dfaf2c]" />, text: "Introduction : pourquoi diagnostiquer avant d’agir ? Périmètre & livrables attendus." },
              { icon: <BarChart3 className="h-5 w-5 text-[#dfaf2c]" />, text: "Externe — PESTEL : facteurs macro & signaux faibles pour votre secteur." },
              { icon: <Layers3 className="h-5 w-5 text-[#dfaf2c]" />, text: "Externe — 5+1 forces de Porter & groupes stratégiques : cartes de jeu concurrentielles." },
              { icon: <BrainCircuit className="h-5 w-5 text-[#dfaf2c]" />, text: "Interne — chaîne de valeur, ressources & compétences distinctives (RBV)." },
              { icon: <BrainCircuit className="h-5 w-5 text-[#dfaf2c]" />, text: "Interne — VRIO/VRIN : tester la durabilité des avantages." },
              { icon: <LayoutList className="h-5 w-5 text-[#dfaf2c]" />, text: "Synthèse SWOT : options, scénarios et choix prioritaires." },
              { icon: <BarChart3 className="h-5 w-5 text-[#dfaf2c]" />, text: "Portefeuille & BCG (selon contexte) : arbitrages d’investissement & trajectoires." },
              { icon: <Rocket className="h-5 w-5 text-[#dfaf2c]" />, text: "Ateliers : application aux cas concrets des participants, cadrage des next steps." },
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
              "Identifier des compétences distinctives et ajuster le positionnement face à de nouveaux entrants.",
              "Anticiper un virage réglementaire via PESTEL & Porter, puis traduire en clés de succès.",
              "Croiser VRIO et SWOT pour prioriser un plan stratégique à 12–24 mois.",
              "Confronter le diagnostic aux business models émergents et orienter l’innovation.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-[#dfaf2c] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens — Révolution numérique */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Liens — Révolution numérique & thématiques</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <Cpu className="h-5 w-5 text-[#0C3D5E]" />, text: "IA : facteur clé du PESTEL (automatisation, éthique, productivité)." },
              { icon: <LinkIcon className="h-5 w-5 text-[#0C3D5E]" />, text: "Plateformes : reconfigurent industries et chaînes de valeur." },
              { icon: <Blocks className="h-5 w-5 text-[#0C3D5E]" />, text: "Blockchain : transparence & désintermédiation, nouveaux rapports de force." },
              { icon: <BookOpen className="h-5 w-5 text-[#0C3D5E]" />, text: "Business models digitaux : croiser disruption externe et capabilités internes." },
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
              "Les ressources (tangibles, intangibles, humaines) et leur combinaison en compétences fondent les capacités stratégiques.",
              "VRIN/VRIO : valeur, rareté, inimitabilité, non-substituabilité — tester la durabilité d’un avantage.",
              "PESTEL : identifier les facteurs clés de changement au-delà de la seule concurrence.",
              "SWOT : relier interne & externe pour orienter des choix concrets et mesurables.",
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
                    1–2 jours • Séminaire & atelier pratique
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Managers, équipes stratégie/innovation, CODIR/COMEX
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Pré-requis</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Aucun • Cas concrets encouragés
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                className="bg-[#dfaf2c] hover:bg-[#c79925] text-[#0C3D5E] font-semibold"
                asChild
              >
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20Diagnostic%20strat%C3%A9gique">
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
