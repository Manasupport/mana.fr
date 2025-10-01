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
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ213VTwIZ6r0XmNarZHYKlh1gtHMEIpW0c0JAM7dCNTZxCkbJKTxIg6PV1qhMqr43FIJVpmZjsZ";

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
    "Cette formation décrypte les clés d'un mindset agile et vous aide à concevoir votre modèle de conduite de projet adapté à votre métier.",
  "Culture & stratégie d'innovation":
    "Cette formation décrypte les clés d'un mindset d'innovation et vous aide à adopter une posture d'intrapreneur pour transformer vos idées en impact durable.",
  "Innovation digitale & Intelligence artificielle":
    "Acculturation aux usages de l’IA et de l’innovation digitale, exploration d’outils IA/LLM, ateliers d’idéation autour de cas métiers, sensibilisation à l’impact environnemental des technologies.",
  "Business model design":
    "Prototyper et faire évoluer son business model (BMC, tests terrain, itérations) pour maximiser la valeur créée.",
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
<section className="pt-24 pb-16 bg-gradient-to-br from-manacademy-light via-white to-manacademy-light/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Colonne gauche - texte */}
      <div>
        <div
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
          style={{ backgroundColor: `${manaGold}1A`, color: manaDark }}
        >
          <GraduationCap className="h-4 w-4" />
          <span>
            {t("manacademyPage.hero.badge", "Innovation to Raise Knowledge")}
          </span>
        </div>

        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ color: manaDark }}
        >
          {t("manacademyPage.hero.titlePrefix", "Manacademy :")}
          <span style={{ color: manaGold }}>
            {" "}
            {t("manacademyPage.hero.highlight", "se former aux transitions")}
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          {t(
            "manacademyPage.hero.subtitle",
            "Un organisme de formation reconnu pour la qualité de ses formateurs, des formats proposés et des thématiques avant-gardistes."
          )}
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div
            className="rounded-lg p-4 border"
            style={{ backgroundColor: `${manaGold}1A`, borderColor: `${manaGold}33` }}
          >
            <div className="text-2xl font-bold mb-1" style={{ color: manaGold }}>
              {t("manacademyPage.hero.stats.participants.value", "+400")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("manacademyPage.hero.stats.participants.label", "participants / an depuis 2019")}
            </div>
          </div>
          <div
            className="rounded-lg p-4 border"
            style={{ backgroundColor: `${manaGold}1A`, borderColor: `${manaGold}33` }}
          >
            <div className="text-2xl font-bold mb-1" style={{ color: manaGold }}>
              {t("manacademyPage.hero.stats.satisfaction.value", "96%")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("manacademyPage.hero.stats.satisfaction.label", "de satisfaction en 2024")}
            </div>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="shadow-lg"
          style={{ backgroundColor: manaGold, color: "#fff" }}
        >
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
            {t("manacademyPage.hero.cta", "Planifier un échange")}
            <Calendar className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>

      {/* Colonne droite - visuel PNG */}
      <div className="flex justify-center lg:justify-end">
        <img
          src="/academique.png"
          alt="Illustration académique"
          className="max-w-md w-full h-auto"
        />
      </div>
    </div>
  </div>
</section>

      {/* Qui sommes-nous ? */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50/70 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: `${manaGold}1A`, color: manaDark }}
          >
            <Info className="h-4 w-4" />
            <span>{t("manacademyPage.about.badge", "Qui sommes-nous ?")}</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t(
              "manacademyPage.about.text",
              "Manacademy est l'Organisme de Formation (n°11922589292) de Mana. Il s'appuie sur l'expérience de ses co-fondateurs et d'un réseau d'experts pour garantir des formations de grande qualité. Nous combinons théorie et pratique pour accompagner toutes les organisations sur les grandes transitions : innovation, stratégie, RSE et développement durable."
            )}
          </p>
        </div>
      </section>

      {/* Nos formations */}
      <section className="py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: manaDark }}>
              {t("manacademyPage.trainings.title", "Nos formations")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("manacademyPage.trainings.subtitle", "Trois axes stratégiques pour accompagner vos transitions")}
            </p>
          </div>

          <div className="space-y-10">
            {axes.map((axis) => {
              const AxisIcon = getIcon(axis.icon);
              const axisFormations = formations.filter((f) => f.axis === axis.id);

              const formatsSet = new Set<string>();
              axisFormations.forEach((f) => (f.format || []).forEach((x) => formatsSet.add(x)));
              const formatBadges = Array.from(formatsSet).slice(0, 4);

              const axisImg = axisImageMap[axis.id] || "/innover.png";
              const isOpen = openAxis === axis.id;

              return (
                <section
                  key={axis.id}
                  aria-labelledby={`axis-${axis.id}`}
                  className="relative overflow-hidden rounded-3xl bg-white shadow-sm border"
                  style={{ borderColor: `${manaDark}1A` }}
                >
                  {/* filet or haut */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: manaGold }} />

                  <div className="grid md:grid-cols-2">
                    {/* Col texte */}
                    <div className="p-8 md:p-10">
                      <div className="mb-6 flex items-start gap-4">
                        <div
                          className="h-12 w-12 rounded-2xl grid place-items-center shadow-sm"
                          style={{ backgroundColor: `${manaGold}1A`, border: `1px solid ${manaGold}33` }}
                        >
                          <AxisIcon className="h-6 w-6" style={{ color: manaDark }} />
                        </div>
                        <div>
                          <h3 id={`axis-${axis.id}`} className="text-2xl font-bold" style={{ color: manaDark }}>
                            {axis.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{axis.description}</p>
                          {axis.formatsLabel && (
                            <p className="mt-3 text-sm font-medium" style={{ color: manaDark }}>
                              {axis.formatsLabel}
                            </p>
                          )}
                        </div>
                      </div>

                      {formatBadges.length > 0 && (
                        <div className="mb-6">
                          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: manaDark }}>
                            {t("manacademyPage.trainings.formats", "Formats")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formatBadges.map((f) => (
                              <Badge
                                key={f}
                                variant="secondary"
                                className="border"
                                style={{
                                  backgroundColor: `${manaGold}14`,
                                  borderColor: `${manaGold}33`,
                                  color: manaDark,
                                }}
                              >
                                {f}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <Button
                          className="rounded-xl transition-colors"
                          style={{ backgroundColor: manaGold, color: "#fff" }}
                          onClick={() => setOpenAxis(isOpen ? null : axis.id)}
                        >
                          {t("manacademyPage.trainings.explorer", "Explorer")}
                          {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Col image — pas de blur/voile */}
                    <div className="relative">
                      <img
                        src={axisImg}
                        alt={axis.title}
                        className="h-full w-full object-cover md:rounded-r-3xl"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Panneau déroulant : formations de l'axe */}
                  <div
                    className={`transition-[max-height] duration-500 ease-in-out ${
                      isOpen ? "max-h-[1200px]" : "max-h-0"
                    } overflow-hidden border-t`}
                    style={{ borderColor: `${manaDark}14` }}
                    aria-hidden={!isOpen}
                  >
                    <div className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        {axisFormations.map((formation) => {
                          const FormationIcon = getIcon(formation.icon);
                          return (
                            <Link
                              key={formation.id}
                              to={`/formations/${formation.slug}`}
                              className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl border focus:outline-none"
                              style={{ borderColor: `${manaDark}14` }}
                            >
                              {/* filet or gauche */}
                              <span
                                className="absolute left-0 top-0 h-full"
                                style={{ width: 3, backgroundColor: manaGold }}
                              />
                              <div className="flex items-start gap-4">
                                <div
                                  className="h-10 w-10 rounded-xl grid place-items-center shrink-0 border"
                                  style={{
                                    backgroundColor: `${manaGold}1A`,
                                    borderColor: `${manaGold}33`,
                                  }}
                                >
                                  <FormationIcon className="h-5 w-5" style={{ color: manaDark }} />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-base font-semibold mb-1 line-clamp-2" style={{ color: manaDark }}>
                                    {formation.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground line-clamp-3">
                                    {formation.shortDescription}
                                  </p>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {formation.duration && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                        style={{ borderColor: `${manaGold}55`, color: manaDark }}
                                      >
                                        {formation.duration}
                                      </Badge>
                                    )}
                                    {(formation.format || []).slice(0, 2).map((fmt, i) => (
                                      <Badge
                                        key={i}
                                        variant="secondary"
                                        className="text-xs"
                                        style={{
                                          backgroundColor: `${manaGold}14`,
                                          borderColor: `${manaGold}33`,
                                          color: manaDark,
                                        }}
                                      >
                                        {fmt}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-end" style={{ color: manaDark }}>
                                <span className="text-sm font-medium">
                                  {t("manacademyPage.trainings.see", "Voir la formation")}
                                </span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-manacademy/5 to-manacademy-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: manaDark }}>
              {t("manacademyPage.finalCta.title", "Je veux mon Mana sur-mesure")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                "manacademyPage.finalCta.subtitle",
                "Échangeons sur vos besoins pour co-construire un programme d'apprentissage qui transformera durablement vos équipes."
              )}
            </p>
          </div>

          <div className="text-center mb-10">
            <Button
              asChild
              size="xl"
              className="shadow-lg hover:shadow-xl"
              style={{ backgroundColor: manaGold, color: "#fff" }}
            >
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                {t("manacademyPage.finalCta.button", "Planifier un échange")}
                <Calendar className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Formulaire — sans blur */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 sm:p-10 mx-auto max-w-2xl">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                    <User className="inline h-4 w-4 mr-1" style={{ color: manaGold }} />
                    {t("manacademyPage.form.firstNameLabel", "Prénom")} *
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.firstNamePlaceholder", "Votre prénom")} 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                    <User className="inline h-4 w-4 mr-1" style={{ color: manaGold }} />
                    {t("manacademyPage.form.lastNameLabel", "Nom")} *
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.lastNamePlaceholder", "Votre nom")} 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                    <Building2 className="inline h-4 w-4 mr-1" style={{ color: manaGold }} />
                    {t("manacademyPage.form.organizationLabel", "Organisation")} *
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.organizationPlaceholder", "Votre entreprise")} 
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                    <User className="inline h-4 w-4 mr-1" style={{ color: manaGold }} />
                    {t("manacademyPage.form.positionLabel", "Fonction")}
                  </label>
                  <Input 
                    placeholder={t("manacademyPage.form.positionPlaceholder", "Votre fonction")} 
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                    <Mail className="inline h-4 w-4 mr-1" style={{ color: manaGold }} />
                    {t("manacademyPage.form.emailLabel", "E-mail")} *
                  </label>
                  <Input 
                    type="email" 
                    placeholder={t("manacademyPage.form.emailPlaceholder", "votre@email.com")} 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                    {t("manacademyPage.form.phoneLabel", "Téléphone")}
                  </label>
                  <Input 
                    type="tel" 
                    placeholder={t("manacademyPage.form.phonePlaceholder", "06 12 34 56 78")} 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                  {t("manacademyPage.form.needTypeLabel", "Type de besoin")}
                </label>
                <Select onValueChange={(value) => handleInputChange("needType", value)} value={formData.needType}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("manacademyPage.form.needTypePlaceholder", "Sélectionnez votre besoin")}
                    />
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

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: manaDark }}>
                  <MessageSquare className="inline h-4 w-4 mr-1" style={{ color: manaGold }} />
                  {t("manacademyPage.form.messageLabel", "Message")} *
                </label>
                <Textarea
                  placeholder={t(
                    "manacademyPage.form.messagePlaceholder",
                    "Décrivez votre projet, vos objectifs, votre contexte..."
                  )}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full shadow-lg" style={{ backgroundColor: manaGold, color: "#fff" }}>
                {t("manacademyPage.form.submitButton", "Envoyer ma demande")}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manacademy;
