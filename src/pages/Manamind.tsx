import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PartnerCarousel from "@/components/PartnerCarousel";
import { Brain, Users, BarChart3, ExternalLink, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/** Tokens de marque */
const manaDark = "#0C3D5E";
const manaMind = "#71c088"; // couleur Manamind
const manaMindDark = "#3f7f68";

type Testimonial = {
  content: string;
  author: string;
  role?: string;
};

const Manamind = () => {
  const { t } = useTranslation();

  // Témoignages via i18n
  const testimonials = t("manamindPage.testimonials", {
    returnObjects: true,
    defaultValue: [],
  }) as Testimonial[];

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Carousel
  const [idx, setIdx] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);
  const INTERVAL = 9000;
  const goNext = () => setIdx((i) => (i + 1) % testimonials.length);
  const goPrev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    autoplayRef.current && window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(goNext, INTERVAL) as unknown as number;
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, idx, testimonials.length]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Halos & grain globaux */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-52 -left-40 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-60"
          style={{ background: `radial-gradient(circle, ${manaMind}22 0%, ${manaMind}08 50%, transparent 100%)` }}
        />
        <div
          className="absolute -bottom-64 -right-40 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-40"
          style={{ background: `radial-gradient(circle, ${manaDark}15 0%, ${manaDark}05 50%, transparent 100%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='19' cy='19' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Navigation />

     {/* HERO — taille visuel fixée + pas de rognage du titre */}
    <section
      className="relative pt-32 pb-20"
      // on enlève overflow-hidden pour éviter tout clipping vertical du titre
      // style visuel inchangé
    >
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-95 -z-10"
        style={{
          background: `linear-gradient(135deg, ${manaDark}08 0%, white 25%, ${manaMind}12 75%, white 100%)`,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Colonne gauche */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: `${manaMind}14`, borderColor: `${manaMind}33`, boxShadow: `0 4px 20px ${manaMind}25` }}
            >
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: manaMind }} />
              <Brain className="h-5 w-5" style={{ color: manaMind }} />
              <span className="text-sm font-semibold tracking-wide" style={{ color: manaDark }}>
                {t("manamindPage.hero.badge", "Build Skills, Drive Innovation")}
              </span>
            </div>

            {/* Fix rognage : on évite leading-tight qui coupe les descendantes avec bg-clip-text */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0C3D5E] mb-6 leading-tight">
                {t("manamindPage.hero.titlePrefix", "L'expérience d'apprentissage innovante qui")}
                <span className="text-manamind">
                  {" "}
                  {t("manamindPage.hero.highlight", "booste l'engagement")}
                </span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              {t(
                "manamindPage.hero.subtitle",
                "Application pour créer, animer et suivre des parcours pédagogiques sur mesure."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="manamind"
                size="lg"
                asChild
                className="group px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ boxShadow: `0 8px 25px ${manaMind}35` }}
              >
                <a href="https://www.manamind.fr" target="_blank" rel="noopener noreferrer">
                  {t("manamindPage.hero.buttons.discover", "Découvrir Manamind")}
                  <ExternalLink className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-6 text-lg font-medium rounded-2xl border-2 transition-all duration-300 hover:scale-105"
                style={{ borderColor: `${manaDark}25`, color: manaDark }}
              >
                <a href="https://app.manamind.fr" target="_blank" rel="noopener noreferrer">
                  {t("manamindPage.hero.buttons.login", "Se connecter")}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Colonne droite — visuel GRAND, comme sur ton screen 1 */}
          <div className="relative lg:justify-end flex">
            <div className="relative">
              {/* bulles décoratives */}
              <div
                className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-25"
                style={{ backgroundColor: manaMind }}
              />
              <div
                className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-20"
                style={{ backgroundColor: manaDark }}
              />

              {/* Carte maquette : largeur accrue + ratio + shadow */}
              <div
                className="
                  relative bg-white rounded-3xl shadow-2xl
                  p-8
                  transition-transform duration-500
                "
                style={{
                  // 👇 dimensions proches du rendu “grand” du 1er screen
                  width: "680px",          // force la largeur visuelle
                  maxWidth: "42vw",        // garde la responsivité sur grands écrans
                  minWidth: "520px",       // évite qu'elle ne devienne petite
                  aspectRatio: "16 / 9",   // ratio stable
                  boxShadow: "0 40px 80px rgba(12,61,94,0.20)",
                }}
              >
                {/* “UI phantom” */}
                <div className="space-y-4">
                  <div className="h-4 rounded w-3/4" style={{ backgroundColor: `${manaMind}20` }} />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="grid grid-cols-3 gap-4 my-6">
                    <div className="h-24 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${manaMind}12` }}>
                      <Brain className="h-9 w-9" style={{ color: manaMind }} />
                    </div>
                    <div className="h-24 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${manaMind}12` }}>
                      <Users className="h-9 w-9" style={{ color: manaMind }} />
                    </div>
                    <div className="h-24 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${manaMind}12` }}>
                      <BarChart3 className="h-9 w-9" style={{ color: manaMind }} />
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      {/* Trois piliers — cartes premium */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: manaDark }}>
              {t("manamindPage.pillars.title", "Trois piliers pour transformer l'apprentissage")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t(
                "manamindPage.pillars.subtitle",
                "Une approche complète qui adresse tous les besoins de l'écosystème éducatif"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                titleKey: "manamindPage.pillars.pillar1.title",
                textKey: "manamindPage.pillars.pillar1.text",
                titleFallback: "Pilotage pour les encadrants",
                textFallback: "Outils de suivi en temps réel...",
              },
              {
                icon: Brain,
                titleKey: "manamindPage.pillars.pillar2.title",
                textKey: "manamindPage.pillars.pillar2.text",
                titleFallback: "Expérience pour les apprenants",
                textFallback: "Interface engageante, parcours personnalisés...",
              },
              {
                icon: BarChart3,
                titleKey: "manamindPage.pillars.pillar3.title",
                textKey: "manamindPage.pillars.pillar3.text",
                titleFallback: "Auditabilité pour les institutions",
                textFallback: "Reporting complet, certification des acquis...",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="group relative p-8 rounded-3xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white"
                  style={{ borderColor: `${manaMind}22` }}
                >
                  <div className="absolute top-0 left-8 h-1 w-16 rounded-full" style={{ backgroundColor: manaMind }} />
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${manaMind}15`, border: `1px solid ${manaMind}33` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: manaMind }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: manaDark }}>
                    {t(p.titleKey, p.titleFallback)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{t(p.textKey, p.textFallback)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ils nous font confiance — bandeau sombre */}
      <section className="py-12" style={{ backgroundColor: manaDark }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PartnerCarousel />
        </div>
      </section>

      {/* Témoignages — carte premium + bullets contrôles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: manaDark }}>
              {t("manamindPage.testimonialsTitle", "Ce que disent nos utilisateurs")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("manamindPage.testimonialsSubtitle", "Des retours concrets sur l’impact de Manamind :")}
            </p>
          </div>

          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {testimonials.length > 0 && (
              <div
                className="rounded-2xl border bg-white/90 backdrop-blur p-8 shadow-lg transition-all duration-500"
                style={{ borderColor: `${manaMind}18` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full font-bold flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${manaMind}15`, color: manaDark }}
                  >
                    {getInitials(testimonials[idx].author)}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg italic leading-relaxed" style={{ color: manaDark }}>
                      “{testimonials[idx].content}”
                    </p>
                    <div className="mt-4">
                      <div className="text-sm font-semibold" style={{ color: manaDark }}>
                        {testimonials[idx].author}
                      </div>
                      {testimonials[idx].role && (
                        <div className="text-xs" style={{ color: `${manaDark}B3` }}>
                          {testimonials[idx].role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Témoignage ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === idx ? "w-6" : "w-2"
                    }`}
                    style={{
                      backgroundColor: i === idx ? manaMind : `${manaMind}66`,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105"
                  style={{ borderColor: `${manaMind}50`, color: manaDark }}
                  onClick={goPrev}
                >
                  {t("manamindPage.testimonialsPrev", "Précédent")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105"
                  style={{ borderColor: `${manaMind}50`, color: manaDark }}
                  onClick={goNext}
                >
                  {t("manamindPage.testimonialsNext", "Suivant")}
                </Button>
              </div>
            </div>
            <div className="mt-2 text-center text-xs" style={{ color: `${manaDark}99` }}>
              {t("manamindPage.testimonialsHint", "Astuce : survolez pour mettre en pause la lecture automatique.")}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final — cohérence Manacademy */}
      <section className="py-24 bg-gradient-to-br from-[#f6fffb] to-white relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: manaDark }}>
            {t("manamindPage.finalCta.title", "Prêt à transformer votre pédagogie ?")}
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            {t("manamindPage.finalCta.subtitle", "Rejoignez les institutions qui utilisent déjà Manamind...")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="manamind"
              size="xl"
              asChild
              className="group px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ boxShadow: `0 12px 30px ${manaMind}35` }}
            >
              <a href="https://www.manamind.fr" target="_blank" rel="noopener noreferrer">
                {t("manamindPage.finalCta.buttons.discover", "Découvrir Manamind")}
                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="px-10 py-6 text-xl font-medium rounded-2xl border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: `${manaDark}25`, color: manaDark }}
            >
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
