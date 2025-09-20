import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

/** 1) Map route IDs -> exact PDF filenames in /public/pdfs */
const PDF_FILE_BY_ID: Record<string, string> = {
  // Project Management
  "project-charter": "project-charter.pdf",
  "prioritization-matrix": "prioritization-matrix.pdf",
  "wbs": "wbs.pdf",
  "gantt-diagram": "gantt.pdf",
  "raci-matrix": "raci.pdf",
  "risk-assessment": "project-risk-assessment-matrix.pdf",
  "ishikawa-diagram": "ishikawa-diagram.pdf",
  "business-model-canvas": "bmc.pdf",
  "lean-canvas": "lean-canvas.pdf",
  "monitoring-reporting": "project-reporting.pdf",
  "online-tools": "online-tools.pdf",

  // ✅ NEW — Elevator Pitch (Project Mgmt toolsheet)
  "elevator-pitch": "project-tool-sheet-pitchfr.pptx.pdf",

  // Project Mgmt – Academic
  "pm-fundamentals": "the-fundamentals-of-project-management.pdf",
  "minutes-template": "template-minutes.pdf",
  "nda-template": "nda-template.pdf",

  // International Strategy
  "yip-matrix": "yip-matrix.pdf",
  "global-local-dilemma": "global-local-dilemma.pdf",
  "porters-diamond": "porters-diamond.pptx.pdf",
  "value-chain-configuration": "value-chain-configuration-dilemma.pdf",
  "staged-expansion": "staged-international-expansion-model.pdf",
  "cage-distance": "cage-framework.pdf",

  // Thesis
  "research-proposal": "research-proposal.pdf",

  // Design Thinking (toolsheets)
  "prioritization-matrix-dt": "prioritization-matrix.pdf",
  "crazy-8": "crazy8.pdf",
  "how-might-we": "how-might-we.pdf",
  "what-if": "what-if.pdf",
  "golden-rules-brainstorming": "the-golden-rules-of-brainstorming.pdf",
  "six-golden-rules-prototyping": "the-6-golden-rules-of-prototyping.pdf",
  "solutions-mapping": "solutions-mapping.pdf",
  "prototype-scoping-canvas": "prototype-scoping-canvas.pdf",
  "prototyping-the-solution": "prototyping-the-solution.pdf",
  "persona": "persona.pdf",
  "empathy-map": "empathy-map.pdf",
  "challenge-summary": "challenge-summary-canvas.pdf",
  "user-journey": "the-user-journey-map.pdf",

  // Design Thinking – Academic
  "problem-solving": "problem-solving-creativity-by-design-thinking.pdf",

  // Legal (optional)
  "terms": "FR_EN_CGU_20240924.pdf",
  "privacy-policy": "FR_EN_POLITIQUE-DE-PROTECTION-DES-DONNEES.pdf",
};

/** 2) Minimal metadata so title/description/category reflect the clicked item */
type Meta = {
  title: string;
  description: string;
  category: "Project Management" | "International Strategy" | "Thesis" | "Design Thinking" | "Legal";
  whatYouLearn?: string[];
  relatedResources?: { id: string; title: string; category: Meta["category"] }[];
};

const META_BY_ID: Record<string, Meta> = {
  // -------- Project Management (toolsheets) --------
  "project-charter": {
    title: "Project Charter",
    description: "Define project scope, objectives, and stakeholders",
    category: "Project Management",
    whatYouLearn: [
      "Set clear objectives and scope",
      "Identify stakeholders and governance",
      "Outline risks and success criteria",
      "Align team and sponsors early",
    ],
  },
  "prioritization-matrix": {
    title: "Prioritization Matrix",
    description: "Evaluate and rank tasks by importance and urgency",
    category: "Project Management",
  },
  wbs: {
    title: "Work Breakdown Structure (WBS)",
    description: "Break down deliverables into manageable components",
    category: "Project Management",
  },
  "gantt-diagram": {
    title: "Gantt Diagram",
    description: "Visual timeline for tasks and dependencies",
    category: "Project Management",
    whatYouLearn: [
      "Build timelines and milestones",
      "Model dependencies between tasks",
      "Track progress visually",
    ],
  },
  "raci-matrix": {
    title: "RACI Matrix",
    description: "Define roles and responsibilities",
    category: "Project Management",
  },
  "risk-assessment": {
    title: "Project Risk Assessment Matrix",
    description: "Identify, analyze, and manage project risks",
    category: "Project Management",
  },
  "ishikawa-diagram": {
    title: "Ishikawa Diagram",
    description: "Root cause analysis for problem solving",
    category: "Project Management",
  },
  "business-model-canvas": {
    title: "Business Model Canvas (BMC)",
    description: "Visualize business model components",
    category: "Project Management",
  },
  "lean-canvas": {
    title: "Lean Canvas",
    description: "Streamlined one-page business model",
    category: "Project Management",
  },
  "monitoring-reporting": {
    title: "Project Monitoring & Reporting",
    description: "Track progress and communicate status",
    category: "Project Management",
  },
  "online-tools": {
    title: "Online Tools",
    description: "Digital tools and platforms for project management",
    category: "Project Management",
  },

  // ✅ NEW — Elevator Pitch (toolsheet)
  "elevator-pitch": {
    title: "Elevator Pitch",
    description: "Captivate the audience, generate interest and leave a lasting impression.",
    category: "Project Management",
    whatYouLearn: [
      "Craft a concise and impactful pitch",
      "Clarify value proposition and outcomes",
      "Structure a compelling 30–60s narrative",
    ],
  },

  // -------- Project Management (academic) --------
  "pm-fundamentals": {
    title: "The Fundamentals of Project Management",
    description: "Core principles, lifecycle, and best practices",
    category: "Project Management",
  },
  "minutes-template": {
    title: "Minutes Template",
    description: "Clear, reusable template for meeting minutes",
    category: "Project Management",
  },
  "nda-template": {
    title: "NDA Template",
    description: "Non-disclosure agreement for confidentiality",
    category: "Project Management",
  },

  // -------- International Strategy --------
  "yip-matrix": {
    title: "YIP Matrix",
    description: "Industry globalization drivers and pressures",
    category: "International Strategy",
  },
  "global-local-dilemma": {
    title: "The Global-Local Dilemma",
    description: "Balance standardization and local adaptation",
    category: "International Strategy",
  },
  "porters-diamond": {
    title: "Porter’s Diamond",
    description: "Assess national competitive advantage factors",
    category: "International Strategy",
  },
  "value-chain-configuration": {
    title: "Value-Chain Configuration Dilemma",
    description: "Optimize global value chain structure and location",
    category: "International Strategy",
  },
  "staged-expansion": {
    title: "Staged International Expansion Model",
    description: "Plan systematic international market entry",
    category: "International Strategy",
  },
  "cage-distance": {
    title: "CAGE Distance",
    description: "Evaluate cultural, administrative, geographic, economic distance",
    category: "International Strategy",
  },

  // -------- Thesis --------
  "research-proposal": {
    title: "Research Proposal",
    description: "Define research question, scope, and methodology",
    category: "Thesis",
  },

  // -------- Design Thinking (toolsheets) --------
  "prioritization-matrix-dt": {
    title: "Prioritization Matrix",
    description: "Select the most promising ideas to pursue",
    category: "Design Thinking",
  },
  "crazy-8": {
    title: "Crazy 8",
    description: "Fast idea generation with eight sketches in minutes",
    category: "Design Thinking",
  },
  "how-might-we": {
    title: "How Might We",
    description: "Turn insights into opportunity statements",
    category: "Design Thinking",
  },
  "what-if": {
    title: "What if…",
    description: "Explore alternative futures to stretch ideas",
    category: "Design Thinking",
  },
  "golden-rules-brainstorming": {
    title: "The Golden Rules of Brainstorming",
    description: "Run effective, inclusive ideation sessions",
    category: "Design Thinking",
  },
  "six-golden-rules-prototyping": {
    title: "The Six Golden Rules of Prototyping",
    description: "Prototype quickly, learn fast, iterate often",
    category: "Design Thinking",
  },
  "solutions-mapping": {
    title: "Solution Mapping",
    description: "Structure solution options and trade-offs",
    category: "Design Thinking",
  },
  "prototype-scoping-canvas": {
    title: "Prototype Scoping Canvas",
    description: "Define scope, assumptions, and evaluation",
    category: "Design Thinking",
  },
  "prototyping-the-solution": {
    title: "Prototyping the Solution",
    description: "Make ideas tangible for feedback",
    category: "Design Thinking",
  },
  persona: {
    title: "Persona",
    description: "Capture user archetypes and needs",
    category: "Design Thinking",
  },
  "empathy-map": {
    title: "Empathy Map",
    description: "Understand what users say, think, do, feel",
    category: "Design Thinking",
  },
  "challenge-summary": {
    title: "Challenge Summary",
    description: "Synthesize the challenge and constraints",
    category: "Design Thinking",
  },
  "user-journey": {
    title: "User Journey Map",
    description: "Visualize user steps, pains, and moments",
    category: "Design Thinking",
  },

  // -------- Design Thinking (academic) --------
  "problem-solving": {
    title: "Problem Solving & Creativity by Design Thinking",
    description: "Apply DT to structure creative problem-solving",
    category: "Design Thinking",
  },

  // -------- Legal (optional) --------
  terms: {
    title: "Terms & Conditions",
    description: "General terms of use",
    category: "Legal",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Data protection and privacy terms",
    category: "Legal",
  },
};

const ResourceView = () => {
  const { resourceId = "" } = useParams();

  // 1) Resolve PDF path
  const mappedFile = PDF_FILE_BY_ID[resourceId];
  const pdfPath = mappedFile ? `/pdfs/${mappedFile}` : `/pdfs/${resourceId}.pdf`;

  // 2) Resolve meta (title/description/category) from id
  const meta = META_BY_ID[resourceId] || {
    title: "Unknown Resource",
    description: "No description available.",
    category: "Project Management" as const,
    whatYouLearn: [],
    relatedResources: [],
  };

  const resourceData = {
    title: meta.title,
    description: meta.description,
    pdfPath,
    category: meta.category,
    whatYouLearn: meta.whatYouLearn || [],
    relatedResources: meta.relatedResources || [],
  };

  const backToPath =
    meta.category === "Project Management"
      ? "/resources/academic/project-management"
      : meta.category === "International Strategy"
      ? "/resources/academic/international-strategy"
      : meta.category === "Thesis"
      ? "/resources/academic/thesis"
      : meta.category === "Design Thinking"
      ? "/resources/academic/design-thinking"
      : "/resources/academic";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb / Back */}
      <div className="pt-20 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to={backToPath} className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {resourceData.category}
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-mana-dark mb-4">
                {resourceData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {resourceData.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-manamind/10 text-manamind rounded-full">
                  {resourceData.category}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-manamind hover:bg-manamind-dark" asChild>
                <a href={resourceData.pdfPath} download>
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={resourceData.pdfPath} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open in new tab
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {resourceData.pdfPath ? (
                <iframe
                  src={resourceData.pdfPath}
                  title={resourceData.title}
                  className="w-full h-[800px]"
                />
              ) : (
                <div className="w-full h-[800px] bg-muted/30 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-mana-dark mb-2">PDF not found</h3>
                    <p className="text-muted-foreground">Please check the file name in /public/pdfs.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <p className="mt-3 text-sm text-muted-foreground">
            If the PDF doesn’t load,{" "}
            <a href={resourceData.pdfPath} target="_blank" rel="noopener noreferrer" className="underline">
              open it in a new tab
            </a>.
          </p>
        </div>
      </section>

      {/* What You'll Learn + Related */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-mana-dark mb-6">
                What you'll learn
              </h2>
              {resourceData.whatYouLearn.length ? (
                <ul className="space-y-3">
                  {resourceData.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-manamind mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific learning outcomes listed.</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-mana-dark mb-6">
                Related resources
              </h2>
              {resourceData.relatedResources.length ? (
                <div className="space-y-4">
                  {resourceData.relatedResources.map((resource) => (
                    <Card key={resource.id} className="group hover:shadow-md transition-all duration-200 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-mana-dark group-hover:text-manamind transition-colors">
                              {resource.title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {resource.category}
                            </CardDescription>
                          </div>
                          <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-manamind transition-colors rotate-180" />
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No related resources yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourceView;
