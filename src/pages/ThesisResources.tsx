import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowLeft, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { getPdfPath } from "@/lib/resources";

/* ------------------------------------------------------ */
/*            Composant carte réutilisable                */
/* ------------------------------------------------------ */
const ResourceCard = ({ resource }: { resource: { id:string; title:string; description:string } }) => (
  <Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl">
    {/* halo de survol léger */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-manacademy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />
    <CardHeader className="relative z-10 pb-3">
      <div className="mb-4 flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-manacademy to-manacademy-dark shadow-md">
          <FileText className="h-5 w-5 text-white" />
        </div>
        {/* action secondaire discrète */}
        <a
          href={getPdfPath(resource.id)}
          download
          className="opacity-0 transition-opacity group-hover:opacity-100 inline-flex items-center"
          aria-label="Quick download"
        >
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </a>
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
        className="group/btn w-full rounded-xl border-[#0c3d5e]/30 bg-white/60 backdrop-blur transition-all hover:border-[#0c3d5e] hover:bg-white"
      >
        <Link to={`/resources/view/${resource.id}`}>
          View toolsheet
          <FileText className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default function ThesisResources() {
  const toolsheets = [
    {
      id: "research-proposal",
      title: "Research Proposal",
      description: "Comprehensive template for structuring academic research proposals",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* halos Mana globaux */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 -left-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-[#0c3d5e]/15 to-manacademy/25 blur-3xl" />
        <div className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-manadvise/10 to-manacademy/20 blur-3xl" />
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
            <span className="text-foreground">Thesis</span>
          </div>
        </div>
      </div>

      {/* HERO — publications-like styling (halos, centered badge) */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-[#0c3d5e] to-manamind opacity-15 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-tr from-manadvise to-manacademy opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button variant="ghost" size="sm" asChild className="absolute left-4 -top-6 sm:-top-12 hover:bg-muted/60">
            <Link to="/resources/academic" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Academic Resources
            </Link>
          </Button>

          <div className="inline-flex items-center gap-2 bg-[#0c3d5e]/10 text-[#0c3d5e] px-4 py-2 rounded-full text-sm font-medium mb-6 mx-auto">
            Thesis Resources
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-5 text-[#0c3d5e]">
            Thesis Resources
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Academic research and thesis development resources
          </p>
        </div>
      </section>

      {/* Toolsheets */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mx-auto inline-flex items-center gap-2 text-2xl font-bold text-[#0c3d5e]">
              <FolderOpen className="h-6 w-6 text-manacademy" />
              Project Toolsheets
            </h2>
            <p className="mt-1 text-muted-foreground">
              Essential tools for academic research and thesis writing
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {toolsheets.map((tool) => (
              <ResourceCard key={tool.id} resource={tool} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
