import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Compass,
  Layers,
  GraduationCap,
  Lightbulb,
  LineChart,
  Users,
  ShieldCheck,
  Timer,
  Linkedin,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Associate = {
  name: string;
  photo: string;
  highlights: string[];
  tags: string[];
  formation: string[];
  secteurs: string[];
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

type Alumni = {
  name: string;
  role?: string;
  photo: string;
};

type ManaCard = {
  id: "manadvise" | "manamind" | "manacademy";
  title: string;
  subtitle: string;
  features: string[];
};

type Principle = { title: string; text: string };

const APropos = () => {
  const { t } = useTranslation();

  // ——— Fallbacks
  const fallbackAssociates: Associate[] = [
  {
  name: "Dr. Benjamin Lehiany",
  photo: "/benjamin.jpeg",
  highlights: [
    "Maître de conférence (CNU 6) — École Polytechnique",
    "Chercheur associé — Centre de Recherche en Gestion (i3)",
    "Innovation • Stratégie • Écoconception & économie circulaire",
  ],
  tags: ["Innovation", "Strategie", "Durabilité"],
  formation: [
    "Doctorat en Sciences de Gestion — École Polytechnique",
    "Master d'Économie — École d'Économie de Toulouse",
    "International Teacher Program — China-Europe International Business School",
  ],
  secteurs: ["Énergie & Mobilité", "Éducation", "Industrie", "Secteur public"],
},
  {
      name: "Stéphane Lesage",
      photo: "/stephane.jpeg",
      highlights: [
        "+ de 18 ans dans le conseil en management et stratégie",
        "Professeur affilié — ESCP",
        "Contractuel — SKEMA, EXED Polytechnique, ENPC",
      ],
      tags: ["Transformation", "Stratégie", "Innovation"],
      formation: [
        "DEA — ENPC",
        "DESS — Sophia Antipolis",
        "Certifications Black Belt Six Sigma / Lean / Prosci",
      ],
      secteurs: ["Services", "Industrie agro-alimentaire", "Banque et Finance", "Retail"],
  },
];

  const fallbackTeam: TeamMember[] = [
    { name: "Salhia Darmon", role: "Cheffe de Projet Innovation", photo: "/salhia.jpeg" },
    { name: "Yanis Otmani Es Sakali", role: "Growth Manager & Business Developer", photo: "/yanis.png" },
  ];

  const fallbackAlumni: Alumni[] = [
    { name: "Marie Laloux", role: "Senior Associate Consultant", photo: "/marie.jpeg" },
    { name: "Samy William Ndoko", role: "Innovation Hacker", photo: "/samy.jpeg" },
    { name: "Yujia Luo", role: "Consultant in Digital & Agile Transformation", photo: "/yujia.jpeg" },
    { name: "Alexandre Richard", role: "Analyste Business & Expert Technique", photo: "/alexandre.jpeg" },
    { name: "Farah Doumit", role: "Technical Consultant", photo: "/farah.jpeg" },
    { name: "Zeyna Toure", role: "Product Owner", photo: "/zeyna.jpeg" },
  ];

  const associates: Associate[] = useMemo(() => {
    const fromI18n = t("aboutPage.associates.items", { returnObjects: true });
    return Array.isArray(fromI18n) && fromI18n.length ? (fromI18n as Associate[]) : fallbackAssociates;
  }, [t]);

  const team: TeamMember[] = useMemo(() => {
    const fromI18n = t("aboutPage.team.items", { returnObjects: true });
    return Array.isArray(fromI18n) && fromI18n.length ? (fromI18n as TeamMember[]) : fallbackTeam;
  }, [t]);

  const alumni: Alumni[] = useMemo(() => {
    const fromI18n = t("aboutPage.alumni.items", { returnObjects: true });
    return Array.isArray(fromI18n) && fromI18n.length ? (fromI18n as Alumni[]) : fallbackAlumni;
  }, [t]);

  const manas: ManaCard[] = useMemo(() => {
    const fromI18n = t("aboutPage.manas", { returnObjects: true });
    if (Array.isArray(fromI18n) && fromI18n.length) return fromI18n as ManaCard[];
    return [
      {
        id: "manadvise",
        title: "Manadvise",
        subtitle: "Conseil stratégique à l’intersection de la recherche et du terrain.",
        features: [
          "Feuilles de route, décisions et mise à l’échelle.",
          "Gouvernance, éthique & conformité (incl. IA).",
          "Expérimentations rapides & mesure d’impact.",
        ],
      },
      {
        id: "manamind",
        title: "Manamind",
        subtitle:
          "Manamind est une application conçue pour créer et animer des parcours d'apprentissage sur mesure, centrés sur le développement des compétences.",
        features: [
          "Expérience apprenant engageante & gamification.",
          "Pilotage encadrants & analytics temps réel.",
          "Traçabilité & auditabilité des acquis.",
        ],
      },
      {
        id: "manacademy",
        title: "Manacademy",
        subtitle: "Organisme de formation de Mana",
        features: [
          "Un Organisme de Formation certifié (n°11922589292), expert des grandes transitions : innovation, stratégie et RSE.",
          "Des formats modulables : séminaires, ateliers, parcours hybrides, adaptés à vos enjeux concrets",
          "Un réseau d’experts praticiens qui allient rigueur académique et retours terrains opérationnels.",
        ],
      },
    ];
  }, [t]);

  const principles: Principle[] = useMemo(() => {
    const fromI18n = t("aboutPage.principles.items", { returnObjects: true });
    if (Array.isArray(fromI18n) && fromI18n.length) return fromI18n as Principle[];
    return [
      { title: "Rigueur & clarté", text: "Un cadre explicite, des décisions tracées, des mesures d’impact." },
      { title: "Co-construction", text: "Des solutions bâties avec vos équipes, pas à côté." },
      { title: "Pragmatisme", text: "Tester vite, apprendre, passer à l’échelle." },
      { title: "Responsabilité", text: "Utilité sociale, sobriété et conformité au cœur." },
    ];
  }, [t]);

  const chips: string[] = useMemo(() => {
    const fromI18n = t("aboutPage.hero.chips", { returnObjects: true });
    return Array.isArray(fromI18n) && fromI18n.length
      ? (fromI18n as string[])
      : ["Innovation & stratégie", "RSE & transitions", "Pédagogie & compétences"];
  }, [t]);

  const handleOpenActivities = () => {
    window.dispatchEvent(new CustomEvent("openActivitiesMenu"));
  };

  return (
    <div className="min-h-screen bg-background text-[#0C3D5E]">
      <Navigation />

      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-gradient-to-br from-[#0C3D5E] via-[#12527b] to-[#0C3D5E] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-white/10 blur-3xl opacity-20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-10 items-center md:grid-cols-2">
            <div className="animate-in fade-in slide-in-from-left-6 duration-700">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 ring-1 ring-white/20 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {t("aboutPage.hero.badge", "Notre raison d’être")}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                {t("aboutPage.hero.titlePrefix", "Transformer les expertises en")}{" "}
                <span className="text-[#dfaf2c]">{t("aboutPage.hero.titleHighlight", "résultats mesurables")}</span>
              </h1>
              <p className="text-white/85 text-lg leading-relaxed">
                {t(
                  "aboutPage.hero.subtitle",
                  "Mana fait converger recherche, terrain et design de solutions pour accélérer des innovations utiles, responsables et durables."
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map((c, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded-full bg-white/10 ring-1 ring-white/15">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-right-6 duration-700">
              <div className="relative rounded-2xl bg-white/90 p-8 shadow-2xl ring-1 ring-white/60 backdrop-blur">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex h-16 items-center justify-center rounded-xl bg-manadvise/10">
                    <Compass className="h-7 w-7 text-manadvise" />
                  </div>
                  <div className="flex h-16 items-center justify-center rounded-xl bg-manamind/10">
                    <Layers className="h-7 w-7 text-manamind" />
                  </div>
                  <div className="flex h-16 items-center justify-center rounded-xl bg-manacademy/10">
                    <GraduationCap className="h-7 w-7 text-manacademy" />
                  </div>
                </div>
                <div className="text-center text-[#0C3D5E]/80 text-sm font-medium">
                  {t("aboutPage.hero.triad", "Trois approches, un même objectif : l’impact.")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos 3 Manas — CTA alignés & puces cohérentes */}
<section className="py-16 md:py-18">
  <div className="mx-auto max-w-6xl px-6">
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">
        {t("aboutPage.manasTitle", "Nos 3 Manas")}
      </h2>
      <p className="mt-2 text-[#0C3D5E]/70 max-w-3xl mx-auto">
        {t(
          "aboutPage.manasSubtitle",
          "Un écosystème cohérent : conseil stratégique, plateforme pédagogique et organisme de formation — pour passer de l’idée à l’impact."
        )}
      </p>
    </div>

    {(() => {
      const brand = {
        manadvise: {
          bg: "from-[#00a5b4]/8 to-white",
          pill: "Conseil",
          color: "#00a5b4",
          iconBg: "bg-[#00a5b4]/10",
          iconClass: "text-[#00a5b4]",
        },
        manamind: {
          bg: "from-[#71c088]/10 to-white",
          pill: "Application Edtech",
          color: "#71c088",
          iconBg: "bg-[#71c088]/10",
          iconClass: "text-[#71c088]",
        },
        manacademy: {
          bg: "from-[#dfaf2c]/12 to-white",
          pill: "Formation",
          color: "#dfaf2c",
          iconBg: "bg-[#dfaf2c]/15",
          iconClass: "text-[#dfaf2c]",
        },
      } as const;

      const SuffixColor = ({
        id,
        text,
      }: {
        id: "manadvise" | "manamind" | "manacademy";
        text: string;
      }) => <span style={{ color: brand[id].color }}>{text}</span>;

      const SplitTitle = ({
        id,
        title,
      }: {
        id: keyof typeof brand;
        title: string;
      }) => {
        if (id === "manadvise")
          return (
            <>
              {title.replace(/(advise)$/i, "")}
              <SuffixColor id="manadvise" text="advise" />
            </>
          );
        if (id === "manamind")
          return (
            <>
              {title.replace(/(mind)$/i, "")}
              <SuffixColor id="manamind" text="mind" />
            </>
          );
        return (
          <>
            {title.replace(/(cademy)$/i, "")}
            <SuffixColor id="manacademy" text="cademy" />
          </>
        );
      };

      const ordered = ["manadvise", "manamind", "manacademy"] as const;
      const dataOrdered = ordered.map((id) => manas.find((m) => m.id === id)!);

      return (
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {dataOrdered.map((m) => {
            const b = brand[m.id];
            return (
              <div
                key={m.id}
                className={`relative rounded-3xl border bg-gradient-to-br ${b.bg} overflow-hidden hover:shadow-md transition-shadow flex flex-col`}
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                {/* pastille */}
                <div className="absolute right-4 top-4">
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm"
                    style={{ borderColor: `${b.color}33`, color: b.color }}
                  >
                    {b.pill}
                  </span>
                </div>

                <div className="p-6 flex flex-col h-full">
                  {/* icône d’entête */}
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${b.iconBg} mb-4`}
                  >
                    {m.id === "manadvise" && (
                      <Lightbulb className={`h-5 w-5 ${b.iconClass}`} />
                    )}
                    {m.id === "manamind" && (
                      <Layers className={`h-5 w-5 ${b.iconClass}`} />
                    )}
                    {m.id === "manacademy" && (
                      <GraduationCap className={`h-5 w-5 ${b.iconClass}`} />
                    )}
                  </div>

                  {/* Titre + sous-titre */}
                  <h3 className="text-[22px] md:text-[24px] font-extrabold text-[#0C3D5E] mb-1 tracking-tight">
                    <SplitTitle id={m.id} title={m.title} />
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#0C3D5E]/75 mb-5">
                    {m.subtitle}
                  </p>

                  {/* Puces – même icône que l’entête */}
                  <ul className="space-y-2.5 text-[15px] text-[#0C3D5E]">
                    {m.features.map((f, i) => (
                      <li key={`${m.id}-f-${i}`} className="flex items-start gap-2.5">
                        <span
                          className="mt-1 inline-flex h-4.5 w-4.5 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${b.color}1A` }}
                        >
                          {m.id === "manadvise" && (
                            <Lightbulb className="h-3 w-3" style={{ color: b.color }} />
                          )}
                          {m.id === "manamind" && (
                            <Layers className="h-3 w-3" style={{ color: b.color }} />
                          )}
                          {m.id === "manacademy" && (
                            <GraduationCap className="h-3 w-3" style={{ color: b.color }} />
                          )}
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA aligné en bas */}
                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full sm:w-auto bg-white/70 hover:bg-white"
                      style={{ borderColor: b.color, color: b.color }}
                    >
                      <a href={`/${m.id}`}>En savoir plus</a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    })()}
  </div>
</section>

      {/* ManaGlass – interlude */}
    <section className="py-4">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border bg-white/80 backdrop-blur-sm text-center px-6 py-6">
            <p className="text-[15px] md:text-base text-[#0C3D5E]/80">
              Si votre impact est plus petit qu’une pièce de 2 €, il est temps de passer chez Mana ;)
            </p>
            <img
              src="/managlass.png"
              alt="ManaGlass"
              className="h-8 md:h-9 mx-auto mt-3 opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Identité (style dictionnaire) & Principes d’action */}
<section className="py-8 bg-muted/30">
  <div className="mx-auto max-w-6xl px-6">
    <div className="grid gap-8 md:grid-cols-2">
      {/* Carte Dictionnaire : Mana (n.m.) */}
      <div className="relative overflow-hidden rounded-2xl border bg-white">
        <div className="absolute -top-10 -left-6 text-[#0C3D5E]/5 font-extrabold text-[220px] leading-none select-none pointer-events-none">
          {t("aboutPage.identity.bigInitial", "M")}
        </div>

        <div className="relative p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
               style={{ backgroundColor: "rgba(223,175,44,0.12)", color: "#0C3D5E", border: "1px solid rgba(223,175,44,0.35)" }}>
            {t("aboutPage.identity.badge", "Notre identité")}
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#0C3D5E]">
            <span className="italic">Mana</span> <span className="text-[#0C3D5E]/60">(n.m.)</span> <span className="text-[#0C3D5E]/50">[ma-na]</span>
          </h3>

          <p className="text-[#0C3D5E]/80 leading-relaxed mb-4">
            Énergie qui relie les individus et démultiplie le potentiel du collectif.
          </p>

          <div className="mt-4 rounded-xl border p-4 bg-[#0C3D5E]/[0.02]" style={{ borderColor: "rgba(12,61,94,0.10)" }}>
            <div className="text-xs uppercase tracking-wide font-semibold mb-2 text-[#0C3D5E]/60">Exemples :</div>
            <ul className="list-inside list-disc text-sm text-[#0C3D5E]/75 space-y-2">
              <li>“Activer le mana d’une équipe pour transformer une idée en impact mesurable.”</li>
              <li>“Le secret d’un atelier réussi ? Un peu de méthode, beaucoup de mana.”</li>
              <li>“On a mesuré le mana de la salle : il dépassait les 9000.”</li>
              <li>“Activer le mana, c’est transformer une visio en déclic collectif.”</li>
              <li>“Et toi, t’as le Mana.”</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Principes d’action — design affiné */}
      <div className="rounded-2xl border bg-white p-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0C3D5E]">
            {t("aboutPage.principles.title", "Nos principes d'action")}
          </h3>
          <span className="text-xs font-semibold rounded-full px-3 py-1"
                style={{ backgroundColor: "rgba(113,192,136,0.12)", color: "#0C3D5E", border: "1px solid rgba(113,192,136,0.35)" }}>
            {t("aboutPage.principles.badge", "Lignes directrices")}
          </span>
        </div>

        <div className="grid gap-4">
          {(t("aboutPage.principles.items", { returnObjects: true }) as {title:string; text:string;}[]).map((p, i) => (
            <div key={i}
                 className="group relative rounded-xl border bg-white p-4 hover:shadow-sm transition"
                 style={{ borderColor: "rgba(12,61,94,0.08)" }}>
              {/* right-hand numeric label removed per request */}

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg grid place-items-center text-sm font-bold"
                     style={{ backgroundColor: "rgba(0,165,180,0.10)", color: "#00a5b4", border: "1px solid rgba(0,165,180,0.25)" }}>
                  {(i + 1)}
                </div>
                <div>
                  <div className="font-semibold text-[#0C3D5E] leading-snug">{p.title}</div>
                  <p className="text-sm text-[#0C3D5E]/75 mt-1">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Légende / signature removed per request */}
      </div>
    </div>
  </div>
</section>

  {/* Manassociés */}
  <section className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{t("aboutPage.associates.title", "Manassociés")}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-[#0C3D5E]/70">
              {t("aboutPage.associates.subtitle", "Deux profils complémentaires, ancrés dans la recherche et l’action.")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {associates.map((p) => (
              <div
                key={p.name}
                className="group relative overflow-hidden rounded-2xl border bg-white p-7 transition-all duration-500 hover:shadow-xl"
              >
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="h-full w-full bg-gradient-to-br from-[#0C3D5E]/5 via-transparent to-[#00a5b4]/5" />
                </div>

                <div className="mb-6 flex items-center gap-5">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md ring-1 ring-slate-200"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tags.map((tag, i) => (
                        <span
                          key={`${tag}-${i}`}
                          className="rounded-full border border-[#0C3D5E]/15 bg-[#0C3D5E]/5 px-2.5 py-1 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#dfaf2c]">
                      {t("aboutPage.associates.labels.milestones", "Repères")}
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {p.highlights.map((h, i) => (
                        <li key={`${p.name}-h-${i}`} className="flex gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#0C3D5E]/40" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#71c088]">
                      {t("aboutPage.associates.labels.education", "Formation")}
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {p.formation.map((f, i) => (
                        <li key={`${p.name}-f-${i}`} className="flex gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#0C3D5E]/40" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#00a5b4]">
                      {t("aboutPage.associates.labels.sectors", "Secteurs")}
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {p.secteurs.map((s, i) => (
                        <li key={`${p.name}-s-${i}`} className="flex gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#0C3D5E]/40" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* LinkedIn button (bottom-right) */}
                <div className="absolute bottom-2 right-4">
                  {p.name === "Dr. Benjamin Lehiany" && (
                    <a
                      href="https://www.linkedin.com/in/benjaminlehiany/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 shadow-sm border border-[#0C3D5E]/10 hover:bg-white transition"
                      aria-label="Benjamin Lehiany LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 text-[#0C3D5E]" />
                    </a>
                  )}

                  {p.name === "Stéphane Lesage" && (
                    <a
                      href="https://www.linkedin.com/in/st%C3%A9phane-lesage-57451912/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 shadow-sm border border-[#0C3D5E]/10 hover:bg-white transition"
                      aria-label="Stéphane Lesage LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 text-[#0C3D5E]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-[#0C3D5E]/70">
          </div>
        </div>
      </section>

      {/* Manateam — version raffinée centrée (fix avatar parfaitement rond) */}
      <section className="py-8 bg-muted/30">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E]">
        {t("aboutPage.team.title", "Manateam")}
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-[#0C3D5E]/70">
        {t("aboutPage.team.subtitle", "Une équipe compacte, pluridisciplinaire, exigeante et bienveillante.")}
      </p>
    </div>

    {/* centrage horizontal des 2 cartes */}
    <div className="flex justify-center gap-6 flex-wrap">
      {team.map((m) => (
        <div
          key={m.name}
          className="group relative w-72 rounded-2xl bg-gradient-to-br from-[#0C3D5E]/8 via-white to-white p-[1px] transition-transform duration-300 hover:-translate-y-1"
          style={{ boxShadow: "0 6px 24px rgba(12,61,94,.08)" }}
        >
          {/* inner card */}
          <div className="relative rounded-2xl bg-white p-6">
            {/* halo */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-manadvise/10 blur-2xl opacity-60" />

            <div className="flex items-center gap-4">
              {/* Avatar ROND garanti */}
              <div className="relative h-16 w-16 aspect-square shrink-0">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full rounded-full object-cover block ring-2 ring-[#0C3D5E]/10"
                />
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-[#71c088] to-[#00a5b4] ring-2 ring-white" />
              </div>

              <div className="min-w-0">
                <div className="text-lg font-semibold text-[#0C3D5E] truncate">{m.name}</div>
                <div className="mt-1 inline-flex items-center gap-2">
                  <span className="rounded-full border border-[#0C3D5E]/15 bg-[#0C3D5E]/5 px-2 py-0.5 text-xs font-medium text-[#0C3D5E]/80">
                    {m.role}
                  </span>
                </div>
              </div>
            </div>

            {/* footer line removed per design request */}
          </div>

          {/* hover outline glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#0C3D5E]/10 transition-colors" />

          {/* LinkedIn button (bottom-right for team members) */}
          <div className="absolute bottom-2 right-3">
            {m.name === "Salhia Darmon" && (
              <a
                href="https://www.linkedin.com/in/salhia-darmon/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 shadow-sm border border-[#0C3D5E]/10 hover:bg-white transition"
                aria-label="Salhia Darmon LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-[#0C3D5E]" />
              </a>
            )}

            {m.name === "Yanis Otmani Es Sakali" && (
              <a
                href="https://www.linkedin.com/in/yanis-otmani-es-sakali-351476222/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 shadow-sm border border-[#0C3D5E]/10 hover:bg-white transition"
                aria-label="Yanis Otmani LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-[#0C3D5E]" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Manalumnis — lignes centrées & ordre symétrique */}
<section className="py-8">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E]">
        {t("aboutPage.alumni.title", "Manalumnis")}
      </h2>
    </div>

    {/* 1ère ligne (4 cartes) + 2ème ligne (2 cartes centrées) */}
    <div className="flex flex-wrap justify-center gap-6">
      {/* Ligne 1 */}
      {alumni
        .filter(a =>
          ["Marie Laloux", "Samy William Ndoko", "Yujia Luo", "Alexandre Richard"].includes(a.name)
        )
        .map(a => (
          <div
            key={a.name}
            className="group relative w-72 rounded-2xl bg-white p-5 border border-[#0C3D5E]/10 hover:border-[#0C3D5E]/15 transition-all hover:shadow-[0_10px_24px_rgba(12,61,94,.08)]"
          >
            <div className="pointer-events-none absolute -top-8 -left-8 w-24 h-24 rounded-full bg-manacademy/10 blur-2xl opacity-70" />
            <div className="flex items-center gap-4">
              <img
                src={a.photo}
                alt={a.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[#0C3D5E]/10 group-hover:ring-[#dfaf2c]/30 transition"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#0C3D5E] truncate">{a.name}</div>
                {a.role && <div className="mt-0.5 text-xs text-[#0C3D5E]/70 line-clamp-2">{a.role}</div>}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wide text-[#0C3D5E]/45">Alumni</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0C3D5E] opacity-0 group-hover:opacity-100 transition">
                Merci ✨
              </span>
            </div>
          </div>
        ))}

      {/* Ligne 2 centrée : Farah sous Samy, Zeyna sous Yujia */}
      {alumni
        .filter(a => ["Farah Doumit", "Zeyna Toure"].includes(a.name))
        .map(a => (
          <div
            key={a.name}
            className="group relative w-72 rounded-2xl bg-white p-5 border border-[#0C3D5E]/10 hover:border-[#0C3D5E]/15 transition-all hover:shadow-[0_10px_24px_rgba(12,61,94,.08)]"
          >
            <div className="pointer-events-none absolute -top-8 -left-8 w-24 h-24 rounded-full bg-manacademy/10 blur-2xl opacity-70" />
            <div className="flex items-center gap-4">
              <img
                src={a.photo}
                alt={a.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[#0C3D5E]/10 group-hover:ring-[#dfaf2c]/30 transition"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#0C3D5E] truncate">{a.name}</div>
                {a.role && <div className="mt-0.5 text-xs text-[#0C3D5E]/70 line-clamp-2">{a.role}</div>}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wide text-[#0C3D5E]/45">Alumni</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0C3D5E] opacity-0 group-hover:opacity-100 transition">
                Merci ✨
              </span>
            </div>
          </div>
        ))}
    </div>

    <p className="mt-8 text-center text-xs text-[#0C3D5E]/55">
      {t("aboutPage.alumni.note", "Ils et elles ont marqué nos projets — et laissent une trace durable.")}
    </p>
  </div>
</section>

  {/* CTA final — plus grand */}
  <section className="bg-gradient-to-br from-white to-[#f7fafc] py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-3xl md:text-5xl font-semibold md:font-bold">
            {t("aboutPage.cta.title", "Envie d’en savoir plus sur notre approche ?")}
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-[#0C3D5E]/75">
            {t(
              "aboutPage.cta.subtitle",
              "Découvrons ensemble comment nos trois activités se renforcent pour créer de la valeur."
            )}
          </p>
          <div className="mt-8">
            <Button
              onClick={handleOpenActivities}
              size="xl"
              className="px-8 py-6 text-lg bg-gradient-to-r from-[#71c088] to-[#00a5b4] text-white shadow-md hover:shadow-lg transition"
            >
              {t("aboutPage.cta.button", "Nos activités")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default APropos;
