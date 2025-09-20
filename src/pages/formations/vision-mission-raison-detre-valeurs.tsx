import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Target,
  BookOpen,
  Rocket,
  CheckCircle2,
  LayoutList,
  Cpu,
  Link as LinkIcon,
  Blocks,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";

export default function VisionMissionRaisonDetreValeurs() {
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
            Manacademy • Identité & stratégie
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Vision, mission, raison d’être & valeurs
          </h1>
          <p className="mt-4 text-lg text-[#0C3D5E]/75 max-w-3xl">
            Clarifier les fondamentaux identitaires de votre organisation pour renforcer l’engagement et la cohérence stratégique.
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
                  Dans un contexte de transformations rapides (numérique, sociétale, écologique),
                  les organisations peinent souvent à exprimer une vision singulière, une mission mobilisatrice
                  et des valeurs réellement opérantes. Cette formation aide à clarifier ces fondamentaux identitaires
                  et à les relier à la stratégie pour créer un récit cohérent, engageant et différenciant.
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
              "Distinguer vision, mission, raison d’être et valeurs, et comprendre leur rôle stratégique.",
              "Identifier la singularité identitaire de l’organisation (pôles en tension créatrice).",
              "Définir une raison d’être authentique et mobilisatrice.",
              "Relier vision et mission aux objectifs stratégiques de long terme.",
              "Traduire les valeurs en comportements observables et décisions concrètes.",
              "Créer un alignement narratif pour renforcer l’engagement et la différenciation.",
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
              "Panorama des notions : définitions et cas inspirants.",
              "Atelier introspectif : identifier les pôles identitaires en tension (ex. performance/humanité).",
              "Cartographie stratégique : relier vision/mission/valeurs aux parties prenantes.",
              "Atelier raison d’être : formulation et test de robustesse.",
              "Traduction en valeurs : choix resserré, comportements associés, rituels d’appropriation.",
              "Narratif stratégique : transformer vision, mission et raison d’être en récit engageant.",
              "Feuille de route : ancrer ces fondamentaux dans gouvernance et communication.",
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
              "Redéfinir une raison d’être mobilisatrice et crédible.",
              "Clarifier des valeurs et les traduire en comportements managériaux.",
              "Mettre en cohérence mission et vision avec des choix stratégiques à 5 ans.",
              "Identifier et utiliser les pôles identitaires comme source d’énergie créative.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-[#dfaf2c] mt-0.5 shrink-0" />
                <span className="text-[#0C3D5E]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens avec la révolution numérique */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4">Liens avec la révolution numérique</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <Cpu className="h-5 w-5 text-[#0C3D5E]" />, text: "IA : questionne le rôle de l’humain et l’éthique de la décision automatisée." },
              { icon: <LinkIcon className="h-5 w-5 text-[#0C3D5E]" />, text: "Plateformes digitales : redéfinissent les écosystèmes de valeur et la mission de l’entreprise." },
              { icon: <Blocks className="h-5 w-5 text-[#0C3D5E]" />, text: "Blockchain : modèles de confiance distribuée qui interrogent gouvernance et valeurs." },
              { icon: <BookOpen className="h-5 w-5 text-[#0C3D5E]" />, text: "Business models digitaux : ancrer l’innovation dans une raison d’être crédible et différenciante." },
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
              "La stratégie, selon Porter, est « un choix délibéré d’activités différentes pour délivrer un mix de valeur unique ».",
              "Une raison d’être doit être authentique, singulière et vivante — sinon elle se réduit à du « purpose washing ».",
              "Les organisations solides articulent vision, mission et identité profonde pour renforcer différenciation et engagement.",
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
                    1–2 jours • Séminaire & atelier collaboratif
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#dfaf2c] mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Public</div>
                  <div className="text-[#0C3D5E]/75 text-sm">
                    COMEX, CODIR, managers, fonctions RH/stratégie
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
                <a href="mailto:contact@manainnovation.fr?subject=Programme%20Vision%20Mission%20Raison%20d%27%C3%AAtre%20%26%20Valeurs">
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
