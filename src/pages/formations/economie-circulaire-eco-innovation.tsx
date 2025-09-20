import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Recycle,
  Layers,
  Rocket,
  LineChart,
  CheckCircle2,
  LayoutList,
  Cpu,
  Link as LinkIcon,
  Blocks,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";

export default function EconomieCirculaireEcoInnovation() {
  return (
    <div className="min-h-screen bg-background text-[#0C3D5E]">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 w-[34rem] h-[34rem] rounded-full bg-[#71c088]/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#0C3D5E]/6 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold bg-white/80 backdrop-blur-sm"
            style={{ borderColor: "rgba(113,192,136,0.35)" }}
          >
            <Recycle className="h-4 w-4 text-[#71c088]" />
            Manacademy • Économie circulaire
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Économie circulaire & éco-innovation
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Découvrir les modèles économiques durables, intégrer l’écoconception et revisiter son business model à l’aune des limites planétaires.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Circularité forte", "Écoconception", "Business models durables"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium rounded-full px-3 py-1 bg-[#71c088]/15 text-[#0C3D5E] border"
                style={{ borderColor: "rgba(113,192,136,0.35)" }}
              >
                {tag}
              </span>
            ))}
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
              <LineChart className="h-6 w-6 text-[#71c088] shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi cette formation&nbsp;?</h2>
                <p className="text-[#0C3D5E]/80 leading-relaxed">
                  Raréfaction des ressources, CSRD/loi AGEC/taxonomie et attentes sociétales obligent à sortir du modèle linéaire
                  « extraire → produire → jeter ». Cette formation propose des repères concrets et des outils opérationnels pour
                  passer d’une logique de fin de vie à une économie de bouclage des flux — en liant durabilité, compétitivité
                  et innovation.
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
              "Comprendre les principes de l’économie circulaire (réduction, réemploi, recyclage, fonctionnalité, écoconception).",
              "Maîtriser les méthodes d’éco-innovation (ACV, PEF, Roue de Brezet, intelligence collective).",
              "Cartographier risques & opportunités selon circularité faible vs forte.",
              "Réinterroger son business model au regard des limites planétaires.",
              "Construire un plan d’actions concret et adapté à sa filière.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#71c088] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contenu proposé (modulable) */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Contenu proposé (modulable)</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Panorama introductif : définitions, cadres académiques et institutionnels, champs d’application.",
              "Écoconception & cycle de vie : ACV (ISO 14040/14044), méthode PEF (16 indicateurs), Roue de Brezet.",
              "Atelier pratique : modéliser le cycle de vie d’un produit/service (Circulab, Idemat) et prioriser les leviers.",
              "Éco-innovation : bouclage déchets-matières, écotechnologies sobres, éco-management.",
              "Circularité faible vs forte : impacts et choix de conception/organisation.",
              "Business models circulaires : abonnement, réemploi, réparation, économie de la fonctionnalité.",
              "Cas inspirants : Apple, Decathlon, Renault Refactory, H&M « Close the loop ».",
              "Feuille de route : quick wins, indicateurs (circularity gap, empreinte matière, référentiels ADEME).",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-white p-4 leading-relaxed"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <LayoutList className="h-5 w-5 text-[#71c088] inline mr-2" />
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
              "Prolonger la durée de vie des produits via réparation et services associés.",
              "Concevoir un modèle d’abonnement circulaire et sécuriser la viabilité sur un segment pilote.",
              "Prioriser des axes d’écoconception avec la Roue de Brezet et des critères ACV.",
              "Confronter les projets aux scénarios de circularité faible vs forte pour orienter la stratégie.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-[#71c088] mt-0.5 shrink-0" />
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
            {[
              { icon: <Cpu className="h-5 w-5 text-[#0C3D5E] mt-0.5" />, text: "IA : optimisation ACV, modélisation des flux, détection d’opportunités de circularité." },
              { icon: <LinkIcon className="h-5 w-5 text-[#0C3D5E] mt-0.5" />, text: "Plateformes digitales : mutualisation, partage, location, réemploi (économie de fonctionnalité)." },
              { icon: <Blocks className="h-5 w-5 text-[#0C3D5E] mt-0.5" />, text: "Blockchain : traçabilité et certification des chaînes de valeur et des flux de matières." },
              { icon: <Layers className="h-5 w-5 text-[#0C3D5E] mt-0.5" />, text: "Business models digitaux circulaires : combiner données, services et impact (Circular Canvas, Ecocanvas)." },
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
              {
                icon: <Layers className="h-5 w-5 text-[#71c088] inline mr-2" />,
                text: "L’ACV quantifie les impacts environnementaux sur l’ensemble du cycle de vie, en multi-étapes, multicritères et multi-composants.",
              },
              {
                icon: <Recycle className="h-5 w-5 text-[#71c088] inline mr-2" />,
                text: "Le taux de circularité mondial est estimé à ~7–8 % : un gisement majeur de transformation reste à activer.",
              },
              {
                icon: <LineChart className="h-5 w-5 text-[#71c088] inline mr-2" />,
                text: "La circularité forte suppose de repenser les usages et les besoins, au-delà du seul recyclage en fin de vie.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-4 leading-relaxed"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                {item.icon}
                {item.text}
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
                <Calendar className="h-5 w-5 text-[#71c088] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Format</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    1–2 jours • Ateliers & Workshops (présentiel/distanciel)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#71c088] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    Managers, responsables RSE, chefs de produit, intrapreneurs
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-[#71c088] mt-0.5" />
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
                className="bg-[#71c088] hover:bg-[#5da674] text-[#0C3D5E] font-semibold"
                asChild
              >
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20Économie%20circulaire%20%26%20éco-innovation">
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
