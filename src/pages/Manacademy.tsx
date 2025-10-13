import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  Calendar,
  MessageSquare,
  Building2,
  Mail,
  User,
  Info,
  ArrowRight,
  Lightbulb,
  Leaf,
  Target,
  Eye,
  Zap,
  ShieldCheck,
  Brain,
  Smartphone,
  Calculator,
  Recycle,
  Monitor,
  Search,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import {
  formationAxes as axesData,
  formations as formationsData,
} from "@/data/formations";

const CAL_LINK =
  "https://calendar.app.google/MHJFvXizPczcPjnB7";

/* Icônes autorisées */
const iconMap: Record<string, React.ComponentType<any>> = {
  Lightbulb,
  Leaf,
  Target,
  Eye,
  Zap,
  Brain,
  Smartphone,
  Calculator,
  Recycle,
  Monitor,
  Search,
  TrendingUp,
  GraduationCap,
  Building2,
};
function getIcon(name?: string) {
  if (name && iconMap[name]) return iconMap[name];
  return GraduationCap;
}

/* Images par axe (dans /public) */
const axisImageMap: Record<string, string> = {
  innovation: "/innover.png",
  rse: "/rse.png",
  strategy: "/strat.png",
};

/* Overrides d’affichage (sans toucher aux data sources) */
const axisOverrides: Record<
  string,
  { title: string; description: string; formatsLabel: string }
> = {
  innovation: {
    title: "Innover pour s'adapter",
    description:
      "Accélérer l’innovation utile : méthodes, posture et cas d’usage pour des contextes techniques et industriels.",
    formatsLabel:
      "Formats : séminaire, atelier, parcours hybride (présentiel ou distanciel)",
  },
  rse: {
    title: "Créer de la valeur avec la RSE",
    description:
      "De la sensibilisation aux plans d’action opérationnels : faire de la RSE un levier business concret.",
    formatsLabel: "Formats : séminaire, cas pratiques, accompagnement terrain",
  },
  strategy: {
    title: "Anticiper par la stratégie",
    description:
      "Clarifier, choisir, déployer : vision, diagnostic, croissance et business models au service de l’exécution.",
    formatsLabel: "Formats : workshop, formation flash, parcours complet",
  },
};

const formationDescriptionOverrides: Record<string, string> = {
  // Innovation
  "Agilité & innovation en contexte industriel":
    "Cette formation décrypte les fondamentaux de l’approche agile et vous aide à concevoir votre modèle de conduite de projet adapté à votre métier.",
  "Culture & stratégie d'innovation":
    "Cette formation decrypte les sous jacents d'une culture d'innovation et vous aide à diffuser la posture d'intrapreneur aux équipes.",
  "Acculturation et adoption de l’IA en entreprise":
    "Cette formation accelere l’adoption et l’exploration de l’IA et de l’innovation digitale, l’exploration d’outils IA générative /LLM, ateliers d’idéation autour de cas métiers, sensibilisation à l’impact environnemental…",
  "Business model design":
    "Cette formation fournit les clefs pour decrypter les nouveaux modeles d'affaires pour créer de la valeur durablement (plateformisation, économie de la fonctionnalité, circularité).",
  // RSE
  "Stratégie de transformation durable & RSE opérationnelle":
    "Sensibilisation aux fondamentaux de la RSE, réflexion sur l'impact du secteur d'activité, définition de plans d'action concrets pour les équipes opérationnelles.",
  "Éco-conception, bilan carbone, CSRD":
    "Comprendre les référentiels actuels, apprendre à évaluer l'impact environnemental de vos produits, services et organisations. Introduction aux obligations de reporting (CSRD).",
  "Économie circulaire & éco-innovation":
    "Découvrir les modèles économiques durables, explorer les principes d'écoconception, réinterroger son business model à l'aune des limites planétaires.",
  "Numérique responsable & impact digital":
    "Mesurer l'empreinte environnementale du numérique, mettre en place une stratégie numérique durable.",
  // Stratégie
  "Vision, mission, raison d'être & valeurs":
    "Clarifier les fondamentaux identitaires de votre organisation pour renforcer l'engagement et la cohérence stratégique.",
  "Diagnostic stratégique":
    "Maîtriser les outils d'analyse stratégique : SWOT, PESTEL, 5 forces de Porter, matrice BCG… pour orienter la prise de décision.",
  "Stratégies de croissance":
    "Explorer les voies de développement (diversification, internationalisation, croissance externe ou interne, partenariats…).",
  "Positionnement stratégique & business model":
    "Proposition de valeur, benchmark, Océan Bleu et outils de design de business models (BMC, VPD).",
};

/* Couleurs DA Mana */
const manaDark = "#0C3D5E";
const manaGold = "#dfaf2c";

const Manacademy = () => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [openAxis, setOpenAxis] = useState<string | null>(null);
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    needType: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'manacademy',
          formData
        }),
      });

      if (response.ok) {
        toast.success("Demande envoyée", {
          description: "Votre demande a été envoyée avec succès. Nous vous recontacterons rapidement.",
        });

        // Réinitialiser le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          position: "",
          phone: "",
          needType: "",
          message: "",
        });
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

  const axes = axesData.map((ax) => {
    const ov = axisOverrides[ax.id];
    return {
      ...ax,
      title: ov?.title || ax.title,
      description: ov?.description || ax.description,
      formatsLabel: ov?.formatsLabel || ax.formatsLabel || "",
    };
  });

  const formations = formationsData.map((f) => ({
    ...f,
    shortDescription:
      formationDescriptionOverrides[f.title] ?? f.shortDescription,
  }));

  return (
    <div className="min-h-screen bg-background relative">
      {/* Halos décoratifs globaux */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div 
          className="absolute -top-48 -left-40 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-60"
          style={{ background: `radial-gradient(circle, ${manaGold}20 0%, ${manaGold}05 50%, transparent 100%)` }}
        />
        <div 
          className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-40"
          style={{ background: `radial-gradient(circle, ${manaDark}15 0%, ${manaDark}05 50%, transparent 100%)` }}
        />
        {/* Grain subtil pour texture premium */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='19' cy='19' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Navigation />

      {/* Hero Section Ultra-Premium */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Gradient de fond sophistiqué */}
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-95"
          style={{ 
            background: `linear-gradient(135deg, ${manaDark}08 0%, white 25%, ${manaGold}08 75%, white 100%)` 
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Colonne gauche - contenu */}
            <div className="space-y-8">
              {/* Badge premium (compact style) */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ backgroundColor: `${manaGold}10`, color: manaDark }}
              >
                <GraduationCap className="h-4 w-4" style={{ color: manaGold }} />
                <span>{t("manacademyPage.hero.badge", "Innovation to Raise Knowledge")}</span>
              </div>

              {/* Titre principal avec effet typographique */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span style={{ color: manaDark }}>
                    {t("manacademyPage.hero.titlePrefix", "Manacademy :")}
                  </span>
                  <span 
                    className="inline-block ml-2 bg-gradient-to-r bg-clip-text text-transparent font-black"
                    style={{ backgroundImage: `linear-gradient(135deg, ${manaGold}, ${manaGold}CC)` }}
                  >
                    {t("manacademyPage.hero.highlight", "se former aux transitions")}
                  </span>
                </h1>
              </div>

              {/* Proposition de valeur */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t(
                  "manacademyPage.hero.subtitle",
                  "Un organisme de formation reconnu pour la qualité de ses formateurs, des formats proposés et des thématiques avant-gardistes."
                )}
              </p>

              {/* Métriques d'impact */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group cursor-default">
                  <div 
                    className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${manaGold}15`, border: `1px solid ${manaGold}25` }}
                  >
                    <User className="h-6 w-6" style={{ color: manaGold }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: manaDark }}>
                    {t("manacademyPage.hero.stats.participants.value", "+400")}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {t("manacademyPage.hero.stats.participants.label", "participants / an depuis 2019")}
                  </div>
                </div>
                <div className="text-center group cursor-default">
                  <div 
                    className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${manaGold}15`, border: `1px solid ${manaGold}25` }}
                  >
                    <Eye className="h-6 w-6" style={{ color: manaGold }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: manaDark }}>
                    {t("manacademyPage.hero.stats.satisfaction.value", "96%")}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {t("manacademyPage.hero.stats.satisfaction.label", "de satisfaction en 2024")}
                  </div>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ 
                    backgroundColor: manaGold,
                    color: "white",
                    boxShadow: `0 8px 25px ${manaGold}35`
                  }}
                >
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                    {t("manacademyPage.hero.cta", "Planifier un échange")}
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-medium rounded-2xl border-2 transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: `${manaDark}25`,
                    color: manaDark
                  }}
                  onClick={() => document.getElementById('formations')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <GraduationCap className="mr-3 h-5 w-5" />
                  Explorer nos formations
                </Button>
              </div>
            </div>

            {/* Colonne droite - visuel */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Cercles décoratifs animés */}
                <div 
                  className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 animate-pulse"
                  style={{ backgroundColor: manaGold }}
                />
                <div 
                  className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full opacity-15 animate-pulse"
                  style={{ backgroundColor: manaDark, animationDelay: '1s' }}
                />
                
                <img
                  src="/academique.png"
                  alt="Excellence pédagogique Manacademy"
                  className="relative z-10 max-w-lg w-full h-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Expertise & Reconnaissance */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre de section */}
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
              style={{ backgroundColor: `${manaGold}10`, border: `1px solid ${manaGold}25` }}
            >
              <Info className="h-5 w-5" style={{ color: manaGold }} />
              <span className="text-sm font-semibold tracking-wide" style={{ color: manaDark }}>
                {t("manacademyPage.about.badge", "Qui sommes-nous ?")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: manaDark }}>
              Un écosystème d'expertises{" "}
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${manaGold}, ${manaGold}CC)` }}
              >
                reconnu
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t(
                "manacademyPage.about.text",
                "Manacademy est l'Organisme de Formation (n°11922589292) de Mana. Il s'appuie sur l'expérience de ses co-fondateurs et d'un réseau d'experts pour garantir des formations de grande qualité. Nous combinons théorie et pratique pour accompagner toutes les organisations sur les grandes transitions : innovation, stratégie, RSE et développement durable."
              )}
            </p>
          </div>

          {/* Valeurs différenciantes */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Innovation Pédagogique",
                description:
                  "Méthodes d'apprentissage avant-gardistes alliant théorie et pratique immersive, elearning et ateliers d’intelligence collective.",
                highlight: "Multitude de formats",
              },
              {
                icon: Target,
                title: "Accompagnement Personnalisé",
                description: "Chaque formation est adaptée aux spécificités et objectifs.",
                highlight: "100% sur-mesure",
              },
              {
                icon: ShieldCheck,
                title: "Excellence Certifiée",
                description:
                  "Organisme de formation certifié (n°11922589292) avec les plus hauts standards qualité.",
                highlight: "Qualité garantie",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="group relative p-8 rounded-3xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white"
                  style={{ borderColor: `${manaGold}20` }}
                >
                  {/* Accent décoratif */}
                  <div 
                    className="absolute top-0 left-8 h-1 w-16 rounded-full"
                    style={{ backgroundColor: manaGold }}
                  />
                  
                  <div 
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${manaGold}15`, border: `1px solid ${manaGold}30` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: manaGold }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4" style={{ color: manaDark }}>
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${manaGold}10`, color: manaDark }}
                  >
                    <Eye className="h-3 w-3" style={{ color: manaGold }} />
                    {item.highlight}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Formations - Design Premium */}
      <section id="formations" className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de section */}
          <div className="text-center mb-20">
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
              style={{ backgroundColor: `${manaGold}10`, border: `1px solid ${manaGold}25` }}
            >
              <GraduationCap className="h-5 w-5" style={{ color: manaGold }} />
              <span className="text-sm font-semibold tracking-wide" style={{ color: manaDark }}>
                Catalogue de formations
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: manaDark }}>
              {t("manacademyPage.trainings.title", "Nos formations")}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("manacademyPage.trainings.subtitle", "Trois axes stratégiques pour accompagner vos transitions")}
            </p>
          </div>

          {/* Axes de formation */}
          <div className="space-y-12">
            {axes.map((axis, axisIndex) => {
              const AxisIcon = getIcon(axis.icon);
              const axisFormations = formations.filter((f) => f.axis === axis.id);

              const formatsSet = new Set<string>();
              axisFormations.forEach((f) => (f.format || []).forEach((x) => formatsSet.add(x)));
              const formatBadges = Array.from(formatsSet).slice(0, 4);

              const axisImg = axisImageMap[axis.id] || "/innover.png";
              const isOpen = openAxis === axis.id;

              return (
                <div
                  key={axis.id}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border transition-all duration-500 hover:shadow-2xl"
                  style={{ borderColor: `${manaGold}15` }}
                >
                  {/* Accent décoratif */}
                  <div 
                    className="absolute top-0 left-0 h-2 w-full"
                    style={{ backgroundColor: manaGold }}
                  />

                  <div className="grid lg:grid-cols-2">
                    {/* Colonne contenu */}
                    <div className="p-6 lg:p-8 space-y-6">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <div 
                          className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${manaGold}15`, border: `1px solid ${manaGold}30` }}
                        >
                          <AxisIcon className="h-6 w-6" style={{ color: manaGold }} />
                        </div>
                        <div className="flex-1">
                          <h3 id={`axis-${axis.id}`} className="text-2xl font-bold mb-2" style={{ color: manaDark }}>
                            {axis.title}
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed">
                            {axis.description}
                          </p>
                        </div>
                      </div>

                      {formatBadges.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: manaDark }}>
                            {t("manacademyPage.trainings.formats", "Formats")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formatBadges.map((f) => (
                              <div
                                key={f}
                                className="px-2 py-1 rounded-full text-xs font-medium border"
                                style={{
                                  backgroundColor: `${manaGold}14`,
                                  borderColor: `${manaGold}33`,
                                  color: manaDark,
                                }}
                              >
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div>
                        <Button
                          className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                          style={{ backgroundColor: manaGold, color: "white" }}
                          onClick={() => setOpenAxis(isOpen ? null : axis.id)}
                        >
                          {t("manacademyPage.trainings.explorer", "Explorer")}
                          {isOpen ? 
                            <ChevronUp className="ml-2 h-4 w-4" /> : 
                            <ChevronDown className="ml-2 h-4 w-4" />
                          }
                        </Button>
                      </div>
                    </div>

                    {/* Colonne visuelle */}
                    <div className="relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-br opacity-10"
                        style={{ background: `linear-gradient(135deg, ${manaGold}40 0%, ${manaDark}20 100%)` }}
                      />
                      <img
                        src={axisImg}
                        alt={axis.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Panel déroulant : formations de l'axe */}
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="border-t bg-gray-50/50 p-8 lg:p-12" style={{ borderColor: `${manaGold}15` }}>
                      <div className="grid md:grid-cols-2 gap-8">
                        {axisFormations.map((formation) => {
                          const FormationIcon = getIcon(formation.icon);
                          return (
                            <Link
                              key={formation.id}
                              to={`/formations/${formation.slug}`}
                              className="group/card relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                              style={{ borderColor: `${manaGold}15` }}
                            >
                              {/* Accent gauche */}
                              <div 
                                className="absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover/card:w-2"
                                style={{ backgroundColor: manaGold }}
                              />
                              
                              <div className="flex gap-4">
                                <div 
                                  className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover/card:scale-110"
                                  style={{ backgroundColor: `${manaGold}15`, border: `1px solid ${manaGold}25` }}
                                >
                                  <FormationIcon className="h-6 w-6" style={{ color: manaGold }} />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-lg font-bold mb-2 line-clamp-2" style={{ color: manaDark }}>
                                    {formation.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                    {formation.shortDescription}
                                  </p>
                                  
                                  {/* Badges */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {formation.duration && (
                                      <div
                                        className="text-xs px-2 py-1 rounded border"
                                        style={{ borderColor: `${manaGold}40`, color: manaDark }}
                                      >
                                        <Calendar className="mr-1 h-3 w-3 inline" />
                                        {formation.duration}
                                      </div>
                                    )}
                                    {(formation.format || []).slice(0, 2).map((fmt, i) => (
                                      <div
                                        key={i}
                                        className="text-xs px-2 py-1 rounded"
                                        style={{
                                          backgroundColor: `${manaGold}10`,
                                          color: manaDark,
                                          border: `1px solid ${manaGold}30`
                                        }}
                                      >
                                        {fmt}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* CTA */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium" style={{ color: manaGold }}>
                                      {t("manacademyPage.trainings.see", "Voir la formation")}
                                    </span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-1" style={{ color: manaGold }} />
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Contact Premium */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
              style={{ backgroundColor: `${manaGold}10`, border: `1px solid ${manaGold}25` }}
            >
              <MessageSquare className="h-5 w-5" style={{ color: manaGold }} />
              <span className="text-sm font-semibold tracking-wide" style={{ color: manaDark }}>
                Projet sur-mesure
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: manaDark }}>
              {t("manacademyPage.finalCta.title", "Je veux mon Mana sur-mesure")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t(
                "manacademyPage.finalCta.subtitle",
                "Échangeons sur vos besoins pour co-construire un programme d'apprentissage qui transformera durablement vos équipes."
              )}
            </p>
          </div>

          {/* CTA Principal */}
          <div className="text-center mb-12">
            <Button
              asChild
              size="lg"
              className="group px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ 
                backgroundColor: manaGold,
                color: "white",
                boxShadow: `0 12px 30px ${manaGold}35`
              }}
            >
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                {t("manacademyPage.finalCta.button", "Planifier un échange")}
                <Calendar className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              </a>
            </Button>
          </div>

          {/* Formulaire de contact sophistiqué */}
          <div 
            className="relative overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-sm"
            style={{ 
              backgroundColor: "rgba(255,255,255,0.95)",
              borderColor: `${manaGold}20`,
              boxShadow: `0 25px 50px ${manaDark}15`
            }}
          >
            {/* Header du formulaire */}
            <div 
              className="p-8 border-b text-center"
              style={{ 
                background: `linear-gradient(135deg, ${manaGold}05 0%, white 100%)`,
                borderColor: `${manaGold}15`
              }}
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: manaDark }}>
                Ou envoyez-nous votre demande
              </h3>
              <p className="text-gray-600">
                Décrivez-nous votre projet, nous vous recontacterons sous 24h
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Nom & Prénom */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                    <User className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                    {t("manacademyPage.form.firstNameLabel", "Prénom")} *
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.firstNamePlaceholder", "Votre prénom")} 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 transition-all duration-200 focus:scale-105"
                    style={{ borderColor: `${manaGold}25` }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                    <User className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                    {t("manacademyPage.form.lastNameLabel", "Nom")} *
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.lastNamePlaceholder", "Votre nom")} 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 transition-all duration-200 focus:scale-105"
                    style={{ borderColor: `${manaGold}25` }}
                  />
                </div>
              </div>

              {/* Email & Téléphone */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                    <Mail className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                    {t("manacademyPage.form.emailLabel", "E-mail")} *
                  </label>
                  <Input 
                    type="email"
                    placeholder={t("manacademyPage.form.emailPlaceholder", "votre@email.com")} 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 transition-all duration-200 focus:scale-105"
                    style={{ borderColor: `${manaGold}25` }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                    {t("manacademyPage.form.phoneLabel", "Téléphone")}
                  </label>
                  <Input 
                    type="tel"
                    placeholder={t("manacademyPage.form.phonePlaceholder", "06 12 34 56 78")} 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 rounded-xl border-2 transition-all duration-200 focus:scale-105"
                    style={{ borderColor: `${manaGold}25` }}
                  />
                </div>
              </div>

              {/* Organisation & Fonction */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                    <Building2 className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                    {t("manacademyPage.form.organizationLabel", "Organisation")} *
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.organizationPlaceholder", "Votre entreprise")} 
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 transition-all duration-200 focus:scale-105"
                    style={{ borderColor: `${manaGold}25` }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                    <User className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                    {t("manacademyPage.form.positionLabel", "Fonction")}
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.positionPlaceholder", "Votre fonction")} 
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    className="h-12 rounded-xl border-2 transition-all duration-200 focus:scale-105"
                    style={{ borderColor: `${manaGold}25` }}
                  />
                </div>
              </div>

              {/* Type de besoin */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                  <Target className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                  {t("manacademyPage.form.needTypeLabel", "Type de besoin")}
                </label>
                <Select onValueChange={(value) => handleInputChange("needType", value)} value={formData.needType}>
                  <SelectTrigger className="h-12 rounded-xl border-2" style={{ borderColor: `${manaGold}25` }}>
                    <SelectValue placeholder={t("manacademyPage.form.needTypePlaceholder", "Sélectionnez votre besoin")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="innovation">
                      {t("manacademyPage.form.needTypes.innovation", "Innovation & Agilité")}
                    </SelectItem>
                    <SelectItem value="rse">
                      {t("manacademyPage.form.needTypes.rse", "RSE & Développement durable")}
                    </SelectItem>
                    <SelectItem value="strategy">
                      {t("manacademyPage.form.needTypes.strategy", "Stratégie & Vision")}
                    </SelectItem>
                    <SelectItem value="custom">
                      {t("manacademyPage.form.needTypes.custom", "Formation sur-mesure")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: manaDark }}>
                  <MessageSquare className="inline h-4 w-4 mr-2" style={{ color: manaGold }} />
                  {t("manacademyPage.form.messageLabel", "Message")} *
                </label>
                <Textarea
                  placeholder={t(
                    "manacademyPage.form.messagePlaceholder",
                    "Décrivez votre projet, vos objectifs, votre contexte..."
                  )}
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="rounded-xl border-2 transition-all duration-200 focus:scale-105 resize-none"
                  style={{ borderColor: `${manaGold}25` }}
                />
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: manaGold, color: "white" }}
              >
                {t("manacademyPage.form.submitButton", "Envoyer ma demande")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manacademy;
