// src/pages/Resources.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

const Resources = () => {
  const { t } = useTranslation();
  const [openPdf, setOpenPdf] = useState<string | null>(null);
  const handleOpenPdf = (path: string) => setOpenPdf(path);

  // Badges depuis i18n (avec fallback)
  const badges =
    (t("resourcesPage.hero.badges", { returnObjects: true }) as string[]) ||
    ["Designed for clarity", "Actionable resources", "Always up to date"];

  return (
    <div className="min-h-screen bg-background text-[#0c3d5e]">
      <Navigation />

  {/* Hero Section */}
  <section className="relative overflow-hidden pt-24 pb-12">
        {/* halos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-manamind to-manamind-dark opacity-30 blur-3xl" />
          <div className="absolute -bottom-32 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          {/* badge décoratif */}
          <div className="inline-flex items-center gap-2 bg-manamind/10 text-manamind-dark px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeInUp">
            <Sparkles className="h-4 w-4" />
            <span>{t("resourcesPage.hero.badge", "Resources & Insights")}</span>
          </div>

          {/* titre principal */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            {t("resourcesPage.hero.titlePrefix", "The")}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5e] via-manamind to-[#0c3d5e]">
              {t("resourcesPage.hero.titleHighlight", "Mana")}
            </span>{" "}
            {t("resourcesPage.hero.titleSuffix", "Resource Center")}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            {t("resourcesPage.hero.subtitle1", "Your hub for mastering innovation and project excellence 🚀")}
          </p>
          <p className="text-lg text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            {t("resourcesPage.hero.subtitle2", "Tools, academic content, and exclusive publications to support your journey.")}
          </p>

          {/* badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {badges.map((b, i) => (
              <span
                key={i}
                className="rounded-full border border-[#0c3d5e]/15 bg-[#0c3d5e]/5 px-3 py-1 text-sm text-[#0c3d5e]/90"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

  {/* Main Cards */}
  <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Toolsheets & Academic Content */}
            <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <CardHeader className="relative z-10 text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manacademy to-manacademy-dark flex items-center justify-center shadow-md">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#0c3d5e]">
                  {t("resourcesPage.cards.academic.title", "Toolsheets and Academic Content")}
                </CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/80">
                  {t("resourcesPage.cards.academic.description", "Templates, toolsheets, and comprehensive learning materials")}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary text-white hover:opacity-90"
                >
                  <Link to="/resources/academic">
                    {t("resourcesPage.cards.academic.button", "Browse resources")}
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Articles & Publications */}
            <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <CardHeader className="relative z-10 text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manamind to-manamind-dark flex items-center justify-center shadow-md">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#0c3d5e]">
                  {t("resourcesPage.cards.publications.title", "Articles & Publications")}
                </CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/80">
                  {t("resourcesPage.cards.publications.description", "Analyses, studies and viewpoints to go further")}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary text-white hover:opacity-90"
                >
                  <Link to="/publications">
                    {t("resourcesPage.cards.publications.button", "View publications")}
                    <FileText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* --- NOUVELLE BOX PLEIN-LARGEUR : RESSOURCES MANAMIND --- */}
            <Card className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-manamind to-manamind-dark flex items-center justify-center shadow-md">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#0c3d5e]">
                  <span className="inline-flex items-center gap-2 justify-center">
                    {/* Keep the prefix text, then show logo instead of the word "Manamind" */}
                    <span>{t("resourcesPage.cards.manamind.titlePrefix", "Resources for")}</span>
                    <img src="/Manamindsanslogo.png" alt="Manamind" className="h-[4.5rem] w-auto object-contain" style={{ transform: 'translateX(-2mm)' }} />
                  </span>
                </CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/80">
                  {t("resourcesPage.cards.manamind.description", "Access Manamind’s dedicated library: guides, methods, and exclusive content.")}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary text-white hover:opacity-90"
                >
                  <a
                    href="https://www.manamind.fr/ressources"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("resourcesPage.cards.manamind.button", "Visit manamind.fr/ressources")}
                    <Sparkles className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>

              {/* arrière-plan décoratif léger */}
              <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-manamind via-transparent to-transparent" />
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Footer */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#0c3d5e]/80">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <button
                type="button"
                className="hover:text-primary transition-colors"
                onClick={() => handleOpenPdf("/pdfs/FR_EN_CGU_202409024.pdf")}
              >
                {t("resourcesPage.legal.terms", "To consult our Terms & Conditions, please click here")}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <button
                type="button"
                className="hover:text-primary transition-colors"
                onClick={() =>
                  handleOpenPdf("/pdfs/FR_EN_POLITIQUE-DE-PROTECTION-DES-DONNEES.pdf")
                }
              >
                {t("resourcesPage.legal.privacy", "To find out more about our privacy policy, please click here")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Dialog */}
      <Dialog open={!!openPdf} onOpenChange={() => setOpenPdf(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{t("resourcesPage.dialog.title", "Document preview")}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {openPdf && (
              <iframe className="w-full h-full" src={openPdf} title="PDF preview" />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Resources;
