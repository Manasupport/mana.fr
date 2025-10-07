// src/data/formations.ts

export interface Formation {
  id: string;
  title: string;
  axis: 'innovation' | 'rse' | 'strategy';
  shortDescription: string;
  duration: string;
  format: string[];
  icon: string;
  accent?: string;
  slug: string; // DOIT matcher le nom de fichier .tsx (kebab-case)
}

export interface FormationAxis {
  id: 'innovation' | 'rse' | 'strategy';
  title: string;
  description: string;
  formatsLabel: string;
  icon: string;
  accent?: string;
}

export const formationAxes: FormationAxis[] = [
  {
    id: 'innovation',
    title: "Innover pour s'adapter",
    description: "Accélérer l’innovation utile : méthodes, posture et cas d’usage.",
    formatsLabel: "Formats : séminaire, atelier, parcours hybride (présentiel ou distanciel)",
    icon: 'Lightbulb',
    accent: '#dfaf2c',
  },
  {
    id: 'rse',
    title: "Créer de la valeur avec la RSE",
    description: "Intégrer la durabilité dans les décisions et les opérations.",
    formatsLabel: "Formats : séminaire, cas pratiques, accompagnement terrain",
    icon: 'Leaf',
    accent: '#dfaf2c',
  },
  {
    id: 'strategy',
    title: 'Anticiper par la stratégie',
    description: "Clarifier la vision et structurer les choix de croissance.",
    formatsLabel: "Formats : workshop, formation flash, parcours complet",
    icon: 'Target',
    accent: '#dfaf2c',
  },
];

export const formations: Formation[] = [
  // Innovation
  {
    id: 'agilite-innovation-industriel',
    title: "Agilité & innovation en contexte industriel",
    axis: 'innovation',
    shortDescription:
      "Cette formation décrypte les fondamentaux de l’approche agile et vous aide à concevoir votre modèle de conduite de projet adapté à votre métier.",
    duration: '1–3 jours',
    format: ['Séminaire', 'Atelier', 'Parcours hybride'],
    icon: 'Zap',
    accent: '#dfaf2c',
    slug: 'agilite-innovation', // <= correspond à agilite-innovation.tsx
  },
  {
    id: 'culture-strategie-innovation',
    title: "Culture & stratégie d'innovation",
    axis: 'innovation',
    shortDescription:
      "Cette formation decrypte les sous jacents d'une culture d'innovation et vous aide à diffuser la posture d'intrapreneur aux équipes.",
    duration: '1–2 jours',
    format: ['Séminaire', 'Atelier'],
    icon: 'Lightbulb',
    accent: '#dfaf2c',
    slug: 'culture-strategie-innovation',
  },
  {
    id: 'ia-cas-usage',
    title: "Acculturation et adoption de l’IA en entreprise",
    axis: 'innovation',
    shortDescription:
      "Cette formation accelere l’adoption et l’exploration de l’IA et de l’innovation digitale, l’exploration d’outils IA générative /LLM, ateliers d’idéation autour de cas métiers, sensibilisation à l’impact environnemental…",
    duration: '1–2 jours',
    format: ['Atelier', 'Parcours hybride'],
    icon: 'Brain',
    accent: '#dfaf2c',
    slug: 'intelligence-artificielle-cas-usage',
  },
  {
    id: 'business-model-design',
    title: 'Business model design', // <= ex-"Méthodes mixtes quali-quanti"
    axis: 'innovation',
    shortDescription:
      "Cette formation fournit les clefs pour decrypter les nouveaux modeles d'affaires pour créer de la valeur durablement (plateformisation, économie de la fonctionnalité, circularité).",
    duration: '1–2 jours',
    format: ['Atelier', 'Workshop'],
    icon: 'Search',
    accent: '#dfaf2c',
    slug: 'business-model-design', // <= correspond à business-model-design.tsx
  },

  // RSE
  {
    id: 'rse-operationnelle',
    title: 'Stratégie de transformation durable & RSE opérationnelle',
    axis: 'rse',
    shortDescription:
      "Sensibilisation aux fondamentaux de la RSE, réflexion secteur par secteur, définition de plans d’action concrets pour les équipes.",
    duration: '1–3 jours',
    format: ['Séminaire', 'Cas pratiques', 'Accompagnement terrain'],
    icon: 'Leaf',
    accent: '#dfaf2c',
    slug: 'strategie-transformation-durable-rse-operationnelle',
  },
  {
    id: 'eco-conception-carbone-csrd',
    title: 'Éco-conception, bilan carbone, CSRD',
    axis: 'rse',
    shortDescription:
      "Comprendre les référentiels, évaluer l’impact environnemental de vos offres. Introduction aux obligations de reporting (CSRD).",
    duration: '1–2 jours',
    format: ['Séminaire', 'Hybride'],
    icon: 'Calculator',
    accent: '#dfaf2c',
    slug: 'eco-conception-bilan-carbone-csrd',
  },
  {
    id: 'economie-circulaire-eco-innovation',
    title: 'Économie circulaire & éco-innovation',
    axis: 'rse',
    shortDescription:
      "Découvrir les modèles durables, explorer les principes d’écoconception, réinterroger le business model à l’aune des limites planétaires.",
    duration: '1–2 jours',
    format: ['Workshop', 'Séminaire'],
    icon: 'Recycle',
    accent: '#dfaf2c',
    slug: 'economie-circulaire-eco-innovation',
  },
  {
    id: 'numerique-responsable-impact',
    title: 'Numérique responsable & impact digital',
    axis: 'rse',
    shortDescription:
      "Mesurer l’empreinte environnementale du numérique et déployer une stratégie digitale durable.",
    duration: '1 jour',
    format: ['Présentiel', 'Distanciel'],
    icon: 'Monitor',
    accent: '#dfaf2c',
    slug: 'numerique-responsable-impact-digital',
  },

  // Stratégie
  {
    id: 'vision-mission-valeurs',
    title: "Vision, mission, raison d'être & valeurs",
    axis: 'strategy',
    shortDescription:
      "Clarifier les fondamentaux identitaires de votre organisation pour renforcer l’engagement et la cohérence stratégique.",
    duration: '1–2 jours',
    format: ['Workshop', 'Parcours'],
    icon: 'Eye',
    accent: '#dfaf2c',
    slug: 'vision-mission-raison-detre-valeurs',
  },
  {
    id: 'diagnostic-strategique',
    title: 'Diagnostic stratégique',
    axis: 'strategy',
    shortDescription:
      "Maîtriser SWOT, PESTEL, 5 forces, BCG… et structurer la prise de décision.",
    duration: '1–2 jours',
    format: ['Présentiel', 'Hybride'],
    icon: 'Search',
    accent: '#dfaf2c',
    slug: 'diagnostic-strategique',
  },
  {
    id: 'strategies-croissance',
    title: 'Stratégies de croissance',
    axis: 'strategy',
    shortDescription:
      "Explorer diversification, internationalisation, croissance interne/externe, partenariats…",
    duration: '1–2 jours',
    format: ['Workshop', 'Accompagnement'],
    icon: 'TrendingUp',
    accent: '#dfaf2c',
    slug: 'strategies-de-croissance',
  },
  {
    id: 'positionnement-business-model',
    title: 'Positionnement stratégique & business model',
    axis: 'strategy',
    shortDescription:
      "Proposition de valeur, benchmark, Océan Bleu, Business Model Canvas, Value Proposition Design.",
    duration: '1–2 jours',
    format: ['Workshop', 'Parcours'],
    icon: 'Building2',
    accent: '#dfaf2c',
    slug: 'positionnement-strategique-business-model',
  },
];
