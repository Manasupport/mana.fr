import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Gauge,
  Puzzle,
  Quote,
  Users,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";

const Manadvise = () => {
  const { t } = useTranslation();

  const testimonials = [
    { quote: t("manadvise.testimonials.0.quote"), role: t("manadvise.testimonials.0.role") },
    { quote: t("manadvise.testimonials.1.quote"), role: t("manadvise.testimonials.1.role") },
    { quote: t("manadvise.testimonials.2.quote"), role: t("manadvise.testimonials.2.role") },
  ];

  // —— Exemples de missions (ajoutés)
const missions = [
  {
    title: "Innover durablement",
    sector: "Industrie agroalimentaire",
    badge: "Stratégie & Innovation",
    details: [
      "Étude stratégique industrielle pour évaluer l'opportunité d’investissement dans une nouvelle technologie de production.",
      "Pilotage d’un portefeuille d’innovations et de rénovations produits : nouvelles recettes, packaging repensés, nouveaux usages et positionnements.",
    ],
    result: [
      "Renouvellement et élargissement de la gamme produits.",
      "Réduction significative de l’usage de plastiques dans les packagings.",
      "Amélioration de la perception de valeur des produits auprès des consommateurs.",
    ],
  },
  {
    title: "Structurer la croissance internationale",
    sector: "Industrie Agroalimentaire",
    badge: "Transformation & Performance",
    details: [
      "Accompagnement de la première coopérative laitière française pour co-construire une feuille de route claire, actionnable et priorisée d’expansion à l’international.",
    ],
    result: [
      "Plan de croissance multiproduits ciblant 3 continents.",
      "Déploiements et stratégies d'entrées adaptés aux marchés locaux et dynamiques de consommation.",
      "Alignement des équipes autour de priorités partagées et d’actions concrètes.",
    ],
  },
  {
    title: "Transformer l’expérience client",
    sector: "Distribution B2B",
    badge: "Intelligence collective & Open Innovation",
    details: [
      "Refonte des parcours omnicanaux d’un acteur de la distribution B2B, en mobilisant des ateliers de co-design et l’intelligence collective des équipes.",
    ],
    result: [
      "Expérience client plus fluide et cohérente sur tous les canaux.",
      "Satisfaction accrue et fidélisation renforcée.",
      "Meilleure adoption des parcours digitaux par les clients.",
    ],
  },
  {
    title: "Aligner finance et durabilité",
    sector: "Banque & Finance",
    badge: "RSE, Durabilité & Transition",
    details: [
      "Accompagnement d’un leader européen de la banque dans la mise en place d’un programme de transformation intégrant les enjeux RSE et de conformité dans les métiers du financement.",
    ],
    result: [
      "Intégration des critères RSE dans les processus de décision.",
      "Renforcement de la conformité et de la transparence.",
      "Amélioration de la crédibilité et de l’engagement auprès des parties prenantes.",
    ],
  },
];

  // Réseau des Manadvisors (i18n)
  type Advisor = { name: string; role: string };
  const advisors: Advisor[] = useMemo(() => {
    const fromI18n = t("manadvise.network.items", { returnObjects: true }) as Advisor[] | unknown;
    return Array.isArray(fromI18n) ? (fromI18n as Advisor[]) : [];
  }, [t]);

  const [showAll, setShowAll] = useState(false);
  const advisorsVisible = showAll ? advisors : advisors.slice(0, 12);

  const initialsOf = (fullName: string) =>
    fullName
      .split(/\s|-/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("");

  const chipsFromRole = (role: string) => {
    const raw = role.split(/,|\/|•|&| et /i).map((s) => s.trim()).filter(Boolean);
    return raw.length ? raw : [role];
  };

  const scrollToApproach = () => {
    const el = document.getElementById("approche");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 4 Domaines (i18n)
  type Domain = { title: string; description: string; skillsTitle: string; skills: string[] };
  const domains: Domain[] = useMemo(() => {
    const arr = t("manadvise.domains.items", { returnObjects: true }) as Domain[] | unknown;
    return Array.isArray(arr) ? (arr as Domain[]) : [];
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-manadvise-light via-white to-manadvise-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-manadvise/10 text-manadvise-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Lightbulb className="h-4 w-4" />
                <span>{t("manadvise.hero.tagline")}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-[#0C3D5E] mb-6 leading-tight">
                {t("manadvise.hero.title")}{" "}
                <span className="text-manadvise">{t("manadvise.hero.highlight")}</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("manadvise.hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="manadvise" size="lg" asChild>
                  <a
                    href="https://calendar.app.google/EEfBMQCVS7bc1bCa8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("manadvise.hero.ctaProject")}
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={scrollToApproach}>
                  {t("manadvise.hero.ctaApproach")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Colonne droite : image PNG */}
            <div className="flex justify-center lg:justify-end">
              <img src="/conseil.png" alt="Illustration conseil" className="max-w-md w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 1) Nos domaines d’expertises */}
      <section id="approche" className="py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E] mb-3">Nos domaines d’expertises</h2>
          <p className="text-lg text-muted-foreground mb-12">{t("manadvise.approach.subtitle")}</p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {domains.map((d, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border bg-white p-7 hover:shadow-xl transition group"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-manadvise/10">
                  {idx === 0 && <Lightbulb className="h-6 w-6 text-manadvise" />}
                  {idx === 1 && <Gauge className="h-6 w-6 text-manadvise" />}
                  {idx === 2 && <Puzzle className="h-6 w-6 text-manadvise" />}
                  {idx === 3 && <ShieldCheck className="h-6 w-6 text-manadvise" />}
                </div>

                <h3 className="text-xl font-semibold text-[#0C3D5E] mb-3">{d.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{d.description}</p>

                <div className="rounded-xl border bg-white p-4">
                  <div className="text-sm font-semibold text-[#0C3D5E] mb-2">{d.skillsTitle}</div>
                  <ul className="text-sm text-[#0C3D5E]/80 space-y-1.5">
                    {d.skills.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-manadvise" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* —— Exemples de missions */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0C3D5E]">Exemples de missions</h3>
            <p className="text-[#0C3D5E]/70 mt-2">
              Un aperçu de ce que nous co-construisons avec nos clients, de la stratégie à l’exécution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-6 hover:shadow-lg transition"
                style={{ borderColor: "rgba(12,61,94,0.08)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold text-[#0C3D5E]">{m.title}</h4>
                  {/* Pastille = badge seul */}
                  <span className="text-[11px] tracking-wide px-2 py-1 rounded-full bg-manadvise/10 text-manadvise font-semibold">
                    {m.badge}
                  </span>
                </div>

                {/* Secteur uniquement (sans barre ni "Expertise :") */}
                <div className="mt-2 text-sm text-[#0C3D5E]/70">
                  <span className="font-medium">Secteur :</span> {m.sector}
                </div>

                {/* Détails */}
                {Array.isArray(m.details) ? (
                  <ul className="mt-3 text-sm text-[#0C3D5E]/85 list-disc list-inside space-y-1.5">
                    {m.details.map((d: string, idx: number) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-[#0C3D5E]/85">{m.details}</p>
                )}

                {/* Résultat(s) */}
                <div
                  className="mt-4 rounded-xl border bg-manadvise/5 p-3 text-sm"
                  style={{ borderColor: "rgba(0,165,180,0.2)" }}
                >
                  <span className="font-semibold text-[#0C3D5E]">
                    {Array.isArray(m.result) && m.result.length > 1 ? "Résultats :" : "Résultat :"}
                  </span>
                  {Array.isArray(m.result) ? (
                    <ul className="mt-2 list-disc list-inside space-y-1.5">
                      {m.result.map((r: string, idx: number) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <span> {m.result}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2) Quelques témoignages clients */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E]">Quelques témoignages clients</h2>
            <p className="text-lg text-muted-foreground mt-2">{t("manadvise.testimonialsSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((tst, i) => (
              <div key={i} className="rounded-2xl bg-white h-full p-6 hover:shadow-xl transition">
                <Quote className="h-10 w-10 text-manadvise/30 mb-4" />
                <p className="italic text-[#0C3D5E] mb-4">“{tst.quote}”</p>
                <div className="text-sm text-muted-foreground">{tst.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Le réseau des Manadvisors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <Users className="h-10 w-10 mx-auto text-manadvise mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E]">Le réseau des Manadvisors</h2>
            <p className="text-lg text-muted-foreground mt-2">{t("manadvise.advisorsSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisorsVisible.map((a, i) => {
              const chips = chipsFromRole(a.role);
              return (
                <div
                  key={`${a.name}-${i}`}
                  className="group relative overflow-hidden rounded-2xl border bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ borderColor: "rgba(12,61,94,0.08)" }}
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-manadvise/10" />
                  <div className="flex items-center gap-4">
                    <div className="relative grid place-items-center h-12 w-12 rounded-full bg-manadvise/10 ring-1 ring-manadvise/20">
                      <UserRound className="h-6 w-6 text-manadvise" />
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-white px-2 py-[2px] text-[11px] font-semibold text-[#0C3D5E] ring-1 ring-slate-200">
                        {initialsOf(a.name)}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="text-base font-semibold text-[#0C3D5E] truncate">{a.name}</div>
                      <div className="text-[11px] uppercase tracking-wide text-[#0C3D5E]/60">Advisor</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {chips.map((c, k) => (
                      <span
                        key={k}
                        className="rounded-full border px-2.5 py-1 text-xs"
                        style={{
                          borderColor: "rgba(0,165,180,0.25)",
                          backgroundColor: "rgba(0,165,180,0.06)",
                          color: "#0C3D5E",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {advisors.length > 12 && (
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => setShowAll((v) => !v)}>
                {showAll ? t("manadvise.network.showLess") : t("manadvise.network.showMore")}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-br from-manadvise-light to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E] mb-6">
            {t("manadvise.finalCta.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">{t("manadvise.finalCta.subtitle")}</p>
          <Button variant="manadvise" size="xl" asChild>
            <a href="https://calendar.app.google/EEfBMQCVS7bc1bCa8" target="_blank" rel="noopener noreferrer">
              {t("manadvise.finalCta.button")}
              <MessageCircle className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manadvise;
