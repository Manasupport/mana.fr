import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

/**
 * Layout Manacademy — Formations
 * - Esthétique premium, réplicable
 * - Titres centrés, rythme vertical régulier, halo doré subtil
 * - Cartes soignées (bords #dfaf2c33, fond #dfaf2c07)
 * - Accessibilité & focus states
 * - Sans jargon "pédagogique", termes neutres
 */

// Tokens DA Manacademy
const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

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

    // rétrocompat
    calendarHref,
  } = props;

  const finalCtaHref = ctaHref || calendarHref || "https://calendar.app.google/MHJFvXizPczcPjnB7";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Fil d’Ariane */}
      <section className="pt-24 pb-6 border-b">
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
      <section className="relative py-14">
        {/* halo doré discret */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 500px at 50% 0%, rgba(223,175,44,0.12), transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            {badge && (
              <div className="mb-4 flex justify-center">
                <Badge
                  variant="secondary"
                  className="border"
                  style={{
                    backgroundColor: `${manaGold}14`,
                    borderColor: `${manaGold}33`,
                    color: manaDark,
                  }}
                >
                  {badge}
                </Badge>
              </div>
            )}

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-center"
              style={{ color: manaDark }}
            >
              {title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {summary}
            </p>

            {/* meta */}
            {meta.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                {meta.map((m, i) => (
                  <span key={i} className="inline-flex items-center">
                    <m.icon className="h-4 w-4 mr-2" style={{ color: manaGold }} />
                    {m.text}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-4"
                style={{
                  backgroundColor: manaGold,
                  color: "#fff",
                  boxShadow:
                    "0 8px 24px rgba(223,175,44,0.35), 0 2px 6px rgba(12,61,94,0.08)",
                }}
              >
                <a
                  href={finalCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discuter de votre contexte sur notre calendrier"
                >
                  Discuter
                  <Calendar className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-[1fr,300px] gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: manaDark }}>
                {whyTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{whyText}</p>
            </div>

            {pills.length > 0 && (
              <div className="grid gap-3">
                {pills.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-3 flex items-center gap-3 transition-transform hover:translate-y-[1px]"
                    style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
                  >
                    <b.icon className="h-5 w-5" style={{ color: manaGold }} />
                    <span className="text-sm" style={{ color: manaDark }}>
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="py-14" style={{ backgroundColor: `${manaGold}08` }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: manaDark }}>
            {objectivesTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white border p-4 transition-transform hover:translate-y-[1px]"
                style={{ borderColor: `${manaGold}33` }}
              >
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: manaGold }} />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES / DÉROULÉ */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: manaDark }}>
            {modulesTitle}
          </h2>

          <div className="space-y-5">
            {modules.map((m, i) => (
              <div
                key={i}
                className="rounded-xl border p-5 transition-transform hover:translate-y-[1px]"
                style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold" style={{ color: manaDark }}>
                    {m.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      {formats.length > 0 && (
        <section className="py-14" style={{ backgroundColor: `${manaGold}08` }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: manaDark }}>
              {formatsTitle}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {formats.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-6 text-center bg-white transition-transform hover:translate-y-[1px]"
                  style={{ borderColor: `${manaGold}33` }}
                >
                  <h3 className="font-semibold text-lg mb-2" style={{ color: manaDark }}>
                    {f.name}
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {f.lines.map((l, k) => (
                      <div key={k}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CAS D’USAGE */}
      {useCases.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: manaDark }}>
              {useCasesTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((u, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-4 flex items-start gap-3 transition-transform hover:translate-y-[1px]"
                  style={{ borderColor: `${manaGold}33`, backgroundColor: `${manaGold}07` }}
                >
                  <MessageSquare className="h-5 w-5 mt-0.5" style={{ color: manaGold }} />
                  <p className="text-muted-foreground">{u}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="py-16 bg-white relative">
        {/* halo doré subtil */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 300px at 50% 0%, rgba(223,175,44,0.12), transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3
            className="text-2xl md:text-3xl font-bold mb-3 text-center"
            style={{ color: manaDark }}
          >
            {ctaTitle}
          </h3>
          {ctaText && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {ctaText}
            </p>
          )}

          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-4"
            style={{
              backgroundColor: manaGold,
              color: "#fff",
              boxShadow:
                "0 8px 24px rgba(223,175,44,0.35), 0 2px 6px rgba(12,61,94,0.08)",
            }}
          >
            <a
              href={finalCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discuter de votre contexte sur notre calendrier"
            >
              {/** on force « Discuter » si besoin pour cohérence branding */}
              {props.ctaButton ?? "Discuter"}
              <Calendar className="ml-2 h-5 w-5" />
            </a>
          </Button>

          <div className="mt-4">
            <a
              href={finalCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
              style={{ color: manaDark }}
            >
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}