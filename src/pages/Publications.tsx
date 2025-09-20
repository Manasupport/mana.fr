import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

/** Miniature = même nom que le PDF mais en .jpg, dans le même dossier /pdfs/ */
const coverFromPdf = (pdfUrl: string) => pdfUrl.replace(/\.pdf$/i, ".jpg");

const Publications = () => {
  const { t } = useTranslation();

  // Filtres
  const [selectedThematic, setSelectedThematic] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const thematics = ["Innovation", "Stratégie", "RSE", "Data & IA", "Autres"];
  const contentTypes = ["Article", "Étude", "Insight", "Note de recherche", "Cas d'étude", "Rapport", "Guide", "Cours"];
  const durations = ["Rapide (<5min)", "Approfondi (5-10min)", "Long (>10min)"];

  // Données
  const articles = [
    {
      id: 1,
      title:
        "Pour Bingewatcher House of Innovations, consulter notre Managuide des méthodes et outils d'innovation",
      excerpt:
        "Un guide complet des méthodologies d'innovation pour transformer vos idées en solutions concrètes.",
      thematic: "Innovation",
      type: "Guide",
      slug: "managuide-innovation",
      pdfUrl: "/pdfs/managuide-de-l-innovation.pdf",
    },
    {
      id: 2,
      title: "The Future of Luxury",
      excerpt:
        "Une analyse prospective des tendances qui façonnent l'avenir du secteur du luxe à l'ère numérique.",
      thematic: "Stratégie",
      type: "Article",
      slug: "future-of-luxury",
      pdfUrl: "/pdfs/the-future-of-luxury.pdf",
    },
    {
      id: 3,
      title:
        "Autoconsommation collective : quelle gouvernance pour un système énergétique décentralisé ?",
      excerpt:
        "Exploration des modèles de gouvernance pour une transition énergétique collaborative et durable.",
      thematic: "RSE",
      type: "Étude",
      slug: "autoconsommation-collective",
      pdfUrl: "/pdfs/autoconsommation-collective.pdf",
    },
    {
      id: 4,
      title:
        "The Value Wheel: a strategic tool to measure value creation beyond financial metrics",
      excerpt:
        "Un outil innovant pour évaluer la création de valeur holistique dans les organisations modernes.",
      thematic: "Stratégie",
      type: "Article",
      slug: "value-wheel-tool",
      pdfUrl: "/pdfs/value-wheel.pdf",
    },
    {
      id: 5,
      title: "Sustainable cities: an inter-disciplinary challenge",
      excerpt:
        "Une approche interdisciplinaire pour repenser l'urbanisme et construire les villes de demain.",
      thematic: "RSE",
      type: "Étude",
      slug: "sustainable-cities",
      pdfUrl: "/pdfs/sustainable-cities.pdf",
    },
    {
      id: 6,
      title: "Operational Efficiency at EM Normandie",
      excerpt:
        "Retour d'expérience sur l'optimisation des processus opérationnels dans l'enseignement supérieur.",
      thematic: "Stratégie",
      type: "Cours",
      slug: "operational-efficiency-em",
      pdfUrl: "/pdfs/operational-efficiency-em.pdf",
    },
    {
      id: 7,
      title: "Saison Spring 2021 : Un succès renouvelé",
      excerpt:
        "Analyse des facteurs clés de succès d'une saison exceptionnelle malgré les défis sanitaires.",
      thematic: "Stratégie",
      type: "Cours",
      slug: "spring-2021-success",
      pdfUrl: "/pdfs/spring-2021-success.pdf",
    },
    {
      id: 9,
      title: "Consultant Behaviour at ESCP Business School",
      excerpt:
        "Analyse comportementale des consultants junior et identification des leviers de performance.",
      thematic: "Stratégie",
      type: "Cours",
      slug: "consultant-behaviour-escp",
      pdfUrl: "/pdfs/consultant-behaviour-escp.pdf",
    },
    {
      id: 10,
      title: "Les archétypes d'entreprises innovantes",
      excerpt:
        "Typologie des modèles organisationnels qui favorisent l'innovation et la créativité en entreprise.",
      thematic: "Innovation",
      type: "Article",
      slug: "archetypes-entreprises-innovantes",
      pdfUrl: "/pdfs/archetypes-entreprises-innovantes.pdf",
    },
  ];

  const getThematicColor = (thematic: string) => {
    switch (thematic) {
      case "Innovation":
        return "bg-manamind/10 text-manamind border-manamind/20";
      case "Stratégie":
        return "bg-manadvise/10 text-manadvise border-manadvise/20";
      case "RSE":
        return "bg-manacademy/10 text-manacademy border-manacademy/20";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const okTheme = !selectedThematic || article.thematic === selectedThematic;
        const okType = !selectedType || article.type === selectedType;
        return okTheme && okType;
      }),
    [articles, selectedThematic, selectedType]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO — plus élégant */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        {/* halos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-[#0c3d5e] to-manamind opacity-15 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-tr from-manacademy to-manadvise opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0c3d5e]/10 text-[#0c3d5e] px-4 py-2 rounded-full text-sm font-medium mb-6">
            📚 <span>{t("publications.badge", { defaultValue: "Articles & Publications" })}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5 text-[#0c3d5e]">
            {t("publications.heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("publications.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Filtres compacts */}
      <section className="py-6 border-y border-border/60 bg-gradient-to-b from-white to-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">{t("publications.filters.title", { defaultValue: "Filtrer par" })}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Thématique */}
            <div className="relative group">
              <Button
                variant={selectedThematic ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4"
              >
                {selectedThematic || t("publications.filters.thematic")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="p-2">
                  {thematics.map((th) => (
                    <button
                      key={th}
                      onClick={() =>
                        setSelectedThematic(selectedThematic === th ? null : th)
                      }
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Type */}
            <div className="relative group">
              <Button
                variant={selectedType ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4"
              >
                {selectedType || t("publications.filters.type")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="p-2">
                  {contentTypes.map((tp) => (
                    <button
                      key={tp}
                      onClick={() => setSelectedType(selectedType === tp ? null : tp)}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      {tp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Durée (placeholder UI) */}
            <div className="relative group">
              <Button
                variant={selectedDuration ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4"
              >
                {selectedDuration || t("publications.filters.duration")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="p-2">
                  {durations.map((du) => (
                    <button
                      key={du}
                      onClick={() =>
                        setSelectedDuration(selectedDuration === du ? null : du)
                      }
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      {du}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(selectedThematic || selectedType || selectedDuration) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedThematic(null);
                  setSelectedType(null);
                  setSelectedDuration(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                {t("publications.filters.all")}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* GRID d’articles — cartes avec couverture */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const coverSrc = coverFromPdf(article.pdfUrl);
              return (
                <Card
                  key={article.id}
                  className="group overflow-hidden border border-border/60 bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-2xl"
                  onClick={() => (window.location.href = `/articles/${article.slug}`)}
                >
                  {/* Vignette */}
                  <div className="relative">
                    <div className="aspect-[16/10] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-mana-soft to-muted/40 grid place-items-center">
                        <img
                          src={coverSrc}
                          alt={article.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/pdfs/placeholder.jpg"; // mettre un placeholder ici si tu veux
                          }}
                        />
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className={getThematicColor(article.thematic)}
                      >
                        {article.thematic}
                      </Badge>
                    </div>
                  </div>

                  {/* Contenu */}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight line-clamp-3 group-hover:text-[#0c3d5e] transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <Badge variant="outline" className="text-xs">
                        {article.type}
                      </Badge>
                    </div>

                    {/* Bouton avec texte #0c3d5e (puis inversion en hover) */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group font-semibold text-[#0c3d5e] border-[#0c3d5e]/30 hover:bg-[#0c3d5e] hover:text-white hover:border-[#0c3d5e] transition-all duration-300"
                      asChild
                    >
                      <a href={`/articles/${article.slug}`}>
                        {t("publications.cta", { defaultValue: "Consulter l’article" })}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination / Load more */}
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="px-8">
              {t("publications.loadMore")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Publications;
