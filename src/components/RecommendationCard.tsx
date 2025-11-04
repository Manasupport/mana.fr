import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  Target, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface RecommendationData {
  title: string;
  description: string;
  actions: string[];
  kpis: string[];
  timeline: string;
}

interface DimensionRecommendation {
  dimension: string;
  level: number;
  percentage: number;
  recommendations: RecommendationData | null;
}

interface GlobalRecommendation {
  priority: string;
  focus: string[];
  timeframe: string;
  keyActions: string[];
}

interface RecommendationCardProps {
  dimensionRecommendations: DimensionRecommendation[];
  globalRecommendations: GlobalRecommendation | null;
  overallLevel: number;
  levelName: string;
}

const getLevelColor = (level: number) => {
  switch (level) {
    case 1: return 'bg-red-100 text-red-800 border-red-200';
    case 2: return 'bg-orange-100 text-orange-800 border-orange-200';
    case 3: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 4: return 'bg-blue-100 text-blue-800 border-blue-200';
    case 5: return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getLevelIcon = (level: number) => {
  if (level <= 2) return <AlertCircle className="h-4 w-4" />;
  if (level <= 3) return <TrendingUp className="h-4 w-4" />;
  return <CheckCircle className="h-4 w-4" />;
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  dimensionRecommendations,
  globalRecommendations,
  overallLevel,
  levelName
}) => {
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(new Set());

  const toggleDimension = (dimension: string) => {
    const newExpanded = new Set(expandedDimensions);
    if (newExpanded.has(dimension)) {
      newExpanded.delete(dimension);
    } else {
      newExpanded.add(dimension);
    }
    setExpandedDimensions(newExpanded);
  };

  const expandAll = () => {
    setExpandedDimensions(new Set(dimensionRecommendations.map(d => d.dimension)));
  };

  const collapseAll = () => {
    setExpandedDimensions(new Set());
  };

  // Trier par priorité (niveaux les plus bas en premier)
  const sortedRecommendations = [...dimensionRecommendations].sort((a, b) => a.level - b.level);

  return (
    <div className="space-y-6">
      {/* Recommandations globales */}
      {globalRecommendations && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle className="text-xl text-blue-900">
                  Plan d'Action Prioritaire
                </CardTitle>
                <p className="text-blue-700 text-sm mt-1">
                  Niveau {overallLevel} - {levelName}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Priorité stratégique
                </h4>
                <p className="text-blue-800 mb-4">{globalRecommendations.priority}</p>
                
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Horizon temporel
                </h4>
                <p className="text-blue-800">{globalRecommendations.timeframe}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Domaines de focus</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {globalRecommendations.focus.map((area, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {area}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="font-semibold text-blue-900 mb-3">Actions clés</h4>
                <ul className="space-y-2">
                  {globalRecommendations.keyActions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommandations par dimension */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900">
              Recommandations par Dimension
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={expandAll}
                className="text-xs"
              >
                Tout développer
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={collapseAll}
                className="text-xs"
              >
                Tout réduire
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedRecommendations.map((dimRec, index) => {
            const isExpanded = expandedDimensions.has(dimRec.dimension);
            const hasRecommendations = dimRec.recommendations !== null;
            
            return (
              <Collapsible 
                key={dimRec.dimension} 
                open={isExpanded}
                onOpenChange={() => toggleDimension(dimRec.dimension)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      {getLevelIcon(dimRec.level)}
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{dimRec.dimension}</div>
                        <div className="text-sm text-gray-600">
                          {Math.round(dimRec.percentage)}% - Niveau {dimRec.level}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getLevelColor(dimRec.level)}>
                        Niveau {dimRec.level}
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </Button>
                </CollapsibleTrigger>
                
                {hasRecommendations && (
                  <CollapsibleContent className="pt-4">
                    <div className="ml-7 border-l-2 border-gray-200 pl-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {dimRec.recommendations?.title}
                        </h4>
                        <p className="text-gray-700 text-sm mb-4">
                          {dimRec.recommendations?.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Actions recommandées */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Actions recommandées
                          </h5>
                          <ul className="space-y-2">
                            {dimRec.recommendations?.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="text-sm text-gray-700 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* KPIs */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            Indicateurs de suivi
                          </h5>
                          <ul className="space-y-2">
                            {dimRec.recommendations?.kpis.map((kpi, kpiIndex) => (
                              <li key={kpiIndex} className="text-sm text-gray-700 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                {kpi}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Horizon de mise en œuvre:</span>
                          <span>{dimRec.recommendations?.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};