import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, Sparkles, Star, Zap } from "lucide-react";

/**
 * FormationLayout — Manacademy Premium
 * Design ultra-professionnel avec :
 * - Hero sophistiqué avec halos décoratifs multiples et gradients complexes
 * - Cards premium avec backdrop-blur avancé et micro-animations
 * - CTA unique optimisé pour éviter les répétitions
 * - Effets visuels de haute qualité et transitions fluides
 * - Direction artistique UX/UI de niveau professionnel
 */

// Tokens DA Manacademy Premium
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

      {/* HERO PREMIUM */}
      <section className="relative py-24 overflow-hidden" style={{ 
        background: `linear-gradient(135deg, 
          rgba(252, 248, 240, 0.95), 
          rgba(248, 245, 235, 0.98), 
          rgba(250, 247, 240, 0.96)
        )`
      }}>
        {/* Halos décoratifs multiples avec couleurs enrichies */}
        <div className="absolute inset-0 -z-10">
          {/* Halo principal avec gradient multicolore enrichi */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1400px 600px at 50% 0%, rgba(223,175,44,0.35), rgba(113,192,136,0.12), rgba(252,248,240,0.8) 70%)",
            }}
          />
          {/* Halos secondaires colorés avec intensité augmentée */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: manaGold }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-12 blur-3xl"
            style={{ backgroundColor: manaDark }}
          />
          {/* Nouveau halo vert subtil renforcé */}
          <div
            className="absolute top-1/2 right-1/6 w-64 h-64 rounded-full opacity-8 blur-3xl"
            style={{ backgroundColor: '#71c088' }}
          />
          {/* Texture subtile pour plus de profondeur */}
          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{ backgroundImage: noiseDataUrl }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center">
          {badge && (
            <div className="mb-8 flex justify-center">
              <div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105"
                style={{ 
                  background: `linear-gradient(135deg, ${manaGold}18, rgba(113,192,136,0.08))`,
                  borderColor: `${manaGold}35`,
                  boxShadow: `0 8px 32px ${manaGold}25, 0 4px 16px rgba(113,192,136,0.1)`
                }}
              >
                <Sparkles className="h-5 w-5" style={{ color: manaGold }} />
                <span className="text-sm font-semibold tracking-wide" style={{ color: manaDark }}>
                  {badge}
                </span>
              </div>
            </div>
          )}

          <h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-8 tracking-tight hero-fade"
            style={{ color: manaDark }}
          >
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed hero-fade-delayed mb-12">
            {summary}
          </p>

          {/* Meta info premium */}
          {meta.length > 0 && (
            <div className="mb-12 flex flex-wrap justify-center gap-4 text-sm hero-fade-delayed">
              {meta.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-2xl border px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: `${manaGold}30`, 
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(223,175,44,0.05))`,
                    boxShadow: `0 4px 16px rgba(223, 175, 44, 0.15), 0 2px 8px rgba(113,192,136,0.08)`
                  }}
                >
                  <m.icon className="h-5 w-5 mr-3" style={{ color: manaGold }} />
                  <span style={{ color: manaDark, fontWeight: '500' }}>{m.text}</span>
                </span>
              ))}
            </div>
          )}

          {/* CTA Principal Premium */}
          <div className="hero-fade-delayed">
            <PremiumCta href={finalCtaHref} label={props.ctaButton ?? ctaButton} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* POURQUOI - Section Premium */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50/50 relative">
        {/* Halos décoratifs subtils */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{ backgroundColor: manaGold }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="section-title mb-12">{whyTitle}</h2>
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border" style={{ borderColor: `${manaGold}20` }}>
              <p className="text-lg text-muted-foreground leading-relaxed">{whyText}</p>
            </div>

            {pills.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-6" style={{ color: manaDark }}>Points clés</h3>
                {pills.map((b, i) => (
                  <GlassRow key={i}>
                    <b.icon className="h-6 w-6 flex-shrink-0" style={{ color: manaGold }} />
                    <span className="text-sm font-medium" style={{ color: manaDark }}>
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

      {/* SECTION CONTACT PREMIUM - Remplace CTA final redondant */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Halos lumineux sophistiqués */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: manaGold }}
          />
          <div 
            className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: '#4f46e5' }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            <Zap className="h-5 w-5" style={{ color: manaGold }} />
            <span className="text-sm font-semibold tracking-wide text-white">
              Formation sur-mesure
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {ctaTitle || "Créons votre formation idéale"}
          </h3>
          
          {props.ctaText !== "" && ctaText && (
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              {ctaText}
            </p>
          )}
          
          <PremiumCta href={finalCtaHref} label={props.ctaButton ?? "Discuter"} size="lg" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- Composants internes ---------- */

function SectionDivider() {
  return (
    <div className="relative h-16 flex items-center justify-center">
      {/* Ligne principale avec gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="h-px w-full max-w-6xl mx-auto" 
          style={{ 
            background: `linear-gradient(90deg, transparent, ${manaGold}60, ${manaGold}, ${manaGold}60, transparent)` 
          }} 
        />
      </div>
      
      {/* Ornement central premium */}
      <div className="relative z-10 flex items-center justify-center">
        <div 
          className="h-4 w-4 rounded-full border-2 bg-white shadow-lg" 
          style={{ borderColor: manaGold }}
        >
          <div 
            className="h-2 w-2 rounded-full m-0.5" 
            style={{ backgroundColor: manaGold }}
          />
        </div>
      </div>
      
      {/* Halos décoratifs */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-8 rounded-full opacity-20 blur-xl"
        style={{ backgroundColor: manaGold }}
      />
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
      className={`group relative rounded-3xl p-6 transition-all duration-500 card-hover ${
        variant === "raised" ? "hover:shadow-2xl hover:-translate-y-2" : "hover:shadow-xl hover:-translate-y-1"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: `${manaGold}20`,
        boxShadow: `0 8px 32px rgba(223,175,44,0.15), 0 1px 0 rgba(255,255,255,0.8) inset`,
      }}
    >
      {/* Halo interne au hover */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${manaGold}08, transparent 60%)`,
        }}
      />
      
      {/* Contour doré premium */}
      <div
        className="relative rounded-2xl p-1"
        style={{
          background: `linear-gradient(135deg, ${manaGold}25, ${manaGold}10, ${manaGold}25)`,
        }}
      >
        <div className="rounded-xl bg-white/95 backdrop-blur-sm p-5 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

function GlassRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="group rounded-2xl border p-4 flex items-center gap-4 transition-all duration-300 card-hover hover:shadow-lg"
      style={{
        borderColor: `${manaGold}25`,
        backgroundColor: `rgba(255, 255, 255, 0.9)`,
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 16px ${manaGold}10`,
      }}
    >
      {/* Effet de brillance au hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${manaGold}05, transparent 50%)`,
        }}
      />
      <div className="relative z-10 flex items-center gap-4 w-full">
        {children}
      </div>
    </div>
  );
}

function PremiumCta({
  href,
  label,
  size = "lg",
}: {
  href: string;
  label: string;
  size?: "md" | "lg";
}) {
  return (
    <Button
      asChild
      size={size === "lg" ? "lg" : "default"}
      className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4"
      style={{
        background: `linear-gradient(135deg, ${manaGold}, #d4a029)`,
        color: "white",
        boxShadow: `0 16px 40px ${manaGold}45, 0 4px 16px rgba(12,61,94,0.15), 0 2px 8px rgba(113,192,136,0.1)`,
        fontWeight: 600,
        padding: size === "lg" ? "16px 32px" : "12px 24px",
        fontSize: size === "lg" ? "18px" : "16px",
        borderRadius: "16px",
        border: `1px solid ${manaGold}40`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #c4941f, #b8851a)';
        e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${manaGold}, #d4a029)`;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Discuter de votre contexte">
        <span className="relative z-10 flex items-center gap-3">
          <Star className="h-5 w-5" />
          {label}
          <Calendar className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
        {/* Effet de brillance au hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
    letter-spacing:-0.02em;
    font-size:1.75rem;
    position: relative;
  }
  @media (min-width:768px){
    .section-title{ font-size:2.25rem; }
  }
  .section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${manaGold}, transparent);
    border-radius: 2px;
  }
  .card-hover{ will-change: transform, box-shadow; transition: all 0.3s ease; }
  .card-hover:hover{ transform: translateY(-4px); }
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
