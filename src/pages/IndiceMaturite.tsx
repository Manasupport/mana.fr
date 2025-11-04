import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  FileDown, 
  CheckCircle,
  BarChart3,
  Target,
  Users,
  Download,
  Share2,
  Clock,
  Award,
  TrendingUp,
  Lightbulb,
  Brain,
  Rocket
} from 'lucide-react';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SectionCard } from '@/components/SectionCard';
import { ResultsRadar } from '@/components/ResultsRadar';
import { RecommendationCard } from '@/components/RecommendationCard';
import { ArchetypeCard } from '@/components/ArchetypeCard';

import { 
  calculateMaturityScore, 
  generateFullReport, 
  validateAnswers, 
  getArchetypeDetails,
  getSections,
  type Answer 
} from '@/lib/maturity';

type Phase = 'introduction' | 'questionnaire' | 'results';

const IndiceMaturite: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  
  const [currentPhase, setCurrentPhase] = useState<Phase>('introduction');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const sections = getSections(currentLanguage);
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  // Gestion des réponses
  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Navigation entre sections
  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // Fin du questionnaire, calculer les résultats
      calculateResults();
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  // Vérifier si la section actuelle est complète
  const isCurrentSectionComplete = () => {
    const currentSection = sections[currentSectionIndex];
    return currentSection.questions.every(q => answers[q.id] !== undefined);
  };

  // Calculer les résultats
  const calculateResults = () => {
    const answerArray: Answer[] = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value
    }));

    const validation = validateAnswers(answerArray, currentLanguage);
    if (!validation.valid) {
      alert(t('indiceMaturite.results.validationError'));
      return;
    }

    const fullReport = generateFullReport(answerArray, currentLanguage);
    setResults(fullReport);
    setCurrentPhase('results');
  };

  // Recommencer le questionnaire
  const resetQuestionnaire = () => {
    setAnswers({});
    setResults(null);
    setCurrentSectionIndex(0);
    setCurrentPhase('introduction');
  };

  // Génération PDF (placeholder)
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // TODO: Installer jsPDF et implémenter la génération
      // const { generateMaturityPDF } = await import('@/lib/pdfGenerator');
      // await generateMaturityPDF(results);
      
      // Version temporaire - download des données JSON
      const dataStr = JSON.stringify(results, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Indice-Maturite-Innovation-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
      alert(t('indiceMaturite.results.pdfGenerationError'));
    }
    setIsGeneratingPDF(false);
  };

  // Page d'introduction
  if (currentPhase === 'introduction') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Brain className="h-4 w-4" />
                  {t('indiceMaturite.introduction.pageTitle')}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {t('indiceMaturite.hero.titlePart1')}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    {t('indiceMaturite.hero.titlePart2')}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t('indiceMaturite.introduction.heroTitle')}
                </p>
                
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">40</div>
                    <div className="text-sm text-gray-600">{t('indiceMaturite.introduction.stats.questions')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">{t('indiceMaturite.introduction.stats.dimensions')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">27</div>
                    <div className="text-sm text-gray-600">{t('indiceMaturite.introduction.stats.archetypes')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">15</div>
                    <div className="text-sm text-gray-600">{t('indiceMaturite.introduction.stats.minutes')}</div>
                  </div>
                </div>
              </div>

              {/* Fonctionnalités principales */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">{t('indiceMaturite.introduction.mainFeatures.completeEvaluation.title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('indiceMaturite.introduction.mainFeatures.completeEvaluation.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Target className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">{t('indiceMaturite.introduction.mainFeatures.personalizedProfile.title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('indiceMaturite.introduction.mainFeatures.personalizedProfile.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Rocket className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">{t('indiceMaturite.introduction.mainFeatures.actionPlan.title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('indiceMaturite.introduction.mainFeatures.actionPlan.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Processus d'évaluation */}
              <Card className="mb-12 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-gray-900">{t('indiceMaturite.introduction.howItWorks.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-900">{t('indiceMaturite.introduction.howItWorks.steps.respond.title')}</h4>
                      <p className="text-gray-600 text-sm">
                        {t('indiceMaturite.introduction.howItWorks.steps.respond.description')}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-600 font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-900">{t('indiceMaturite.introduction.howItWorks.steps.analyze.title')}</h4>
                      <p className="text-gray-600 text-sm">
                        {t('indiceMaturite.introduction.howItWorks.steps.analyze.description')}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <span className="text-purple-600 font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-900">{t('indiceMaturite.introduction.howItWorks.steps.progress.title')}</h4>
                      <p className="text-gray-600 text-sm">
                        {t('indiceMaturite.introduction.howItWorks.steps.progress.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dimensions évaluées */}
              <Card className="mb-12 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-gray-900 mb-4">
                    {t('indiceMaturite.introduction.dimensionsTitle')}
                  </CardTitle>
                  <p className="text-center text-gray-600">
                    {t('indiceMaturite.introduction.completeScientificEvaluation')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sections.map((section, index) => (
                      <div key={section.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{section.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{section.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bénéfices */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-8 w-8 text-blue-600" />
                      <h3 className="text-xl font-bold text-blue-900">{t('indiceMaturite.introduction.forYourOrganization')}</h3>
                    </div>
                    <ul className="space-y-3 text-blue-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-blue-600" />
                        {t('indiceMaturite.introduction.benchmarkMaturity')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-blue-600" />
                        {t('indiceMaturite.introduction.identifyStrengths')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-blue-600" />
                        {t('indiceMaturite.introduction.getRoadmap')}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <h3 className="text-xl font-bold text-green-900">{t('indiceMaturite.introduction.expectedResults')}</h3>
                    </div>
                    <ul className="space-y-3 text-green-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-green-600" />
                        {t('indiceMaturite.introduction.accelerateTransformation')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-green-600" />
                        {t('indiceMaturite.introduction.optimizeInvestments')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-green-600" />
                        {t('indiceMaturite.introduction.developAdvantage')}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Call to Action */}
              <Alert className="mb-12 border-blue-200 bg-blue-50">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  {t('indiceMaturite.introduction.estimatedTimeAndPrivacy')}
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setCurrentPhase('questionnaire')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="mr-3 h-6 w-6" />
                  {t('indiceMaturite.introduction.start')}
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  {t('indiceMaturite.hero.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Phase questionnaire
  if (currentPhase === 'questionnaire') {
    const currentSection = sections[currentSectionIndex];
    const sectionAnswers = Object.fromEntries(
      Object.entries(answers).filter(([questionId]) => 
        currentSection.questions.some(q => q.id === questionId)
      )
    );

    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header avec progression */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('indiceMaturite.title')}
                </h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetQuestionnaire}
                  className="text-gray-600"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t('indiceMaturite.questionnaire.restart')}
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t('indiceMaturite.questionnaire.progress', { current: currentSectionIndex + 1, total: sections.length })}
                  </span>
                  <span className="text-gray-600">
                    {t('indiceMaturite.questionnaire.questionsCompleted', { answered: answeredQuestions, total: totalQuestions })}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-gray-500">
                  {t('indiceMaturite.questionnaire.percentCompleted', { percent: Math.round(progressPercentage) })}
                </div>
              </div>
            </div>

            {/* Section actuelle */}
            <SectionCard
              section={currentSection}
              answers={sectionAnswers}
              onAnswerChange={handleAnswerChange}
              isCompleted={isCurrentSectionComplete()}
            />

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={goToPreviousSection}
                disabled={currentSectionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t('indiceMaturite.questionnaire.previousSection')}
              </Button>

              <div className="text-center">
                <Badge variant="secondary" className="text-sm">
                  {currentSection.title}
                </Badge>
              </div>

              <Button
                onClick={goToNextSection}
                disabled={!isCurrentSectionComplete()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentSectionIndex === sections.length - 1 ? (
                  <>
                    {t('indiceMaturite.questionnaire.seeResults')}
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    {t('indiceMaturite.questionnaire.nextSection')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </>
    );
  }

  // Phase résultats
  if (currentPhase === 'results' && results) {
    const { maturityResult, primaryArchetype, secondaryArchetype, dimensionRecommendations, globalRecommendations } = results;

    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header résultats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {t('indiceMaturite.results.yourInnovationProfile')}
                  </h1>
                  <p className="text-gray-600">
                    {t('indiceMaturite.results.evaluationResults')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={generatePDF}
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? (
                      <>{t('indiceMaturite.results.generating')}</>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" />
                        {t('indiceMaturite.results.downloadPdf')}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetQuestionnaire}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {t('indiceMaturite.results.newEvaluation')}
                  </Button>
                </div>
              </div>

              {/* Score global */}
              <div className="grid md:grid-cols-4 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(maturityResult.percentage)}%
                  </div>
                  <div className="text-sm text-gray-600">{t('indiceMaturite.results.globalScore')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {maturityResult.level}
                  </div>
                  <div className="text-sm text-gray-600">{t('indiceMaturite.results.level')}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {maturityResult.levelName}
                  </div>
                  <div className="text-sm text-gray-600">{t('indiceMaturite.results.maturity')}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {primaryArchetype?.name.split(' ').slice(-1)[0]}
                  </div>
                  <div className="text-sm text-gray-600">{t('indiceMaturite.results.archetype')}</div>
                </div>
              </div>
            </div>

            {/* Onglets des résultats */}
            <Tabs defaultValue="radar" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
                <TabsTrigger value="radar">{t('indiceMaturite.results.overview')}</TabsTrigger>
                <TabsTrigger value="archetype">{t('indiceMaturite.results.archetype')}</TabsTrigger>
                <TabsTrigger value="recommendations">{t('indiceMaturite.results.actionPlan')}</TabsTrigger>
                <TabsTrigger value="details">{t('indiceMaturite.results.details')}</TabsTrigger>
              </TabsList>

              <TabsContent value="radar" className="space-y-6">
                <ResultsRadar 
                  data={maturityResult.radarData}
                  title={t('indiceMaturite.results.maturityProfile')}
                  description={t('indiceMaturite.results.dimensionVisualization')}
                />
              </TabsContent>

              <TabsContent value="archetype" className="space-y-6">
                {primaryArchetype && (
                  <ArchetypeCard
                    primaryArchetype={primaryArchetype}
                    secondaryArchetype={secondaryArchetype}
                    confidence={maturityResult.confidence}
                  />
                )}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <RecommendationCard
                  dimensionRecommendations={dimensionRecommendations}
                  globalRecommendations={globalRecommendations}
                  overallLevel={maturityResult.level}
                  levelName={maturityResult.levelName}
                />
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('indiceMaturite.results.detailedScores')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {maturityResult.sectionScores.map((section, index) => {
                        const sectionConfig = sections.find(s => s.id === section.sectionId);
                        return (
                          <div key={section.sectionId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {sectionConfig?.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {section.score}/{section.maxScore} points
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.round(section.percentage)}%
                              </div>
                              <Badge 
                                variant={section.level >= 4 ? 'default' : section.level >= 3 ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                Niveau {section.level}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        </div>
        <Footer />
      </>
    );
  }

  return null;
};

export default IndiceMaturite;