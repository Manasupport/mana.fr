import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowLeft, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------ */
/*            Composant carte réutilisable                */
/* ------------------------------------------------------ */
const ResourceCard = ({ resource, type }: { resource: { id: string; title: string; description: string }, type: string }) => (
  <Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl">
    {/* halo de survol léger */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mana-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />
    <CardHeader className="relative z-10 pb-3">
      <div className="mb-4 flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-mana-accent to-purple-500 shadow-md">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Quick download"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <CardTitle className="text-lg leading-snug text-[#0c3d5e]">
        {resource.title}
      </CardTitle>
      <CardDescription className="text-sm leading-relaxed">
        {resource.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="relative z-10">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="group/btn w-full rounded-xl border-[#0c3d5e]/30 bg-white/60 backdrop-blur transition-all hover:border-mana-accent hover:bg-white"
      >
        <Link to={`/resources/view/${resource.id}`}>
          View {type}
          <FileText className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default function DesignThinking() {
  const toolsheets = [
    { id: "prioritization-matrix-dt", title: "Prioritization Matrix", description: "Evaluate and rank design ideas by impact and feasibility" },
    { id: "crazy-8", title: "Crazy 8", description: "Rapid ideation exercise for generating diverse solutions" },
    { id: "how-might-we", title: "How Might We", description: "Reframe problems as opportunities for innovation" },
    { id: "what-if", title: "What if...", description: "Explore alternative scenarios and possibilities" },
    { id: "the-golden-rules-of-brainstorming", title: "Golden Rules of Brainstorming", description: "Best practices for effective idea generation sessions" },
    { id: "the-6-golden-rules-of-prototyping", title: "Six Golden Rules of Prototyping", description: "Guidelines for creating effective prototypes" },
    { id: "solutions-mapping", title: "Solution Mapping", description: "Visualize and organize potential solutions" },
    { id: "prototyping-the-solution", title: "Prototype Operationalization Canvas", description: "Plan the implementation of prototype concepts" },
    { id: "prototype-scoping-canvas", title: "Prototype Scoping Canvas", description: "Define scope and boundaries for prototype development" },
    { id: "persona", title: "Persona", description: "Create detailed user personas for design targeting" },
    { id: "empathy-map", title: "Empathy Map", description: "Understand user thoughts, feelings, and behaviors" },
    { id: "challenge-summary", title: "Challenge Summary", description: "Clearly define and frame design challenges" },
    { id: "the-user-journey-map", title: "User Journey Map", description: "Visualize user experience across touchpoints" },
  ];

  const academicResources = [
    {
      id: "problem-solving-creativity",
      title: "Problem Solving & Creativity by Design Thinking",
      description: "Academic guide to design thinking methodologies and creative problem-solving",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* halos Mana globaux */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 -left-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-[#0c3d5e]/15 to-mana-accent/25 blur-3xl" />
        <div className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-manacademy/15 to-purple-400/25 blur-3xl" />
      </div>

      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-20 pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/resources" className="transition-colors hover:text-primary">Resources</Link>
            <span>→</span>
            <Link to="/resources/academic" className="transition-colors hover:text-primary">Academic</Link>
            <span>→</span>
            <span className="text-foreground">Design Thinking</span>
          </div>
        </div>
      </div>

      {/* HERO — centré */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Button variant="ghost" size="sm" asChild className="mx-auto mb-6 hover:bg-muted/60">
            <Link to="/resources/academic" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Academic Resources
            </Link>
          </Button>

          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#0c3d5e]/10 px-4 py-2 text-sm font-medium text-[#0c3d5e]">
            💡 Design Thinking
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0c3d5e]">
            Design Thinking
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Creative problem-solving and innovation methodologies
          </p>
        </div>
      </section>

      {/* Toolsheets */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mx-auto inline-flex items-center gap-2 text-2xl font-bold text-[#0c3d5e]">
              <FolderOpen className="h-6 w-6 text-mana-accent" />
              Project Toolsheets
            </h2>
            <p className="mt-1 text-muted-foreground">
              Practical tools and methods for design thinking processes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {toolsheets.map((tool) => (
              <ResourceCard key={tool.id} resource={tool} type="toolsheet" />
            ))}
          </div>
        </div>
      </section>

      {/* Academic Resources */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mx-auto inline-flex items-center gap-2 text-2xl font-bold text-[#0c3d5e]">
              <FileText className="h-6 w-6 text-manacademy" />
              Academic Resources
            </h2>
            <p className="mt-1 text-muted-foreground">
              Comprehensive guides to design thinking methodology
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {academicResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} type="resource" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
