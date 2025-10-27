/**
 * Minimal PDF mapping helper used by ResourceView and resource cards.
 * Returns a path under /pdfs for a given resource id.
 */
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

  // Elevator Pitch
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
  "storymapping1": "storymapping1.pdf",

  // Design Thinking – Academic
  "problem-solving": "problem-solving-creativity-by-design-thinking.pdf",

  // Legal (optional)
  "terms": "FR_EN_CGU_20240924.pdf",
  "privacy-policy": "FR_EN_POLITIQUE-DE-PROTECTION-DES-DONNEES.pdf",
};

export function getPdfPath(id: string) {
  const mapped = PDF_FILE_BY_ID[id];
  return mapped ? `/pdfs/${mapped}` : `/pdfs/${id}.pdf`;
}

export default PDF_FILE_BY_ID;
