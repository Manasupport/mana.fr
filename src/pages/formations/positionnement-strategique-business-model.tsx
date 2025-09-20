import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Target,
  CheckCircle2,
  LayoutGrid,
  Grid,
  Compass,
  Waves,
  LineChart,
  BookOpen,
  Cpu,
  Link as LinkIcon,
  Blocks,
  Rocket,
  Users,
  Calendar,
} from "lucide-react";

export default function PositionnementStrategiqueBusinessModel() {
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
            Manacademy • Stratégie & modèle économique
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Positionnement stratégique & business model
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Travailler la proposition de valeur, cartographier la concurrence et
            concevoir un business model lisible et différenciant (BMC, VPD, Océan Bleu).
          </p>
        </div>
      </section>

      {/* Pourquoi cette formation ? */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="rounded-2xl border bg-white p-6 md:p-8" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-[#dfaf2c] shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi cette formation&nbsp;?</h2>
                <p className="text-[#0C3D5E]/80 leading-relaxed">
                  Beaucoup d’organisations confondent stratégie et business model&nbsp;: elles portent un récit
                  inspirant sans l’ancrer dans une proposition de valeur claire et un modèle économique robuste.
                  Résultat&nbsp;: positionnement flou, difficulté à convaincre et arbitrages instables.
                  Cette formation propose un cadre concret (BMC, Value Proposition Design, Océan Bleu)
                  pour aligner stratégie, offre et création&nbsp;/&nbsp;capture de valeur.
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
              "Clarifier la proposition de valeur et la relier aux attentes clients.",
              "Choisir un positionnement concurrentiel pertinent (coût, différenciation, focus, hybride).",
              "Utiliser Business Model Canvas et Value Proposition Design pour structurer l’offre.",
              "Exploit­er les outils Océan Bleu pour créer de nouveaux espaces de valeur.",
              "Relier business model et stratégie pour construire un avantage durable.",
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
              { icon: <Compass className="h-5 w-5 text-[#dfaf2c]" />, text: "Panorama des stratégies concurrentielles : coûts, différenciation, niche, hybrides." },
              { icon: <LineChart className="h-5 w-5 text-[#dfaf2c]" />, text: "Création & capture de valeur : de la promesse à la marge (B > C, revenus, coûts)." },
              { icon: <Grid className="h-5 w-5 text-[#dfaf2c]" />, text: "Atelier Value Proposition Design : formaliser l’offre et tester l’adéquation problème/solution." },
              { icon: <LayoutGrid className="h-5 w-5 text-[#dfaf2c]" />, text: "Business Model Canvas : activités clés, ressources, partenaires, revenus, coûts." },
              { icon: <Waves className="h-5 w-5 text-[#dfaf2c]" />, text: "Océan Bleu : courbe de valeur et grille ERAC (Éliminer, Réduire, Augmenter, Créer)." },
              { icon: <Compass className="h-5 w-5 text-[#dfaf2c]" />, text: "Benchmark & mapping : cartographier la concurrence, repérer les espaces libres." },
              { icon: <BookOpen className="h-5 w-5 text-[#dfaf2c]" />, text: "Études inspirantes : comment le business model transforme la stratégie (Apple, Tesla, Airbnb…)." },
              { icon: <Rocket className="h-5 w-5 text-[#dfaf2c]" />, text: "Feuille de route : narratif stratégique clair pour l’interne et l’externe." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 leading-relaxed" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
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
              "Clarifier la proposition de valeur pour aligner l’offre sur les segments prioritaires.",
              "Redéfinir le business model via le Canvas et ajuster le positionnement face à de nouveaux entrants.",
              "Explorer un espace concurrentiel inédit avec l’approche Océan Bleu.",
              "Transformer la stratégie en un narratif différenciant pour partenaires et investisseurs.",
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
              { icon: <Cpu className="h-5 w-5 text-[#0C3D5E]" />, text: "IA : redéfinition de la chaîne de valeur, modèles IA-as-a-service, automation." },
              { icon: <LinkIcon className="h-5 w-5 text-[#0C3D5E]" />, text: "Plateformes : logiques multi-face, effets de réseau, nouvelles frontières concurrentielles." },
              { icon: <Blocks className="h-5 w-5 text-[#0C3D5E]" />, text: "Blockchain : confiance distribuée, tokenisation, nouveaux schémas de capture de valeur." },
              { icon: <BookOpen className="h-5 w-5 text-[#0C3D5E]" />, text: "BM digitaux : freemium, abonnement, data-driven, écosystèmes plateformes." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
                <div className="flex items-start gap-3">
                  {item.icon}
                  <p className="text-[#0C3D5E]/85">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repères utiles (data points) */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Repères utiles</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "La stratégie vise un avantage durable en étant différent (Porter) : choix d’activités pour délivrer un mix unique de valeur.",
              "Un business model décrit comment l’organisation crée, délivre et capture la valeur (Osterwalder & Pigneur).",
              "Une technologie moyenne avec un meilleur business model peut surpasser une technologie supérieure mal exploitée (Chesbrough).",
              "L’Océan Bleu consiste à redéfinir la frontière coût-valeur et créer un espace de marché nouveau.",
            ].map((text, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 leading-relaxed" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
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
                  <div className="text-[#0C3D5E]/75 text-sm">1–2 jours • Atelier + Séminaire</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Managers, équipes innovation & stratégie, intrapreneurs
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
              <Button className="bg-[#dfaf2c] hover:bg-[#c79925] text-[#0C3D5E] font-semibold" asChild>
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20Positionnement%20%26%20Business%20Model">
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
