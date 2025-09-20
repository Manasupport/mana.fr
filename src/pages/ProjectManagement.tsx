import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowLeft, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------ */
/*            Composant carte réutilisable                */
/* ------------------------------------------------------ */
const ResourceCard = ({ resource, type }: { resource: any; type: string }) => (
  <Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl">
    {/* halo de survol léger */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-manamind/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />
    <CardHeader className="relative z-10 pb-3">
      <div className="mb-4 flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-manamind to-manamind-dark shadow-md">
          <FileText className="h-5 w-5 text-white" />
        </div>
        {/* action secondaire discrète */}
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
        className="group/btn w-full rounded-xl border-[#0c3d5e]/30 bg-white/60 backdrop-blur transition-all hover:border-[#0c3d5e] hover:bg-white"
      >
        <Link to={`/resources/view/${resource.id}`}>
          View {type}
          <FileText className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const ProjectManagement = () => {
  const toolsheets = [
    { id: "project-charter", title: "Project Charter", description: "Define project scope, objectives, and stakeholders" },
    { id: "prioritization-matrix", title: "Prioritization Matrix", description: "Evaluate and rank project tasks by importance and urgency" },
    { id: "wbs", title: "Work Breakdown Structure (WBS)", description: "Break down project deliverables into manageable components" },
    { id: "gantt-diagram", title: "Gantt Diagram", description: "Visual timeline for project tasks and dependencies" },
    { id: "raci-matrix", title: "RACI Matrix", description: "Define roles and responsibilities for project activities" },
    { id: "risk-assessment", title: "Project Risk Assessment Matrix", description: "Identify, analyze, and manage project risks" },
    { id: "ishikawa-diagram", title: "Ishikawa Diagram", description: "Root cause analysis tool for problem solving" },
    { id: "business-model-canvas", title: "Business Model Canvas (BMC)", description: "Visualize business model components and relationships" },
    { id: "lean-canvas", title: "Lean Canvas", description: "Streamlined business model for startups and new products" },
    { id: "monitoring-reporting", title: "Project Monitoring & Reporting", description: "Track progress and communicate project status" },
    { id: "online-tools", title: "Online Tools", description: "Digital tools and platforms for project management" },

    // ✅ NEW — Elevator Pitch
    {
      id: "elevator-pitch",
      title: "Elevator Pitch",
      description: "Captivate the audience, generate interest and leave a lasting impression.",
    },
  ];

  const academicResources = [
    { id: "pm-fundamentals", title: "The Fundamentals of Project Management", description: "Comprehensive guide to project management principles" },
    { id: "minutes-template", title: "Minutes Template", description: "Standard format for meeting documentation" },
    { id: "nda-template", title: "NDA Template", description: "Non-disclosure agreement template for project confidentiality" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* halos Mana globaux */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 -left-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-[#0c3d5e]/15 to-manamind/25 blur-3xl" />
        <div className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-manacademy/15 to-manadvise/25 blur-3xl" />
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
            <span className="text-foreground">Project Management</span>
          </div>
        </div>
      </div>

      {/* HERO — centré pour cohérence */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Button variant="ghost" size="sm" asChild className="mx-auto mb-6 hover:bg-muted/60">
            <Link to="/resources/academic" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Academic Resources
            </Link>
          </Button>

          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#0c3d5e]/10 px-4 py-2 text-sm font-medium text-[#0c3d5e]">
            🗂️ Project Management
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0c3d5e]">
            Project Management
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Essential tools and frameworks for successful project delivery
          </p>
        </div>
      </section>

      {/* Project Toolsheets */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mx-auto inline-flex items-center gap-2 text-2xl font-bold text-[#0c3d5e]">
              <FolderOpen className="h-6 w-6 text-manamind" />
              Project Toolsheets
            </h2>
            <p className="mt-1 text-muted-foreground">
              Practical templates and tools for project management
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
              Comprehensive guides and templates for academic projects
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
};

export default ProjectManagement;
