import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PartnerCarousel from "@/components/PartnerCarousel";
import { Brain, Users, BarChart3, ExternalLink, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Testimonial = {
  content: string;
  author: string;
  role?: string;
};

const Manamind = () => {
  const { t } = useTranslation();

  // Témoignages récupérés via i18n
  const testimonials = t("manamindPage.testimonials", {
    returnObjects: true,
    defaultValue: [],
  }) as Testimonial[];

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Carousel state
  const [idx, setIdx] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);
  const INTERVAL = 9000;

  const goNext = () => setIdx((i) => (i + 1) % testimonials.length);
  const goPrev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    autoplayRef.current && window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(goNext, INTERVAL) as unknown as number;
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, idx, testimonials.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-manamind-light via-white to-manamind-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-manamind/10 text-manamind-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Brain className="h-4 w-4" />
                <span>{t("manamindPage.hero.badge", "Build Skills, Drive Innovation")}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-[#0C3D5E] mb-6 leading-tight">
                {t("manamindPage.hero.titlePrefix", "L'expérience d'apprentissage innovante qui")}
                <span className="text-manamind">
                  {" "}
                  {t("manamindPage.hero.highlight", "booste l'engagement")}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("manamindPage.hero.subtitle", "Application pour créer, animer et suivre des parcours pédagogiques sur mesure.")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="manamind" size="lg" asChild>
                  <a href="https://www.manamind.fr" target="_blank" rel="noopener noreferrer">
                    {t("manamindPage.hero.buttons.discover", "Découvrir Manamind")}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://app.manamind.fr" target="_blank" rel="noopener noreferrer">
                    {t("manamindPage.hero.buttons.login", "Se connecter")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="fade-in-up stagger-2 relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 floating-animation">
                <div className="space-y-4">
                  <div className="h-4 bg-manamind/20 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="grid grid-cols-3 gap-4 my-6">
                    <div className="h-20 bg-manamind/10 rounded-lg flex items-center justify-center">
                      <Brain className="h-8 w-8 text-manamind" />
                    </div>
                    <div className="h-20 bg-manamind/10 rounded-lg flex items-center justify-center">
                      <Users className="h-8 w-8 text-manamind" />
                    </div>
                    <div className="h-20 bg-manamind/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-manamind" />
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trois piliers */}
      <section className="py-16 bg-gradient-to-r from-manamind to-manamind-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("manamindPage.pillars.title", "Trois piliers pour transformer l'apprentissage")}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t("manamindPage.pillars.subtitle", "Une approche complète qui adresse tous les besoins de l'écosystème éducatif")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up stagger-1">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("manamindPage.pillars.pillar1.title", "Pilotage pour les encadrants")}</h3>
              <p className="text-white/90">{t("manamindPage.pillars.pillar1.text", "Outils de suivi en temps réel...")}</p>
            </div>

            <div className="text-center fade-in-up stagger-2">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("manamindPage.pillars.pillar2.title", "Expérience pour les apprenants")}</h3>
              <p className="text-white/90">{t("manamindPage.pillars.pillar2.text", "Interface engageante, parcours personnalisés...")}</p>
            </div>

            <div className="text-center fade-in-up stagger-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("manamindPage.pillars.pillar3.title", "Auditabilité pour les institutions")}</h3>
              <p className="text-white/90">{t("manamindPage.pillars.pillar3.text", "Reporting complet, certification des acquis...")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ils nous font confiance */}
      <section className="py-12 bg-[#0C3D5E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PartnerCarousel />
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E] mb-4">
              {t("manamindPage.testimonialsTitle", "Ce que disent nos utilisateurs")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("manamindPage.testimonialsSubtitle", "Des retours concrets sur l’impact de Manamind :")}
            </p>
          </div>

          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {testimonials.length > 0 && (
              <div className="rounded-2xl border bg-white/90 backdrop-blur p-8 shadow-lg transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-manamind/15 text-[#0C3D5E] font-bold flex items-center justify-center shrink-0">
                    {getInitials(testimonials[idx].author)}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-[#0C3D5E] italic leading-relaxed">
                      “{testimonials[idx].content}”
                    </p>
                    <div className="mt-4">
                      <div className="text-sm font-semibold text-[#0C3D5E]">{testimonials[idx].author}</div>
                      {testimonials[idx].role && (
                        <div className="text-xs text-[#0C3D5E]/70">{testimonials[idx].role}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Témoignage ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === idx ? "w-6 bg-manamind" : "w-2 bg-manamind/30 hover:bg-manamind/60"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-manamind/40 text-[#0C3D5E] hover:bg-manamind/10"
                  onClick={goPrev}
                >
                  {t("manamindPage.testimonialsPrev", "Précédent")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-manamind/40 text-[#0C3D5E] hover:bg-manamind/10"
                  onClick={goNext}
                >
                  {t("manamindPage.testimonialsNext", "Suivant")}
                </Button>
              </div>
            </div>
            <div className="mt-2 text-center text-xs text-[#0C3D5E]/60">
              {t("manamindPage.testimonialsHint", "Astuce : survolez pour mettre en pause la lecture automatique.")}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-manamind-light to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3D5E] mb-6">
            {t("manamindPage.finalCta.title", "Prêt à transformer votre pédagogie ?")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("manamindPage.finalCta.subtitle", "Rejoignez les institutions qui utilisent déjà Manamind...")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="manamind" size="xl" asChild>
              <a href="https://www.manamind.fr" target="_blank" rel="noopener noreferrer">
                {t("manamindPage.finalCta.buttons.discover", "Découvrir Manamind")}
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="https://calendar.app.google/gcDBoWYsL3MKQX9r5" target="_blank" rel="noopener noreferrer">
                {t("manamindPage.finalCta.buttons.demo", "Demander une démo")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manamind;
