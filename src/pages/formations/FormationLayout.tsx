import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle2, MessageSquare } from "lucide-react";

/**
 * FormationLayout — Manacademy
 * Refonte esthétique :
 * - Hero immersif (halo + bruit fin), titres centrés
 * - Cartes “glass” avec bords en dégradé doré, hover subtil
 * - Séparateurs élégants (ligne + marqueor)
 * - CTA primaire + CTA flottant (désactivable)
 * - Micro-animations CSS sans dépendance (prefers-reduced-motion respecté)
 * - 100% rétrocompatible : même API de props
 */

// Tokens DA Manacademy
const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";
const manaGoldBorder = `${manaGold}33`;
const manaGoldBg = `${manaGold}0F`;

// Types
export type MetaItem = { icon: React.ElementType; text: string };
export type PillItem = { icon: React.ElementType; label: string };
export type ListCard = { title: string; desc: string };
export type FormatCard = { name: string; lines: string[] };

export type CourseTemplateProps = {
  backHref?: string;
  calendarHref?: string; // rétrocompat : si utilisé, on lira ctaHref en priorité
  badge?: string;
  title: string;
  summary: string;
  meta?: MetaItem[];

  // Section Pourquoi
  whyTitle?: string;
  whyText: string;
  pills?: PillItem[];

  // Section Objectifs
  objectivesTitle?: string;
  objectives: string[];

  // Section Modules
  modulesTitle?: string;
  modules: ListCard[];

  // Section Formats
  formatsTitle?: string;
  formats?: FormatCard[];

  // Section Use cases
  useCasesTitle?: string;
  useCases?: string[];

  // CTA final
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
  ctaHref?: string;

  // Nouveau (optionnel)
  showFloatingCta?: boolean; // CTA sticky en bas
};

export default function FormationLayout(props: CourseTemplateProps) {
  const {
    backHref = "/manacademy",

    // Hero
    badge,
    title,
    summary,
    meta = [],

    // Pourquoi
    whyTitle = "Pourquoi cette formation ?",
    whyText,
    pills = [],

    // Objectifs
    objectivesTitle = "Objectifs",
    objectives,

    // Modules
    modulesTitle = "Contenu & déroulé",
    modules,

    // Formats
    formatsTitle = "Formats & modalités",
    formats = [],

    // Use cases
    useCasesTitle = "Exemples d’applications",
    useCases = [],

    // CTA
    ctaTitle = "On conçoit le dispositif qui vous ressemble",
    ctaText = "Partagez vos enjeux : nous adaptons contenus, cas et rituels à vos équipes et à vos contraintes terrain.",
    ctaButton = "Discuter",
    ctaHref = "https://calendar.app.google/MHJFvXizPczcPjnB7",
    calendarHref,

    // New
    showFloatingCta = true,
  } = props;

  const finalCtaHref =
    props.ctaHref || ctaHref || calendarHref || "https://calendar.app.google/MHJFvXizPczcPjnB7";

  return (
    <div className="min-h-screen bg-background">
      {/* Styles utilitaires pour animations & “glass” */}
      <style>{cssEnhance}</style>

      <Navigation />

      {/* Fil d’Ariane */}
      <section className="pt-24 pb-6 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to={backHref}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux formations
          </Link>
        </div>
      </section>

      {/* HERO */}
      <section className="relative py-16 overflow-hidden">
        {/* Halo + bruit fin */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1200px 500px at 50% 0%, rgba(223,175,44,0.15), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{ backgroundImage: noiseDataUrl }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center">
          {badge && (
            <div className="mb-5 flex justify-center">
              <div className="glow px-3 py-1.5 rounded-full border text-sm font-medium bg-white/80 backdrop-blur-sm"
                   style={{ borderColor: manaGoldBorder, color: manaDark }}>
                <Badge variant="secondary" className="align-middle bg-transparent border-0 p-0 text-inherit">
                  {badge}
                </Badge>
              </div>
            </div>
          )}

          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight hero-fade"
            style={{ color: manaDark }}
          >
            {title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto hero-fade-delayed">
            {summary}
          </p>

          {/* meta */}
          {meta.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm hero-fade-delayed">
              {meta.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border px-3 py-1 bg-white/70 backdrop-blur-sm"
                  style={{ borderColor: manaGoldBorder }}
                >
                  <m.icon className="h-4 w-4 mr-2" style={{ color: manaGold }} />
                  {m.text}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 hero-fade-delayed">
            <PrimaryCta href={finalCtaHref} label={props.ctaButton ?? ctaButton} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* POURQUOI */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title">{whyTitle}</h2>
          <div className="grid md:grid-cols-[1fr,320px] gap-8 mt-6">
            <p className="text-muted-foreground leading-relaxed text-balance">{whyText}</p>

            {pills.length > 0 && (
              <div className="grid gap-3">
                {pills.map((b, i) => (
                  <GlassRow key={i}>
                    <b.icon className="h-5 w-5" style={{ color: manaGold }} />
                    <span className="text-sm" style={{ color: manaDark }}>
                      {b.label}
                    </span>
                  </GlassRow>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* OBJECTIFS */}
      <section className="py-14" style={{ backgroundColor: `${manaGold}0A` }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title">{objectivesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {objectives.map((item, i) => (
              <GlassCard key={i}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: manaGold }} />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* MODULES / DÉROULÉ */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title">{modulesTitle}</h2>
          <div className="space-y-5 mt-6">
            {modules.map((m, i) => (
              <GlassCard key={i}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold" style={{ color: manaDark }}>
                    {m.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2">{m.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      {formats.length > 0 && (
        <>
          <SectionDivider />
          <section className="py-14" style={{ backgroundColor: `${manaGold}0A` }}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="section-title">{formatsTitle}</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {formats.map((f, i) => (
                  <GlassCard key={i} variant="raised">
                    <h3 className="font-semibold text-lg mb-2" style={{ color: manaDark }}>
                      {f.name}
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {f.lines.map((l, k) => (
                        <div key={k}>{l}</div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CAS D’USAGE */}
      {useCases.length > 0 && (
        <>
          <SectionDivider />
          <section className="py-14 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="section-title">{useCasesTitle}</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {useCases.map((u, i) => (
                  <GlassRow key={i}>
                    <MessageSquare className="h-5 w-5 mt-0.5" style={{ color: manaGold }} />
                    <p className="text-muted-foreground">{u}</p>
                  </GlassRow>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA FINAL */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 340px at 50% 0%, rgba(223,175,44,0.14), transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center" style={{ color: manaDark }}>
            {ctaTitle}
          </h3>
          {props.ctaText !== "" && ctaText && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {ctaText}
            </p>
          )}
          <PrimaryCta href={finalCtaHref} label={props.ctaButton ?? "Discuter"} size="lg" />
        </div>
      </section>

      {/* CTA flottant (boost conv.) */}
      {showFloatingCta && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:px-0">
          <div className="mx-auto max-w-3xl">
            <div
              className="rounded-2xl border backdrop-blur-md bg-white/85 shadow-xl flex items-center justify-between gap-3 px-4 py-3 floating-enter"
              style={{ borderColor: manaGoldBorder }}
            >
              <div className="text-sm md:text-base font-medium truncate" style={{ color: manaDark }}>
                {title}
              </div>
              <PrimaryCta href={finalCtaHref} label={props.ctaButton ?? "Discuter"} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

/* ---------- Composants internes ---------- */

function SectionDivider() {
  return (
    <div className="relative h-12">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full max-w-6xl mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${manaGoldBorder}, transparent)` }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: manaGold }} />
      </div>
    </div>
  );
}

function GlassCard({
  children,
  variant = "flat",
}: {
  children: React.ReactNode;
  variant?: "flat" | "raised";
}) {
  return (
    <div
      className={`rounded-2xl p-5 transition-transform card-hover ${
        variant === "raised" ? "shadow-md" : ""
      }`}
      style={{
        background:
          "linear-gradient(0deg, rgba(255,255,255,0.82), rgba(255,255,255,0.82))",
        backdropFilter: "blur(6px)",
        border: "1px solid",
        borderColor: manaGoldBorder,
        boxShadow: "0 1px 0 rgba(12,61,94,0.04)",
      }}
    >
      <div
        className="rounded-xl p-0.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(223,175,44,0.22), rgba(223,175,44,0.06))",
        }}
      >
        <div className="rounded-[10px] bg-white/90 p-4">{children}</div>
      </div>
    </div>
  );
}

function GlassRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border p-3 flex items-center gap-3 transition-all card-hover"
      style={{
        borderColor: manaGoldBorder,
        backgroundColor: manaGoldBg,
        backdropFilter: "blur(4px)",
      }}
    >
      {children}
    </div>
  );
}

function PrimaryCta({
  href,
  label,
  size = "md",
}: {
  href: string;
  label: string;
  size?: "md" | "lg";
}) {
  return (
    <Button
      asChild
      size={size === "lg" ? "lg" : "default"}
      className="shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-4"
      style={{
        backgroundColor: manaGold,
        color: "#0B2236",
        boxShadow: "0 10px 30px rgba(223,175,44,0.35), 0 2px 6px rgba(12,61,94,0.08)",
        fontWeight: 700,
      }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Discuter de votre contexte">
        {label}
        <Calendar className="ml-2 h-5 w-5" />
      </a>
    </Button>
  );
}

/* ---------- CSS inline (no deps) ---------- */

const noiseDataUrl =
  "url('data:image/svg+xml;utf8,\
<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\
<filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1.2\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter>\
<rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.9\"/>\
</svg>')";

const cssEnhance = `
  .section-title{
    color:${manaDark};
    text-align:center;
    font-weight:800;
    letter-spacing:-0.01em;
    font-size:1.5rem;
  }
  @media (min-width:768px){
    .section-title{ font-size:1.75rem; }
  }
  .card-hover{ will-change: transform, box-shadow; }
  .card-hover:hover{ transform: translateY(1px); }
  .glow{
    box-shadow: 0 0 0 6px rgba(223,175,44,0.08), 0 8px 24px rgba(223,175,44,0.20);
  }
  /* Entrées douces du hero */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-fade{ animation: fadeUp .6s ease-out both; }
  .hero-fade-delayed{ animation: fadeUp .7s .05s ease-out both; }
  @media (prefers-reduced-motion: reduce) {
    .hero-fade, .hero-fade-delayed, .floating-enter { animation: none !important; }
  }
  .floating-enter{ animation: fadeUp .35s ease-out both; }
`;