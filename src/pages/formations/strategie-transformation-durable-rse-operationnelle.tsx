import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Target,
  CheckCircle2,
  LayoutList,
  Rocket,
  Link as LinkIcon,
  Cpu,
  Blocks,
  Recycle,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";

export default function StrategieTransformationDurableRseOperationnelle() {
  return (
    <div className="min-h-screen bg-background text-[#0C3D5E]">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 w-[36rem] h-[36rem] rounded-full bg-[#dfaf2c]/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-[#0C3D5E]/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold bg-white/80 backdrop-blur-sm"
               style={{ borderColor: "rgba(223,175,44,0.35)" }}>
            <Leaf className="h-4 w-4 text-[#dfaf2c]" />
            Manacademy • RSE & transition durable
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Stratégie de transformation durable & RSE opérationnelle
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Passer de la sensibilisation à des plans d’action activables par les équipes : cadre clair,
            outils concrets et alignement avec les exigences réglementaires et les attentes du marché.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="text-xs font-medium rounded-full px-3 py-1 bg-[#dfaf2c]/15 text-[#0C3D5E] border"
                  style={{ borderColor: "rgba(223,175,44,0.35)" }}>
              Stratégie & feuille de route
            </span>
            <span className="text-xs font-medium rounded-full px-3 py-1 bg-[#dfaf2c]/15 text-[#0C3D5E] border"
                  style={{ borderColor: "rgba(223,175,44,0.35)" }}>
              Conformité (CSRD, taxonomie…)
            </span>
            <span className="text-xs font-medium rounded-full px-3 py-1 bg-[#dfaf2c]/15 text-[#0C3D5E] border"
                  style={{ borderColor: "rgba(223,175,44,0.35)" }}>
              Éco-conception & impact
            </span>
          </div>
        </div>
      </section>

      {/* Pourquoi cette formation ? */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="rounded-2xl border bg-white p-6 md:p-8"
               style={{ borderColor: "rgba(12,61,94,0.08)" }}>
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-[#dfaf2c] shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi cette formation&nbsp;?</h2>
                <p className="text-[#0C3D5E]/80 leading-relaxed">
                  Les organisations subissent une double pression : réglementaire (taxonomie, CSRD, RE2020,
                  loi AGEC…) et sociétale (consommation responsable, attentes clients et collaborateurs).
                  Beaucoup peinent à traduire ces enjeux en priorités concrètes. Cette formation propose une
                  méthode simple pour bâtir une stratégie RSE intégrée et la déployer dans le quotidien des
                  équipes.
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
              "Maîtriser les fondamentaux RSE et le triptyque People • Planet • Profit.",
              "Positionner son organisation face aux exigences (CSRD, SNBC, RE2020, taxonomie européenne…).",
              "Évaluer les impacts clés de son secteur / BU et repérer les leviers de progrès.",
              "Construire une feuille de route RSE pragmatique et mesurable pour les équipes.",
              "Intégrer la durabilité aux produits, processus et modèles d’affaires.",
              "Installer une boucle continue : mesurer, itérer, communiquer."
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#71c088] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contenu proposé */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Contenu proposé (modulable)</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Cadrage & inspirations : 17 ODD, 3 piliers RSE, cas concrets récents.",
              "Lecture des enjeux : conformité court terme, bénéfices moyen terme, transformation long terme.",
              "Atelier diagnostic express : cartographie des impacts sur la chaîne de valeur (carbone, ressources, social).",
              "Éco-innovation & éco-conception : principes « cycle de vie / multicritères / multi-composants ».",
              "Feuille de route d’équipe : priorités 3–6 mois, indicateurs, responsabilités.",
              "Rituels & reporting : embarquement des équipes et préparation CSRD / taxonomie.",
              "Option sectorielle : adaptation au contexte (énergie, construction, mobilité, finance, …)."
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-white p-4 leading-relaxed"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <LayoutList className="h-5 w-5 text-[#dfaf2c] inline mr-2" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemples de cas d’usage */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Cas d’usage</h3>
          <ul className="space-y-3">
            {[
              "Une direction opérationnelle formalise son premier plan RSE avec des actions réalistes et des KPI suivis mensuellement.",
              "Une BU intègre l’éco-conception dans ses offres et lance un pilote produit-service.",
              "L’équipe conformité consolide un socle d’indicateurs communs pour anticiper la CSRD.",
              "Un comité de direction revisite le business model avec une logique d’impact et d’écosystèmes."
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-[#dfaf2c] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens — Révolution numérique & thématiques */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Liens avec la révolution numérique</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>IA responsable</strong> : gains d’efficacité vs empreinte; gouvernance des usages, sobriété et transparence.
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <LinkIcon className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>Plateformes & écosystèmes</strong> : nouvelles logiques de valeur, critères de durabilité partagés.
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <Blocks className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>Traçabilité</strong> : blockchain & registres distribués pour la preuve… avec maîtrise de l’empreinte.
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>Modèles d’affaires durables</strong> : économie de la fonctionnalité, circularité, création
                  d’impact positif mesurable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-5">
          <div className="rounded-2xl border bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
               style={{ borderColor: "rgba(12,61,94,0.08)" }}>
            <div className="grid sm:grid-cols-3 gap-6 w-full">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Format</div>
                  <div className="text-[#0C3D5E]/75 text-sm">1–2 jours • Séminaire + Ateliers (présentiel/distanciel)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">Managers, responsables RSE, chefs de projet, intrapreneurs</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Pré-requis</div>
                  <div className="text-[#0C3D5E]/75 text-sm">Aucun • Cas concrets des participants encouragés</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                className="bg-[#dfaf2c] hover:bg-[#c79a27] text-[#0C3D5E] font-semibold"
                asChild
              >
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20formation%20RSE%20op%C3%A9rationnelle">
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
