import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  RefreshCcw,
  Layers,
  BarChart3,
  FileText,
  CheckCircle2,
  LayoutList,
  Rocket,
  Link as LinkIcon,
  Blocks,
  Recycle,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";

export default function NumeriqueResponsableImpactDigital() {
  return (
    <div className="min-h-screen bg-background text-[#0C3D5E]">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 w-[34rem] h-[34rem] rounded-full bg-[#71c088]/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#0C3D5E]/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold bg-white/80 backdrop-blur-sm"
            style={{ borderColor: "rgba(113,192,136,0.35)" }}
          >
            <Cpu className="h-4 w-4 text-[#71c088]" />
            Manacademy • Numérique durable
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Numérique responsable & impact digital
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Mesurer l’empreinte environnementale du numérique, mettre en place une stratégie digitale durable et intégrée.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Sobriété numérique", "Éco-innovation", "Business models circulaires"].map((tag) => (
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
              <BarChart3 className="h-6 w-6 text-[#71c088] shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi cette formation&nbsp;?</h2>
                <p className="text-[#0C3D5E]/80 leading-relaxed">
                  Raréfaction des ressources, pression réglementaire (loi AGEC, taxonomie, CSRD) et attentes
                  sociétales poussent à réinventer les modèles numériques. Pourtant, beaucoup d’organisations
                  fonctionnent encore en logique linéaire (« extraire → produire → jeter ») avec un coût croissant
                  en termes d’image et de résilience. Cette formation fournit des repères clairs et des outils
                  pratiques pour articuler sobriété numérique, circularité et création de valeur.
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
              "Comprendre les principes de l’économie circulaire appliquée au numérique.",
              "Maîtriser les méthodes d’éco-innovation (ACV, PEF, Roue de Brezet).",
              "Évaluer risques & opportunités liés à la circularité faible vs forte.",
              "Réinterroger son business model au regard des limites planétaires.",
              "Élaborer des plans d’action numériques responsables et activables.",
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
              "Panorama introductif : définitions, champs d’application (production, consommation, déchets).",
              "Éco-conception & cycle de vie : ACV (ISO 14040/14044), méthode PEF, Roue de Brezet.",
              "Atelier pratique : modéliser le cycle de vie d’un produit/service avec Circulab ou Idemat.",
              "Éco-innovation : écotechnologies sobres, bouclage déchets-matières, éco-management.",
              "Économie circulaire : circularité faible vs forte, business models circulaires (réemploi, réparation, abonnement).",
              "Cas inspirants : Apple, Decathlon, Renault Refactory, H&M « Close the loop ».",
              "Feuille de route : quick wins, indicateurs (circularity gap, empreinte matière, ADEME).",
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
              "Une entreprise prolonge la durée de vie de ses produits via réparation et services associés.",
              "Une BU expérimente un modèle d’abonnement circulaire sur un segment pilote.",
              "Une équipe d’innovation utilise la Roue de Brezet pour prioriser ses choix d’écoconception.",
              "Une direction stratégie confronte ses projets aux scénarios de circularité faible vs forte.",
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
              {
                icon: <Cpu className="h-5 w-5 text-[#0C3D5E] mt-0.5" />,
                text: "IA : optimisation des ACV, modélisation des flux et détection d’opportunités de circularité.",
              },
              {
                icon: <LinkIcon className="h-5 w-5 text-[#0C3D5E] mt-0.5" />,
                text: "Plateformes digitales : moteurs de mutualisation et d’économie de la fonctionnalité.",
              },
              {
                icon: <Blocks className="h-5 w-5 text-[#0C3D5E] mt-0.5" />,
                text: "Blockchain : traçabilité et certification des flux de matières et déchets.",
              },
              {
                icon: <Recycle className="h-5 w-5 text-[#0C3D5E] mt-0.5" />,
                text: "Business models digitaux circulaires : combinaison de données, services et impact positif.",
              },
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
                text: "L’ACV est une méthode normalisée qui évalue les impacts environnementaux en multi-étapes, multicritères et multi-composants.",
              },
              {
                icon: <FileText className="h-5 w-5 text-[#71c088] inline mr-2" />,
                text: "Le taux de circularité de l’économie mondiale est estimé à seulement 7–8 %, révélant un potentiel majeur de transformation.",
              },
              {
                icon: <RefreshCcw className="h-5 w-5 text-[#71c088] inline mr-2" />,
                text: "La circularité forte implique de repenser les modèles d’affaires au-delà du recyclage, en intégrant réduction et réemploi.",
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
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20Numérique%20responsable">
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
