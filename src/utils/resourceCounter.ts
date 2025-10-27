// Automatic resource counter that dynamically counts resources by category
// This ensures resource counts are always up-to-date when new resources are added

type ResourceCategory = "Project Management" | "International Strategy" | "Thesis" | "Design Thinking" | "Legal";

interface ResourceCounts {
  "Project Management": number;
  "International Strategy": number;
  "Thesis": number;
  "Design Thinking": number;
  "Legal": number;
}

// Import the metadata from ResourceView to count resources
// This ensures we're counting actual defined resources, not hardcoded numbers
const META_BY_ID: Record<string, { category: ResourceCategory }> = {
  // -------- Project Management --------
  "project-charter": { category: "Project Management" },
  "prioritization-matrix": { category: "Project Management" },
  "wbs": { category: "Project Management" },
  "gantt-diagram": { category: "Project Management" },
  "raci-matrix": { category: "Project Management" },
  "risk-assessment": { category: "Project Management" },
  "ishikawa-diagram": { category: "Project Management" },
  "business-model-canvas": { category: "Project Management" },
  "lean-canvas": { category: "Project Management" },
  "monitoring-reporting": { category: "Project Management" },
  "online-tools": { category: "Project Management" },
  "elevator-pitch": { category: "Project Management" },
  "pm-fundamentals": { category: "Project Management" },
  "minutes-template": { category: "Project Management" },
  "nda-template": { category: "Project Management" },

  // -------- International Strategy --------
  "yip-matrix": { category: "International Strategy" },
  "global-local-dilemma": { category: "International Strategy" },
  "porters-diamond": { category: "International Strategy" },
  "value-chain-configuration": { category: "International Strategy" },
  "staged-expansion": { category: "International Strategy" },
  "cage-distance": { category: "International Strategy" },

  // -------- Thesis --------
  "research-proposal": { category: "Thesis" },

  // -------- Design Thinking --------
  "prioritization-matrix-dt": { category: "Design Thinking" },
  "crazy-8": { category: "Design Thinking" },
  "how-might-we": { category: "Design Thinking" },
  "what-if": { category: "Design Thinking" },
  "golden-rules-brainstorming": { category: "Design Thinking" },
  "six-golden-rules-prototyping": { category: "Design Thinking" },
  "solutions-mapping": { category: "Design Thinking" },
  "prototype-scoping-canvas": { category: "Design Thinking" },
  "prototyping-the-solution": { category: "Design Thinking" },
  "persona": { category: "Design Thinking" },
  "empathy-map": { category: "Design Thinking" },
  "challenge-summary": { category: "Design Thinking" },
  "user-journey": { category: "Design Thinking" },
  "storymapping1": { category: "Design Thinking" },
  "problem-solving": { category: "Design Thinking" },

  // -------- Legal --------
  "terms": { category: "Legal" },
  "privacy-policy": { category: "Legal" },
};

/**
 * Automatically counts resources by category
 * @param excludeCategories - Categories to exclude from counting (e.g., ["Legal"])
 * @returns Object with resource counts per category
 */
export function getResourceCounts(excludeCategories: ResourceCategory[] = ["Legal"]): ResourceCounts {
  const counts: ResourceCounts = {
    "Project Management": 0,
    "International Strategy": 0,
    "Thesis": 0,
    "Design Thinking": 0,
    "Legal": 0,
  };

  // Count resources by iterating through all defined resources
  Object.values(META_BY_ID).forEach((resource) => {
    if (!excludeCategories.includes(resource.category)) {
      counts[resource.category]++;
    }
  });

  return counts;
}

/**
 * Get total number of resources across all categories
 * @param excludeCategories - Categories to exclude from counting (e.g., ["Legal"])
 * @returns Total count of resources
 */
export function getTotalResourceCount(excludeCategories: ResourceCategory[] = ["Legal"]): number {
  const counts = getResourceCounts(excludeCategories);
  return Object.values(counts).reduce((total, count) => total + count, 0);
}

/**
 * Get count for a specific category
 * @param category - The category to count
 * @returns Number of resources in that category
 */
export function getCategoryCount(category: ResourceCategory): number {
  return Object.values(META_BY_ID).filter(resource => resource.category === category).length;
}

/**
 * Get counts formatted for display in the UI
 * @returns Object with user-friendly category names and counts
 */
export function getFormattedResourceCounts() {
  const counts = getResourceCounts();
  
  return {
    projectManagement: counts["Project Management"],
    internationalStrategy: counts["International Strategy"], 
    thesis: counts["Thesis"],
    designThinking: counts["Design Thinking"],
    total: getTotalResourceCount(),
  };
}