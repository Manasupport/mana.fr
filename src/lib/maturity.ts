import maturityConfigFr from '../data/maturity.config.fr.json';
import archetypesFr from '../data/archetypes.fr.json';
import recommendationsFr from '../data/recommendations.fr.json';
import maturityConfigEn from '../data/maturity.config.en.json';
import archetypesEn from '../data/archetypes.en.json';
import recommendationsEn from '../data/recommendations.en.json';

/**
 * Récupère les fichiers de configuration selon la langue
 */
function getConfigForLanguage(language: string = 'fr') {
  const isEnglish = language === 'en';
  return {
    maturityConfig: isEnglish ? maturityConfigEn : maturityConfigFr,
    archetypes: isEnglish ? archetypesEn : archetypesFr,
    recommendations: isEnglish ? recommendationsEn : recommendationsFr
  };
}

export interface Answer {
  questionId: string;
  value: number;
}

export interface SectionScore {
  sectionId: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: number;
}

export interface MaturityResult {
  totalScore: number;
  percentage: number;
  level: number;
  levelName: string;
  sectionScores: SectionScore[];
  primaryArchetype: string;
  secondaryArchetype?: string;
  confidence: number;
  radarData: RadarDataPoint[];
}

export interface RadarDataPoint {
  dimension: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ArchetypeResult {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  confidence: number;
}

/**
 * Calcule le score total et les scores par section
 */
export function calculateMaturityScore(answers: Answer[], language: string = 'fr'): MaturityResult {
  const { maturityConfig, archetypes } = getConfigForLanguage(language);
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  const sectionScores: SectionScore[] = [];
  let totalScore = 0;
  let totalQuestions = 0;

  // Calcul des scores par section
  maturityConfig.sections.forEach(section => {
    let sectionScore = 0;
    let questionCount = 0;

    section.questions.forEach(question => {
      const answer = answerMap.get(question.id);
      if (answer !== undefined) {
        sectionScore += answer;
        questionCount++;
      }
    });

    const maxSectionScore = questionCount * 5; // 5 étant la note max par question
    const percentage = questionCount > 0 ? (sectionScore / maxSectionScore) * 100 : 0;
    
    sectionScores.push({
      sectionId: section.id,
      score: sectionScore,
      maxScore: maxSectionScore,
      percentage,
      level: getMaturityLevelFromPercentage(percentage)
    });

    // Score total simple - somme de tous les scores
    totalScore += sectionScore;
    totalQuestions += questionCount;
  });

  // Calcul du pourcentage global
  const maxTotalScore = totalQuestions * 5;
  const totalPercentage = totalQuestions > 0 ? (totalScore / maxTotalScore) * 100 : 0;
  
  // Niveau de maturité global basé sur le pourcentage
  const overallLevel = getMaturityLevelFromPercentage(totalPercentage);
  const levelInfo = maturityConfig.scoringConfig.maturityLevels.find(l => l.level === overallLevel);

  // Détection des archétypes basée sur les profils de scores par section
  const { primaryArchetype, secondaryArchetype, confidence } = detectArchetypes(sectionScores, totalPercentage, archetypes);

  // Données pour le radar chart
  const radarData = createRadarData(sectionScores, maturityConfig);

  return {
    totalScore,
    percentage: totalPercentage,
    level: overallLevel,
    levelName: levelInfo?.name || '',
    sectionScores,
    primaryArchetype,
    secondaryArchetype,
    confidence,
    radarData
  };
}

/**
 * Détermine le niveau de maturité à partir du score total
 */
function getMaturityLevelFromScore(score: number, maturityConfig: any): number {
  // Cette fonction n'est plus utilisée avec le nouveau système basé sur les pourcentages
  return getMaturityLevelFromPercentage(score);
}

/**
 * Détermine le niveau de maturité à partir du pourcentage
 */
function getMaturityLevelFromPercentage(percentage: number): number {
  if (percentage >= 80) return 5;
  if (percentage >= 65) return 4;
  if (percentage >= 50) return 3;
  if (percentage >= 35) return 2;
  return 1;
}

/**
 * Détecte les archétypes principaux et secondaires
 */
/**
 * Détecte les archétypes basé sur les profils de scores par section
 */
function detectArchetypes(sectionScores: SectionScore[], totalPercentage: number, archetypes: any): {
  primaryArchetype: string;
  secondaryArchetype?: string;
  confidence: number;
} {
  // Calcul du profil de l'organisation
  const orgProfile = {
    culture: getCultureLevel(sectionScores.find(s => s.sectionId === 'strategic-vision')?.percentage || 0),
    strategie: getStrategieType(sectionScores.find(s => s.sectionId === 'governance-organization')?.percentage || 0),
    ouverture: getOuvertureType(sectionScores.find(s => s.sectionId === 'culture-innovation')?.percentage || 0),
    type: getTypeInnovation(sectionScores.find(s => s.sectionId === 'processes-methods')?.percentage || 0),
    rythme: getRythmeInnovation(sectionScores.find(s => s.sectionId === 'partnerships-ecosystem')?.percentage || 0),
    source: getSourceInnovation(sectionScores.find(s => s.sectionId === 'market-customer')?.percentage || 0),
    focus: getFocusInnovation(sectionScores.find(s => s.sectionId === 'technology-digital')?.percentage || 0),
    niveau: getNiveauGlobal(totalPercentage)
  };

  // Recherche de l'archétype le plus proche
  let bestMatch = null;
  let bestScore = 0;
  let allScores: any[] = [];

  if (archetypes && archetypes.archetypes) {
    archetypes.archetypes.forEach((archetype: any) => {
      const score = calculateArchetypeMatch(orgProfile, archetype.scoreProfile || {});
      allScores.push({ id: archetype.id, name: archetype.name, score, profile: archetype.scoreProfile });
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = archetype;
      }
    });
  }

  // Debug: log du profil et des scores
  console.log('Profil Organisation:', orgProfile);
  console.log('Scores des archétypes:', allScores.sort((a, b) => b.score - a.score).slice(0, 5));

  // Si aucun archétype correspondant trouvé ou score trop faible, utiliser un archétype par défaut
  if (!bestMatch || bestScore < 30) {
    const defaultArchetype = getDefaultArchetypeByLevel(totalPercentage);
    console.log(`Archétype par défaut sélectionné: ${defaultArchetype} (score trop faible: ${bestScore})`);
    return {
      primaryArchetype: defaultArchetype,
      confidence: 0.3
    };
  }

  console.log(`Archétype détecté: ${bestMatch.id} avec un score de ${bestScore}%`);
  return {
    primaryArchetype: bestMatch.id,
    confidence: Math.min(bestScore / 100, 0.95)
  };
}

/**
 * Calcule la correspondance entre le profil organisation et un archétype
 */
function calculateArchetypeMatch(orgProfile: any, archetypeProfile: any): number {
  let totalMatches = 0;
  let totalCriteria = 0;
  let matchWeight = 0;

  const weights = {
    culture: 20,
    strategie: 20,
    ouverture: 15,
    type: 15,
    rythme: 10,
    source: 10,
    focus: 5,
    niveau: 5
  };

  Object.keys(orgProfile).forEach(key => {
    if (archetypeProfile[key] && weights[key]) {
      totalCriteria += weights[key];
      
      // Correspondance exacte
      if (orgProfile[key] === archetypeProfile[key]) {
        totalMatches += weights[key];
      }
      // Correspondance partielle pour certains critères
      else if (key === 'niveau' || key === 'culture') {
        // Tolérance pour les niveaux adjacents
        const orgLevel = getLevelNumber(orgProfile[key]);
        const archLevel = getLevelNumber(archetypeProfile[key]);
        const diff = Math.abs(orgLevel - archLevel);
        if (diff <= 1) {
          totalMatches += weights[key] * 0.7; // 70% de correspondance pour les niveaux adjacents
        }
      }
      // Correspondance pour "mixte" - peut correspondre partiellement à d'autres valeurs
      else if (archetypeProfile[key] === 'mixte' || orgProfile[key] === 'mixte') {
        totalMatches += weights[key] * 0.5; // 50% de correspondance pour mixte
      }
    }
  });

  return totalCriteria > 0 ? (totalMatches / totalCriteria) * 100 : 0;
}

/**
 * Convertit les niveaux textuels en nombres pour la comparaison
 */
function getLevelNumber(level: string): number {
  const levels = {
    'faible': 1,
    'moyen': 2, 
    'moyenne': 2,
    'eleve': 3,
    'forte': 3,
    'tres-eleve': 4
  };
  return levels[level] || 1;
}

// Fonctions de mapping des scores vers les profils
function getCultureLevel(percentage: number): string {
  if (percentage >= 70) return 'forte';
  if (percentage >= 40) return 'moyenne';
  return 'faible';
}

function getStrategieType(percentage: number): string {
  if (percentage >= 70) return 'exploration';
  if (percentage >= 40) return 'ambidextre';
  return 'exploitation';
}

function getOuvertureType(percentage: number): string {
  if (percentage >= 70) return 'ouverte';
  if (percentage >= 40) return 'mixte';
  return 'fermee';
}

function getTypeInnovation(percentage: number): string {
  if (percentage >= 70) return 'radical';
  if (percentage >= 40) return 'mixte';
  return 'incrementale';
}

function getRythmeInnovation(percentage: number): string {
  if (percentage >= 70) return 'disruptif';
  if (percentage >= 40) return 'mixte';
  return 'continue';
}

function getSourceInnovation(percentage: number): string {
  if (percentage >= 70) return 'techno-push';
  if (percentage >= 40) return 'mixte';
  return 'market-pull';
}

function getFocusInnovation(percentage: number): string {
  if (percentage >= 80) return 'business-model';
  if (percentage >= 60) return 'usage';
  if (percentage >= 40) return 'process';
  return 'produit';
}

function getNiveauGlobal(percentage: number): string {
  if (percentage >= 90) return 'tres-eleve';
  if (percentage >= 70) return 'eleve';
  if (percentage >= 40) return 'moyen';
  return 'faible';
}

function getDefaultArchetypeByLevel(percentage: number): string {
  if (percentage >= 90) return 'integratrice-360';
  if (percentage >= 80) return 'visionnaire-structuree';
  if (percentage >= 70) return 'innovatrice-durable';
  if (percentage >= 60) return 'pragmatiquement-ambidextre';
  if (percentage >= 40) return 'apprenante-transition';
  if (percentage >= 30) return 'artisane-reactive';
  if (percentage >= 20) return 'introspective-prudente';
  return 'executante-traditionnelle';
}

/**
 * Crée les données pour le graphique radar
 */
function createRadarData(sectionScores: SectionScore[], maturityConfig: any): RadarDataPoint[] {
  return maturityConfig.sections.map((section: any) => {
    const sectionScore = sectionScores.find(s => s.sectionId === section.id);
    return {
      dimension: section.title,
      score: sectionScore?.score || 0,
      maxScore: sectionScore?.maxScore || 25,
      percentage: sectionScore?.percentage || 0
    };
  });
}

/**
 * Obtient les sections du questionnaire selon la langue
 */
export function getSections(language: string = 'fr') {
  const { maturityConfig } = getConfigForLanguage(language);
  return maturityConfig.sections;
}

/**
 * Obtient les détails d'un archétype
 */
export function getArchetypeDetails(archetypeId: string, language: string = 'fr'): ArchetypeResult | null {
  const { archetypes } = getConfigForLanguage(language);
  const archetype = archetypes.archetypes.find((a: any) => a.id === archetypeId);
  if (!archetype) return null;

  return {
    id: archetype.id,
    name: archetype.name,
    description: archetype.description,
    characteristics: archetype.characteristics,
    strengths: archetype.strengths,
    challenges: archetype.challenges,
    recommendations: archetype.recommendations,
    confidence: 1.0 // Sera remplacé par la vraie confiance
  };
}

/**
 * Obtient les recommandations pour une dimension et un niveau
 */
export function getDimensionRecommendations(dimensionId: string, level: number, language: string = 'fr') {
  const { recommendations } = getConfigForLanguage(language);
  const dimensionRecs = recommendations.recommendations[dimensionId];
  if (!dimensionRecs) return null;

  const levelKey = `level${level}`;
  return dimensionRecs[levelKey] || null;
}

/**
 * Obtient les recommandations globales selon le niveau de maturité
 */
export function getGlobalRecommendations(level: number, language: string = 'fr') {
  const { recommendations } = getConfigForLanguage(language);
  const levelNames = {
    1: 'level1',
    2: 'level2', 
    3: 'level3',
    4: 'level4',
    5: 'level5'
  };

  const levelKey = levelNames[level as keyof typeof levelNames] || 'level1';
  return recommendations.globalRecommendations[levelKey] || null;
}

/**
 * Génère un rapport complet d'analyse
 */
export function generateFullReport(answers: Answer[], language: string = 'fr') {
  const { maturityConfig } = getConfigForLanguage(language);
  const maturityResult = calculateMaturityScore(answers, language);
  const primaryArchetype = getArchetypeDetails(maturityResult.primaryArchetype, language);
  const secondaryArchetype = maturityResult.secondaryArchetype ? 
    getArchetypeDetails(maturityResult.secondaryArchetype, language) : null;

  // Recommandations par dimension
  const dimensionRecommendations = maturityResult.sectionScores.map(section => {
    const sectionConfig = maturityConfig.sections.find((s: any) => s.id === section.sectionId);
    const recommendations = getDimensionRecommendations(section.sectionId, section.level, language);
    
    return {
      dimension: sectionConfig?.title || section.sectionId,
      level: section.level,
      percentage: section.percentage,
      recommendations
    };
  });

  // Recommandations globales
  const globalRecommendations = getGlobalRecommendations(maturityResult.level);

  return {
    maturityResult,
    primaryArchetype,
    secondaryArchetype,
    dimensionRecommendations,
    globalRecommendations,
    timestamp: new Date().toISOString()
  };
}

/**
 * Valide les réponses du questionnaire
 */
export function validateAnswers(answers: Answer[], language: string = 'fr'): { valid: boolean; errors: string[] } {
  const { maturityConfig } = getConfigForLanguage(language);
  const errors: string[] = [];
  const allQuestionIds = maturityConfig.sections.flatMap((section: any) => 
    section.questions.map((q: any) => q.id)
  );

  // Vérifier que toutes les questions ont une réponse
  const answeredQuestions = new Set(answers.map(a => a.questionId));
  
  for (const questionId of allQuestionIds) {
    if (!answeredQuestions.has(questionId)) {
      errors.push(`Question manquante: ${questionId}`);
    }
  }

  // Vérifier que les valeurs sont dans la plage valide (1-5)
  for (const answer of answers) {
    if (answer.value < 1 || answer.value > 5) {
      errors.push(`Valeur invalide pour ${answer.questionId}: ${answer.value}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Obtient les statistiques de benchmark (simulées pour l'exemple)
 */
export function getBenchmarkData(sectorId?: string) {
  // Ces données seraient normalement issues d'une base de données
  return {
    averageScore: 125,
    medianScore: 118,
    topQuartile: 155,
    sectorAverage: sectorId ? 135 : undefined,
    participantCount: 847,
    lastUpdate: '2024-01-15'
  };
}

/**
 * Calcule les tendances d'évolution (nécessiterait des données historiques)
 */
export function calculateTrends(currentResult: MaturityResult, previousResults?: MaturityResult[]) {
  if (!previousResults || previousResults.length === 0) {
    return null;
  }

  const lastResult = previousResults[previousResults.length - 1];
  
  return {
    totalScoreEvolution: currentResult.totalScore - lastResult.totalScore,
    levelEvolution: currentResult.level - lastResult.level,
    dimensionEvolutions: currentResult.sectionScores.map(current => {
      const previous = lastResult.sectionScores.find(s => s.sectionId === current.sectionId);
      return {
        dimension: current.sectionId,
        evolution: previous ? current.percentage - previous.percentage : 0
      };
    })
  };
}