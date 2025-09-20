import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Factory,
  Layers,
  BarChart3,
  FileText,
  CheckCircle2,
  LayoutList,
  Rocket,
  Cpu,
  Blocks,
  Link as LinkIcon,
  Recycle,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";

export default function EcoConceptionBilanCarboneCsrd() {
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
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold bg-white/80 backdrop-blur-sm"
            style={{ borderColor: "rgba(223,175,44,0.35)" }}
          >
            <Leaf className="h-4 w-4 text-[#dfaf2c]" />
            Manacademy • Éco-conception & Reporting
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Éco-conception, bilan carbone, CSRD
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Comprendre les référentiels, mesurer les impacts et structurer un reporting clair. Une approche
            concrète pour intégrer l’éco-conception et anticiper la CSRD.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span
              className="text-xs font-medium rounded-full px-3 py-1 bg-[#dfaf2c]/15 text-[#0C3D5E] border"
              style={{ borderColor: "rgba(223,175,44,0.35)" }}
            >
              Bilan GES & ACV
            </span>
            <span
              className="text-xs font-medium rounded-full px-3 py-1 bg-[#dfaf2c]/15 text-[#0C3D5E] border"
              style={{ borderColor: "rgba(223,175,44,0.35)" }}
            >
              Éco-conception
            </span>
            <span
              className="text-xs font-medium rounded-full px-3 py-1 bg-[#dfaf2c]/15 text-[#0C3D5E] border"
              style={{ borderColor: "rgba(223,175,44,0.35)" }}
            >
              CSRD & ESRS
            </span>
          </div>
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
              <BarChart3 className="h-6 w-6 text-[#dfaf2c] shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi cette formation&nbsp;?</h2>
                <p className="text-[#0C3D5E]/80 leading-relaxed">
                  Pression réglementaire (CSRD, loi AGEC, taxonomie…), attentes clients et concurrence
                  internationale&nbsp;: mesurer, réduire et rendre compte des impacts n’est plus optionnel.
                  Beaucoup d’équipes n’ont toutefois ni les repères ni les outils pour conduire un bilan carbone,
                  lire une ACV ou structurer un reporting crédible. Ce parcours offre un cadre méthodologique
                  clair et des ateliers pratico-pratiques pour passer à l’action.
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
              "S’approprier les principes de l’éco-conception et la logique « cycle de vie ».",
              "Mener un premier diagnostic environnemental (bilan GES, bases ACV).",
              "Identifier risques & opportunités liés à l’éco-innovation et aux normes.",
              "Comprendre l’essentiel de la CSRD : périmètre, double matérialité, ESRS.",
              "Construire un plan d’action bas carbone et partager des résultats fiables.",
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
              "Panorama : ODD, loi AGEC, taxonomie, CSRD, tendances de consommation responsable.",
              "Éco-conception & cycle de vie : bases ACV (ISO 14040/14044), roue de Brezet, méthode PEF.",
              "Atelier pratique : mini-bilan carbone (Base Carbone ADEME, tableur).",
              "Éco-innovation : intelligence collective, économie circulaire, modèles hybrides.",
              "CSRD en pratique : double matérialité, architecture ESRS, premiers jalons de reporting.",
              "Feuille de route bas carbone : priorisation, indicateurs, planification.",
              "Zoom sectoriel : adaptation à votre filière (industrie, services, mobilité, finance, …).",
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

      {/* Cas d’usage */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Cas d’usage</h3>
          <ul className="space-y-3">
            {[
              "Une direction produit compare plusieurs designs via PEF et réduit l’empreinte carbone.",
              "Une BU industrielle structure son premier reporting CSRD avec un atelier de double matérialité.",
              "Un groupe de services réalise un bilan GES simplifié pour cibler ses postes les plus émissifs.",
              "Une entreprise teste un modèle circulaire (abonnement, réemploi, réparation) pour allonger la durée de vie produits.",
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
          <h3 className="text-2xl font-bold mb-4">Liens avec la révolution numérique</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>IA & calcul environnemental</strong> : optimisation des ACV / bilans GES tout en intégrant l’empreinte des usages numériques.
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <LinkIcon className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>Plateformes</strong> : leviers de mutualisation et de circularité (partage, réemploi, location).
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <Blocks className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>Blockchain</strong> : traçabilité des chaînes de valeur et certification des données environnementales.
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              <div className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-[#71c088] mt-0.5" />
                <p className="text-[#0C3D5E]/85">
                  <strong>Business models digitaux durables</strong> : du pipeline au modèle circulaire, combinant données, services et impact mesurable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extraits data */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Repères utiles</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div
              className="rounded-xl border bg-white p-4 leading-relaxed"
              style={{ borderColor: "rgba(12,61,94,0.08)" }}
            >
              <Layers className="h-5 w-5 text-[#dfaf2c] inline mr-2" />
              L’<strong>ACV</strong> (Analyse de Cycle de Vie) est standardisée (ISO 14040/14044) et
              peut couvrir jusqu’à 16 indicateurs environnementaux (cadre <em>PEF</em>).
            </div>
            <div
              className="rounded-xl border bg-white p-4 leading-relaxed"
              style={{ borderColor: "rgba(12,61,94,0.08)" }}
            >
              <FileText className="h-5 w-5 text-[#dfaf2c] inline mr-2" />
              La <strong>CSRD</strong> introduit la <em>double matérialité</em> et des exigences de
              reporting structurées via les normes <strong>ESRS</strong>.
            </div>
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
                    1–2 jours • Séminaire + Ateliers (présentiel/distanciel)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Managers, responsables RSE, chefs de projet, intrapreneurs
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Pré-requis</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Aucun • Cas concrets des participants encouragés
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                className="bg-[#dfaf2c] hover:bg-[#c79a27] text-[#0C3D5E] font-semibold"
                asChild
              >
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20%C3%89co-conception%20%26%20CSRD">
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
