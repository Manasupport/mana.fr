import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EntityCard from "@/components/EntityCard";
import AnimatedStats from "@/components/AnimatedNumbers";
import { Button } from "@/components/ui/button";
import { Brain, GraduationCap, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

const Index = () => {
  const { t } = useTranslation();

  const stats = [
    { value: 65, label: t("home.stats.partners"), suffix: "+" },
    { value: 120, label: t("home.stats.projects"), suffix: "+" },
    { value: 50, label: t("home.stats.organizations"), suffix: "+" },
    { value: 700, label: t("home.stats.learnersPerYear"), suffix: "+" },
  ];

  const scrollToExpertises = () => {
    const el = document.getElementById("expertises-section");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Animation du HERO (logo → tagline → CTA)
  const heroRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const show = () => {
      hero.querySelectorAll(".reveal, .cta-appear").forEach((el) => {
        el.classList.add("is-visible");
      });
    };
    const t = setTimeout(show, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] w-full bg-white pt-[72px] pb-28 overflow-visible"
      >
        <div className="mx-auto h-full w-full flex flex-col items-center justify-start mt-6">
          {/* 1) LOGO PRINCIPAL */}
          <div
            className="
              reveal reveal--1
              w-[min(1200px,92vw)]
              h-[min(56vh,60vw)]
              flex items-center justify-center
            "
            style={{ transform: 'scale(0.65)', transformOrigin: 'center top' }} // réduire davantage et recentrer
          >
            <img
              src="/svg.png"
              alt="Mana — Meaningful Innovation"
              className="select-none pointer-events-none object-contain w-full h-full img-breath"
              draggable={false}
            />
          </div>

          {/* 2) SOUS-LOGO (svg2) */}
          <div
            className="
              reveal reveal--2
              w-[min(700px,72vw)]
              mt-2
              flex items-center justify-center
            "
          >
            <img
              src="/svg2.png"
              alt="Mana tagline"
              className="select-none pointer-events-none object-contain w-full h-auto"
              draggable={false}
            />
          </div>

          {/* 3) CTA */}
          <button
            onClick={scrollToExpertises}
            className="
              cta-appear
              mt-6 md:mt-7 lg:mt-8
              px-6 py-3 bg-[#0C3D5E] text-white font-semibold rounded-md
              hover:bg-[#0a324e] transition duration-300 shadow-md
            "
          >
            {t("home.discoverMana")}
          </button>
        </div>

        {/* Animations inline (mêmes timings/effets que l'ancien index) */}
        <style>{`
          .reveal {
            overflow: hidden;
            will-change: clip-path;
          }

          @keyframes wipe {
            from {
              clip-path: inset(0 100% 0 0 round 8px);
            }
            to {
              clip-path: inset(0 0% 0 0 round 8px);
            }
          }

          .reveal--1.is-visible {
            animation: wipe 3.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }
          .reveal--2.is-visible {
            animation: wipe 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) both 0.5s;
          }

          @keyframes breath {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-2px) scaleX(1.006) scaleY(0.996); }
            100% { transform: translateY(0) scale(1); }
          }
          .img-breath { animation: breath 6s ease-in-out 5s infinite; }

          @keyframes ctaIn {
            from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          .cta-appear.is-visible { animation: ctaIn 1s ease-out both 0.5s; }

          @media (prefers-reduced-motion: reduce) {
            .reveal--1.is-visible,
            .reveal--2.is-visible,
            .img-breath,
            .cta-appear.is-visible {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      {/* Three Entities */}
      <section id="expertises-section" className="py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0C3D5E] mb-6">
              {t("home.ecosystemTitle")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("home.ecosystemSubtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <EntityCard
              name="Manadvise"
              tagline={t("home.entities.manadvise.tagline")}
              description={t("home.entities.manadvise.description")}
              color="manadvise"
              link="/manadvise"
              icon={<Lightbulb className="h-6 w-6" />}
            />
            <EntityCard
              name="Manamind"
              tagline={t("home.entities.manamind.tagline")}
              description={t("home.entities.manamind.description")}
              color="manamind"
              link="/manamind"
              icon={<Brain className="h-6 w-6" />}
            />
            <EntityCard
              name="Manacademy"
              tagline={t("home.entities.manacademy.tagline")}
              description={t("home.entities.manacademy.description")}
              color="manacademy"
              link="/manacademy"
              icon={<GraduationCap className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0c3d5e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.impactTitle")}</h2>
            <p className="text-xl text-white/90">{t("home.impactSubtitle")}</p>
          </div>
          <AnimatedStats stats={stats} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-mana-accent/20 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E] mb-6">
            {t("home.finalCtaTitle")}
          </h2>
          <p className="text-xl text-muted-foreground mb-12">{t("home.finalCtaSubtitle")}</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Button variant="manadvise" size="lg" asChild className="w-full">
              <a href="/manadvise">
                {t("home.buttons.manadvise")}
                <Lightbulb className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="manamind" size="lg" asChild className="w-full">
              <a href="/manamind">
                {t("home.buttons.manamind")}
                <Brain className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="manacademy" size="lg" asChild className="w-full">
              <a href="/manacademy">
                {t("home.buttons.manacademy")}
                <GraduationCap className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
