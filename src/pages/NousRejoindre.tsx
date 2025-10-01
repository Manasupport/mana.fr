import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Target,
  TrendingUp,
  Heart,
  Zap,
  Rocket,
  Send,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Handshake,
  Users,
  Award,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  photo: string;
};

const NousRejoindre = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    cv: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  // Témoignages depuis i18n (fallback = [])
  const testimonials: Testimonial[] =
    ((t("joinPage.testimonials.items", { returnObjects: true }) as unknown) as Testimonial[]) ||
    [];

  useEffect(() => {
    setIsVisible(true);
    if (testimonials.length === 0) return; // évite modulo 0
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let cvBase64 = null;
      let cvName = null;
      
      // Convertir le fichier en base64 si présent
      if (formData.cv) {
        cvName = formData.cv.name;
        const reader = new FileReader();
        cvBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(formData.cv!);
        });
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'nous-rejoindre',
          formData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            message: formData.message,
            cvFileName: cvName,
            cvBase64: cvBase64
          }
        }),
      });

      if (response.ok) {
        toast(t("joinPage.form.toasts.successTitle", "Candidature envoyée"), {
          description: t("joinPage.form.toasts.successDesc", "Votre candidature a été envoyée avec succès. Nous vous recontacterons rapidement."),
        });

        // Réinitialiser le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          cv: null,
        });
        const fileInput = document.getElementById("cv") as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Erreur", {
        description: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
      });
    }
  };

  const goToPrevious = () => {
    if (testimonials.length === 0) return;
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    if (testimonials.length === 0) return;
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Cartes “Pourquoi nous rejoindre ?” (structure depuis i18n)
  const whyCards =
    ((t("joinPage.why.cards", { returnObjects: true }) as unknown) as {
      icon: "zap" | "target" | "heart" | "trending";
      title: string;
      text: string;
      color: string;
    }[]) || [];

  const iconFor = (name: string) => {
    switch (name) {
      case "zap":
        return <Handshake className="h-8 w-8 text-white" />;
      case "target":
        return <Users className="h-8 w-8 text-white" />;
      case "heart":
        return <Heart className="h-8 w-8 text-white" />;
      case "trending":
        return <Award className="h-8 w-8 text-white" />;
      default:
        return <Handshake className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-[#0c3d5e]">
      <Navigation />
      
  {/* HERO */}
  <section className="pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-28 bg-gradient-to-br from-[#ffedd5] to-[#fff7ed]" />
          <div className="absolute -bottom-20 -right-20 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-18 bg-gradient-to-br from-manamind to-manamind-dark" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div
            className={`transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full px-4 py-1.5 bg-white/85 backdrop-blur-sm border border-white/60 shadow-sm">
              <Sparkles className="h-5 w-5 text-manamind" />
              <span className="text-sm font-medium">
                {t("joinPage.hero.badge", "Rejoins une équipe qui innove pour de vrai")}
              </span>
            </div>

            {/* Title with solid site color for better contrast over this background */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-[#0c3d5e]">
              {t("joinPage.hero.title", "Tu as le Mana ?")}
            </h1>

            <p className="text-xl md:text-2xl text-[#0c3d5e]/90 mb-6 max-w-3xl mx-auto">
              {t("joinPage.hero.subtitle", "Rejoins la Manateam dès maintenant")}
            </p>

            <div className="flex items-center justify-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="px-8 py-3 bg-[#083147] hover:bg-[#0c3d5e] text-white shadow-lg transition-colors"
              >
                {t("joinPage.cta.apply", "Postuler")}
              </Button>
            </div>
          </div>
        </div>
      </section>

  {/* Pourquoi rejoindre Mana */}
  <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t("joinPage.why.title", "Pourquoi rejoindre Mana ?")}
            </h2>
            <p className="text-lg text-manamind-dark">
              {t("joinPage.why.subtitle", "Énergie, exigence, bienveillance — et des projets qui comptent.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCards.map((card, i) => {
              // choose palette gradients to fit the site look
              const gradients = [
                "from-manamind to-manamind-dark",
                "from-manadvise to-manadvise-dark",
                "from-manacademy to-manacademy-dark",
                "from-primary to-secondary",
              ];

              // If the card corresponds to "L'envie de progresser" (icon 'trending' or title match),
              // force the orange hero gradient used in Articles/Publications.
              let gradient = gradients[i % gradients.length];
              if (card.icon === "trending" || (card.title && card.title.toLowerCase().includes("envie"))) {
                gradient = "from-orange-400 to-pink-500";
              }

              return (
                <Card
                  key={i}
                  className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md bg-gradient-to-br ${gradient}`}
                    >
                      {iconFor(card.icon)}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-[#0c3d5e]">
                      {card.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section
        ref={formRef}
        id="candidature"
        className="py-12 px-4 bg-gradient-to-br from-primary/10 via-white to-secondary/10 scroll-mt-28"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("joinPage.form.title", "Rejoins-nous")}</h2>

            <div className="mx-auto mb-4 max-w-2xl">
              <div className="inline-flex items-center gap-3 mx-auto mb-3">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-manamind/10 text-manamind">
                  {t("joinPage.form.lead1", "Pas d'offre formatée ici.")}
                </span>
              </div>

              <p className="text-lg md:text-xl font-semibold text-[#0c3d5e] mb-4">
                {t(
                  "joinPage.form.lead2",
                  "Mais si tu penses que tu as le Mana, on a forcément un truc à construire ensemble."
                )}
              </p>

              <div className="h-1 w-28 rounded-full mx-auto bg-gradient-to-r from-manamind to-secondary opacity-80" />
            </div>
          </div>

          <Card className="bg-white/90 backdrop-blur-xl border border-primary/10 shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">
                      {t("joinPage.form.firstNameLabel", "Prénom")} *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 text-sm focus-visible:ring-primary"
                      placeholder={t("joinPage.form.firstNamePlaceholder", "Votre prénom") as string}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">
                      {t("joinPage.form.lastNameLabel", "Nom")} *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 text-sm focus-visible:ring-secondary"
                      placeholder={t("joinPage.form.lastNamePlaceholder", "Votre nom") as string}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">
                    {t("joinPage.form.emailLabel", "Adresse mail")} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-10 text-sm focus-visible:ring-manamind"
                    placeholder={t("joinPage.form.emailPlaceholder", "votre.email@exemple.com") as string}
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    {t("joinPage.form.messageLabel", "Message libre")} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-2 min-h-[120px] text-sm focus-visible:ring-primary"
                    placeholder={t("joinPage.form.messagePlaceholder", "Parle-nous de toi, de tes envies, de ce qui te motive...") as string}
                  />
                </div>

                <div>
                  <Label htmlFor="cv">{t("joinPage.form.cvLabel", "Upload CV")}</Label>
                  <Input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="mt-2 h-12 text-base file:bg-primary/10 file:border-0 file:text-primary file:px-4"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium text-white bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary hover:opacity-90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t("joinPage.form.submit", "Envoyer ma candidature")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Manapeople — Témoignages (NOUVEAU STYLE) */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#0c3d5e] mb-3">
              {t("joinPage.testimonials.title", "Manapeople")}
            </h2>
            <p className="text-lg text-[#0c3d5e]/75">
              {t("joinPage.testimonials.subtitle", "Ils ont vécu l'expérience Mana")}
            </p>
          </div>

          <div className="relative">
            {/* Carte verre dépoli */}
            <div className="rounded-3xl bg-white/90 backdrop-blur border border-[#0c3d5e]/10 shadow-2xl px-6 py-8 md:px-10 md:py-10">
              {/* Flèches flottantes */}
              <button
                onClick={goToPrevious}
                aria-label={t("joinPage.testimonials.prevAria", "Témoignage précédent") as string}
                className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white shadow ring-1 ring-[#0c3d5e]/10 hover:ring-[#0c3d5e]/20"
              >
                <ChevronLeft className="h-6 w-6 text-[#0c3d5e]" />
              </button>
              <button
                onClick={goToNext}
                aria-label={t("joinPage.testimonials.nextAria", "Témoignage suivant") as string}
                className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white shadow ring-1 ring-[#0c3d5e]/10 hover:ring-[#0c3d5e]/20"
              >
                <ChevronRight className="h-6 w-6 text-[#0c3d5e]" />
              </button>

              {/* Témoignage affiché */}
              {testimonials.length > 0 && (
                <div
                  key={currentTestimonial} // force une petite ré-animation en changement
                  className="text-center animate-[fadeIn_.4s_ease]"
                >
                  {/* Avatar rond + halo */}
                  <div className="relative mx-auto mb-4 h-20 w-20 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
                    <img
                      src={testimonials[currentTestimonial].photo}
                      alt={testimonials[currentTestimonial].name}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <span className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full bg-gradient-to-br from-[#71c088] to-[#00a5b4] ring-2 ring-white" />
                  </div>

                  {/* Citation */}
                  <blockquote className="mx-auto max-w-4xl text-lg md:text-xl leading-relaxed text-[#0c3d5e] font-semibold italic">
                    “{testimonials[currentTestimonial].content}”
                  </blockquote>

                  {/* Auteur */}
                  <div className="mt-6">
                    <p className="text-lg font-semibold text-[#0c3d5e]">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-[#0c3d5e]/70">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>

                  {/* Barre de progression + bullets */}
                    <div className="mt-6 flex flex-col items-center gap-3">
                    {/* Progress bar (se relance à chaque key change) */}
                    <div className="h-1 w-48 md:w-64 rounded-full bg-[#0c3d5e]/12 overflow-hidden">
                      <div className="h-full bg-[#0c3d5e] animate-progress" />
                    </div>

                    {/* Bullets modernes */}
                    <div className="flex items-center justify-center gap-3">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          aria-label={`${t("joinPage.testimonials.dotAria", "Aller au témoignage")} ${index + 1}`}
                          className={`h-2.5 rounded-full transition-all ${
                            index === currentTestimonial
                              ? "w-6 bg-[#0c3d5e]"
                              : "w-2.5 bg-[#0c3d5e]/30 hover:bg-[#0c3d5e]/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* micro CSS pour l’anim */}
            <style>{`
              @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
              .animate-[fadeIn_.4s_ease] { animation: fadeIn .4s ease both; }
              @keyframes progress { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
              .animate-progress { animation: progress 5s linear both; }
            `}</style>
          </div>
        </div>
      </section>

      {/* Accroche finale */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0c3d5e] via-manamind to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl font-light mb-4">
            {t("joinPage.finalHook.line1", "Mana, ce n'est pas juste un endroit où bosser.")}
          </p>
          <p className="text-2xl font-light mb-4">
            {t("joinPage.finalHook.line2", "C'est une façon d'être, de faire, de penser.")}
          </p>
          <p className="text-2xl font-semibold mb-10">
            {t("joinPage.finalHook.line3", "Tu veux en parler avec nous ? Commence par écrire.")}
          </p>
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-white text-[#0c3d5e] hover:bg-white/90 px-8 py-4 h-auto text-lg font-semibold rounded-full shadow-md"
          >
            <Rocket className="h-5 w-5 mr-3" />
            {t("joinPage.finalHook.button", "Candidature spontanée")}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NousRejoindre;
