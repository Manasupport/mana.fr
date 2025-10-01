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
import { 
  Filter, 
  ChevronDown, 
  ArrowRight, 
  Calendar,
  Clock,
  BookOpen,
  Star,
  Eye
} from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

/** Miniature = même nom que le PDF mais en .jpg, dans le même dossier /pdfs/ */
const coverFromPdf = (pdfUrl: string) => pdfUrl.replace(/\.pdf$/i, ".jpg");

// Couleurs et styles pour direction artistique premium
const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

// Utilitaire de sélection éditoriale sophistiquée
const getEditorialScore = (article: any) => {
  let score = 0;
  
  // Boost pour les formats premium
  if (article.type === "Guide" || article.type === "Étude") score += 3;
  if (article.type === "Article") score += 2;
  
  // Boost thématiques stratégiques
  if (article.thematic === "Innovation") score += 2;
  if (article.thematic === "Stratégie") score += 1;
  
  // Boost contenu récent (simulé par ID élevé)
  if (article.id >= 8) score += 2;
  
  // Flag featured (optionnel)
  if (article.featured) score += 5;
  
  return score;
};

const Publications = () => {
  const { t } = useTranslation();

  // Filtres sophistiqués
  const [selectedThematic, setSelectedThematic] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const thematics = ["Innovation", "Stratégie", "RSE", "Data & IA"];
  const contentTypes = ["Article", "Étude", "Guide", "Insight", "Note de recherche", "Cas d'étude", "Cours"];

  // Données enrichies avec métadonnées éditoriales
  const articles = [
    {
      id: 2,
      title: "Pour Bingewatcher House of Innovations, consulter notre Managuide des méthodes et outils d'innovation",
      excerpt: "Un guide complet des méthodologies d'innovation pour transformer vos idées en solutions concrètes et mesurables.",
      thematic: "Innovation",
      type: "Guide",
      slug: "managuide-innovation",
      pdfUrl: "/pdfs/managuide-de-l-innovation.pdf",
      featured: true,
      publishedAt: "2024-03-15",
      readTime: "15 min"
    },
    {
      id: 2,
      title: "The Future of Luxury",
      excerpt: "Une analyse prospective des tendances qui façonnent l'avenir du secteur du luxe à l'ère numérique et durable.",
      thematic: "Stratégie",
      type: "Article",
      slug: "future-of-luxury",
      pdfUrl: "/pdfs/the-future-of-luxury.pdf",
      featured: true,
      publishedAt: "2024-03-28",
      readTime: "12 min"
    },
    {
      id: 3,
      title: "Autoconsommation collective : quelle gouvernance pour un système énergétique décentralisé ?",
      excerpt: "Exploration des modèles de gouvernance pour une transition énergétique collaborative et durable.",
      thematic: "RSE",
      type: "Étude",
      slug: "autoconsommation-collective",
      pdfUrl: "/pdfs/autoconsommation-collective.pdf",
      featured: true,
      publishedAt: "2024-01-20",
      readTime: "18 min"
    },
    {
      id: 4,
      title: "The Value Wheel: a strategic tool to measure value creation beyond financial metrics",
      excerpt: "Un outil innovant pour évaluer la création de valeur holistique dans les organisations modernes.",
      thematic: "Stratégie",
      type: "Article",
      slug: "value-wheel-tool",
      pdfUrl: "/pdfs/value-wheel.pdf",
      publishedAt: "2024-01-10",
      readTime: "10 min"
    },
    {
      id: 5,
      title: "Sustainable cities: an inter-disciplinary challenge",
      excerpt: "Une approche interdisciplinaire pour repenser l'urbanisme et construire les villes de demain.",
      thematic: "RSE",
      type: "Étude",
      slug: "sustainable-cities",
      pdfUrl: "/pdfs/sustainable-cities.pdf",
      publishedAt: "2023-12-15",
      readTime: "22 min"
    },
    {
      id: 6,
      title: "Operational Efficiency at EM Normandie",
      excerpt: "Retour d'expérience sur l'optimisation des processus opérationnels dans l'enseignement supérieur.",
      thematic: "Stratégie",
      type: "Cours",
      slug: "operational-efficiency-em",
      pdfUrl: "/pdfs/operational-efficiency-em.pdf",
      publishedAt: "2023-11-30",
      readTime: "8 min"
    },
    {
      id: 7,
      title: "Saison Spring 2021 : Un succès renouvelé",
      excerpt: "Analyse des facteurs clés de succès d'une saison exceptionnelle malgré les défis sanitaires.",
      thematic: "Stratégie",
      type: "Cours",
      slug: "spring-2021-success",
      pdfUrl: "/pdfs/spring-2021-success.pdf",
      publishedAt: "2023-10-20",
      readTime: "6 min"
    },
    {
      id: 9,
      title: "Consultant Behaviour at ESCP Business School",
      excerpt: "Analyse comportementale des consultants junior et identification des leviers de performance.",
      thematic: "Stratégie",
      type: "Cours",
      slug: "consultant-behaviour-escp",
      pdfUrl: "/pdfs/consultant-behaviour-escp.pdf",
      publishedAt: "2023-09-15",
      readTime: "14 min"
    },
    {
      id: 10,
      title: "Les archétypes d'entreprises innovantes",
      excerpt: "Typologie des modèles organisationnels qui favorisent l'innovation et la créativité en entreprise.",
      thematic: "Innovation",
      type: "Article",
      slug: "archetypes-entreprises-innovantes",
      pdfUrl: "/pdfs/archetypes-entreprises-innovantes.pdf",
      featured: true,
      publishedAt: "2023-08-25",
      readTime: "16 min"
    },
  ];

  // Système de couleurs sophistiqué par thématique
  const getThematicColor = (thematic: string) => {
    switch (thematic) {
      case "Innovation":
        return "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200";
      case "Stratégie":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200";
      case "RSE":
        return "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200";
      case "Data & IA":
        return "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200";
    }
  };

  // Logique de filtrage et sélection éditoriale
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter((article) => {
      const okTheme = !selectedThematic || article.thematic === selectedThematic;
      const okType = !selectedType || article.type === selectedType;
      return okTheme && okType;
    });

      // Tri du plus récent au plus ancien
      return filtered.sort((a, b) => {
        return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
      });
  }, [articles, selectedThematic, selectedType]);

  // Sélection éditoriale pour la mise en avant
  const featuredArticles = useMemo(() => {
    return filteredArticles.filter(article => article.featured).slice(0, 3);
  }, [filteredArticles]);

  const regularArticles = useMemo(() => {
    return filteredArticles.filter(article => !article.featured);
  }, [filteredArticles]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO SOBRE ET ÉLÉGANT */}
      <section className="relative pt-32 pb-28 overflow-hidden bg-gradient-to-br from-[#eaf3fa] via-white to-[#f8f6f2]">
        {/* Halo premium animé */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-[#0c3d5e] via-[#dfaf2c]/30 to-[#eaf3fa] opacity-20 blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0c3d5e]/10 text-[#0c3d5e] px-5 py-3 rounded-full text-base font-semibold mb-8 shadow-sm">
            <span className="animate-fade-in">📚</span> <span>{t("publications.badge", "Articles & Publications")}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0c3d5e] via-[#dfaf2c] to-[#0c3d5e] drop-shadow-lg animate-fade-in">
            {t("publications.heroTitle", "Publications")}
          </h1>
          <p className="text-xl md:text-2xl text-[#0c3d5e] max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-slow">
            {t("publications.heroSubtitle", "Le centre éditorial pour les décideurs qui transforment leur organisation. Découvrez nos analyses, guides et études pour inspirer l’action.")}
          </p>
        </div>
      </section>

      {/* FILTRES ÉDITORIAUX SOPHISTIQUÉS */}
  <section className="py-6 bg-white/80 backdrop-blur-sm border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5" style={{ color: manaDark }} />
                <span className="text-sm font-semibold" style={{ color: manaDark }}>
                  {t("publications.filters.title", "Explorer par")}
                </span>
              </div>
              
              <div className="text-sm text-gray-500">
                {filteredArticles.length} {t("publications.results", "résultats")}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Filtres thématiques premium */}
              <div className="relative group">
                <Button
                  variant={selectedThematic ? "default" : "outline"}
                  className="rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: selectedThematic ? manaDark : 'white',
                    borderColor: `${manaDark}30`,
                    color: selectedThematic ? 'white' : manaDark
                  }}
                >
                  {selectedThematic || t("publications.filters.thematic", "Thématique")}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  <div className="p-2">
                    {thematics.map((thematic) => (
                      <button
                        key={thematic}
                        onClick={() => setSelectedThematic(selectedThematic === thematic ? null : thematic)}
                        className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <span>{thematic}</span>
                        <div className={`w-3 h-3 rounded-full ${getThematicColor(thematic).split(' ')[0]}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filtres types de contenu */}
              <div className="relative group">
                <Button
                  variant={selectedType ? "default" : "outline"}
                  className="rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: selectedType ? manaDark : 'white',
                    borderColor: `${manaDark}30`,
                    color: selectedType ? 'white' : manaDark
                  }}
                >
                  {selectedType || t("publications.filters.type", "Format")}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  <div className="p-2">
                    {contentTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(selectedType === type ? null : type)}
                        className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bouton reset */}
              {(selectedThematic || selectedType) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedThematic(null);
                    setSelectedType(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 rounded-xl px-4"
                >
                  {t("publications.filters.reset", "Tout afficher")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ÉDITORIALE PRINCIPALE */}
  <section className="pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mise en avant éditoriale - Top 3 Featured */}
          {featuredArticles.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-12">
                <Star className="h-6 w-6" style={{ color: manaGold }} />
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: manaDark }}>
                  {t("publications.featured.title", "À la une")}
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Article principal (premier featured) */}
                {featuredArticles[0] && (
                  <div className="lg:row-span-2">
                    <Card 
                      className="group h-full overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 bg-white rounded-3xl cursor-pointer"
                      onClick={() => window.location.href = `/articles/${featuredArticles[0].slug}`}
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={coverFromPdf(featuredArticles[0].pdfUrl)}
                          alt={featuredArticles[0].title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badge featured */}
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-white/90 text-gray-900 border-0 font-semibold backdrop-blur-sm">
                            <Star className="h-3 w-3 mr-1" style={{ color: manaGold }} />
                            {t("publications.featured.badge", "À la une")}
                          </Badge>
                        </div>

                        {/* Badge thématique */}
                        <div className="absolute top-6 right-6">
                          <Badge className={`border-0 font-medium ${getThematicColor(featuredArticles[0].thematic)}`}>
                            {featuredArticles[0].thematic}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="p-8">
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(featuredArticles[0].publishedAt || '').toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredArticles[0].readTime}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {featuredArticles[0].type}
                          </Badge>
                        </div>

                        <CardTitle className="text-2xl md:text-3xl leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                          {featuredArticles[0].title}
                        </CardTitle>
                        
                        <CardDescription className="text-lg leading-relaxed text-gray-600 mb-6">
                          {featuredArticles[0].excerpt}
                        </CardDescription>

                        <Button 
                          className="group/btn w-full rounded-2xl py-6 text-lg font-semibold transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-[#0c3d5e] via-[#dfaf2c] to-[#0c3d5e] text-white border-0"
                          style={{
                            background: 'linear-gradient(90deg, #0c3d5e 0%, #dfaf2c 50%, #0c3d5e 100%)',
                            color: 'white'
                          }}
                        >
                          {t("publications.cta", "Consulter l'article")}
                          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardHeader>
                    </Card>
                  </div>
                )}

                {/* Articles secondaires */}
                <div className="space-y-6">
                  {featuredArticles.slice(1, 3).map((article) => (
                    <Card 
                      key={article.id}
                      className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white rounded-2xl cursor-pointer"
                      onClick={() => window.location.href = `/articles/${article.slug}`}
                    >
                      <div className="grid md:grid-cols-5 gap-0">
                        <div className="md:col-span-2 aspect-[4/3] md:aspect-auto overflow-hidden">
                          <img
                            src={coverFromPdf(article.pdfUrl)}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="md:col-span-3 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className={`text-xs font-medium ${getThematicColor(article.thematic)}`}>
                              {article.thematic}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {article.type}
                            </Badge>
                          </div>

                          <h3 className="text-lg font-bold leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{new Date(article.publishedAt || '').toLocaleDateString('fr-FR')}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grille régulière pour les autres articles */}
          {regularArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-12">
                <Eye className="h-6 w-6" style={{ color: manaDark }} />
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: manaDark }}>
                  {t("publications.regular.title", "Toutes nos publications")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-2xl cursor-pointer"
                    onClick={() => window.location.href = `/articles/${article.slug}`}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={coverFromPdf(article.pdfUrl)}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      
                      {/* Badge thématique */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`text-xs font-medium ${getThematicColor(article.thematic)}`}>
                          {article.thematic}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.publishedAt || '').toLocaleDateString('fr-FR')}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {article.type}
                        </Badge>
                      </div>

                      <CardTitle className="text-lg leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm text-gray-600 line-clamp-3 mb-6">
                        {article.excerpt}
                      </CardDescription>

                      <Button 
                        variant="outline" 
                        className="w-full group/btn rounded-xl transition-all duration-300 relative overflow-hidden"
                        style={{
                          borderColor: `${manaDark}30`,
                          color: manaDark,
                          backgroundColor: 'white',
                          position: 'relative',
                          zIndex: 1
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'linear-gradient(90deg, #0c3d5e 0%, #dfaf2c 50%, #0c3d5e 100%)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = manaDark;
                          e.currentTarget.style.borderColor = `${manaDark}30`;
                        }}
                      >
                        {t("publications.cta", "Consulter l'article")}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Call to action final */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Publications;
