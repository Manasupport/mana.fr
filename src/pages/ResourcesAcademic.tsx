import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderOpen,
  Globe,
  FileText,
  Lightbulb,
  ArrowLeft,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ------------------------------------------------------------------ */
/*                     Icônes configurables via i18n                   */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, React.ComponentType<any>> = {
  target: Target,
  globe: Globe,
  fileText: FileText,
  lightbulb: Lightbulb,
};

/* ------------------------------------------------------------------ */
/*                         Tokens couleur Mana                         */
/* ------------------------------------------------------------------ */
const badgeBgMap: Record<string, string> = {
  manamind: "bg-manamind",
  manadvise: "bg-manadvise",
  manacademy: "bg-manacademy",
  "mana-accent": "bg-mana-accent",
};
const tintBgMap: Record<string, string> = {
  manamind: "from-manamind/10 to-manamind/5",
  manadvise: "from-manadvise/10 to-manadvise/5",
  manacademy: "from-manacademy/10 to-manacademy/5",
  "mana-accent": "from-mana-accent/10 to-mana-accent/5",
};
const borderMap: Record<string, string> = {
  manamind: "border-manamind/30",
  manadvise: "border-manadvise/30",
  manacademy: "border-manacademy/30",
  "mana-accent": "border-mana-accent/30",
};
const hoverBorderMap: Record<string, string> = {
  manamind: "hover:border-manamind/60",
  manadvise: "hover:border-manadvise/60",
  manacademy: "hover:border-manacademy/60",
  "mana-accent": "hover:border-mana-accent/60",
};

type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;        // "target" | "globe" | "fileText" | "lightbulb"
  color: string;       // "manamind" | "manadvise" | "manacademy" | "mana-accent"
  resourceCount: number;
};

export default function ResourcesAcademic() {
  const { t } = useTranslation();

  // Catégories via i18n (fallback inclus)
  const fromI18n =
    (t("resourcesAcademic.categories", { returnObjects: true }) as Category[]) ??
    [];

  const categories: Category[] =
    fromI18n.length > 0
      ? fromI18n
      : [
          {
            id: "project-management",
            title: "Project Management",
            description:
              "Essential tools and frameworks for successful project delivery",
            icon: "target",
            color: "manamind",
            resourceCount: 14,
          },
          {
            id: "international-strategy",
            title: "International Strategy",
            description:
              "Strategic frameworks for global business expansion",
            icon: "globe",
            color: "manadvise",
            resourceCount: 6,
          },
          {
            id: "thesis",
            title: "Thesis",
            description:
              "Academic research and thesis development resources",
            icon: "fileText",
            color: "manacademy",
            resourceCount: 1,
          },
          {
            id: "design-thinking",
            title: "Design Thinking",
            description:
              "Creative problem-solving and innovation methodologies",
            icon: "lightbulb",
            color: "mana-accent",
            resourceCount: 14,
          },
        ];

  return (
    <div className="min-h-screen bg-background">
      {/* décor halo global */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 -left-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-[#0c3d5e]/15 to-manamind/25 blur-3xl" />
        <div className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-manacademy/15 to-manadvise/25 blur-3xl" />
      </div>

      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-20 pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="group transition-colors hover:bg-muted/60"
          >
            <Link to="/resources" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {t("resourcesAcademic.breadcrumb.back")}
            </Link>
          </Button>
        </div>
      </div>

      {/* HERO */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#0c3d5e]/10 px-4 py-2 text-sm font-medium text-[#0c3d5e]">
            📚 {t("resourcesAcademic.badge", { defaultValue: "Ressources académiques" })}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0c3d5e]">
            {t("resourcesAcademic.header.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("resourcesAcademic.header.subtitle")}
          </p>
        </div>
      </section>

      {/* Grille catégories (sans bloc Managuide) */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] ?? Target;
              const badgeBg = badgeBgMap[category.color] ?? "bg-slate-400";
              const border = borderMap[category.color] ?? "border-slate-300/50";
              const hoverBorder = hoverBorderMap[category.color] ?? "hover:border-slate-400";

              return (
                <Card
                  key={category.id}
                  className={`group relative overflow-hidden rounded-2xl border ${border} bg-card/80 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl ${hoverBorder}`}
                >
                  {/* teinte douce au survol */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tintBgMap[category.color] ?? "from-slate-200/20 to-slate-100/10"}`}
                  />
                  <CardHeader className="relative z-10 pb-4">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`grid h-12 w-12 place-items-center rounded-xl ${badgeBg} shadow-md`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {t("resourcesAcademic.cards.resourcesLabel", {
                          count: category.resourceCount,
                        })}
                      </span>
                    </div>

                    <CardTitle className="text-xl leading-snug text-[#0c3d5e]">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-2">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="group/btn w-full rounded-xl border-[#0c3d5e]/30 bg-white/60 backdrop-blur transition-all hover:border-[#0c3d5e] hover:bg-white"
                      aria-label={t("resourcesAcademic.cards.browse")}
                    >
                      <Link to={`/resources/academic/${category.id}`}>
                        {t("resourcesAcademic.cards.browse")}
                        <FolderOpen className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
