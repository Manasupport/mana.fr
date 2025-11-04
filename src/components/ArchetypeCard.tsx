import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Shield,
  Target
} from 'lucide-react';

interface ArchetypeData {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  confidence: number;
}

interface ArchetypeCardProps {
  primaryArchetype: ArchetypeData;
  secondaryArchetype?: ArchetypeData;
  confidence: number;
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 0.8) return 'text-green-600 bg-green-100';
  if (confidence >= 0.6) return 'text-blue-600 bg-blue-100';
  if (confidence >= 0.4) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

const getConfidenceLabel = (confidence: number) => {
  if (confidence >= 0.8) return 'Très élevée';
  if (confidence >= 0.6) return 'Élevée';
  if (confidence >= 0.4) return 'Modérée';
  return 'Faible';
};

export const ArchetypeCard: React.FC<ArchetypeCardProps> = ({
  primaryArchetype,
  secondaryArchetype,
  confidence
}) => {
  return (
    <div className="space-y-6">
      {/* Archétype principal */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-blue-900">
                  Votre Archétype Principal
                </CardTitle>
                <h3 className="text-2xl font-bold text-blue-800 mt-1">
                  {primaryArchetype.name}
                </h3>
              </div>
            </div>
            
            <div className="text-right">
              <Badge className={`${getConfidenceColor(confidence)} font-medium`}>
                Confiance: {getConfidenceLabel(confidence)}
              </Badge>
              <div className="mt-2">
                <Progress 
                  value={confidence * 100} 
                  className="w-24 h-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round(confidence * 100)}%
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-blue-700 text-base leading-relaxed mt-4">
            {primaryArchetype.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Caractéristiques */}
          <div>
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Caractéristiques principales
            </h4>
            <div className="grid md:grid-cols-2 gap-2">
              {primaryArchetype.characteristics.map((char, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-blue-800">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {char}
                </div>
              ))}
            </div>
          </div>

          {/* Forces et Défis */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Forces */}
            <div>
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Forces
              </h4>
              <ul className="space-y-2">
                {primaryArchetype.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                    <Shield className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Défis */}
            <div>
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Défis à relever
              </h4>
              <ul className="space-y-2">
                {primaryArchetype.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-orange-800">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-orange-600 flex-shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommandations spécifiques */}
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              Recommandations pour votre archétype
            </h4>
            <ul className="space-y-2">
              {primaryArchetype.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                  <Lightbulb className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Archétype secondaire */}
      {secondaryArchetype && (
        <Card className="border border-gray-200 bg-gray-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">
                  Archétype Secondaire
                </CardTitle>
                <h3 className="text-xl font-semibold text-gray-800">
                  {secondaryArchetype.name}
                </h3>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2">
              {secondaryArchetype.description}
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Caractéristiques</h5>
                <ul className="space-y-1">
                  {secondaryArchetype.characteristics.slice(0, 3).map((char, index) => (
                    <li key={index} className="text-gray-700 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Forces</h5>
                <ul className="space-y-1">
                  {secondaryArchetype.strengths.slice(0, 3).map((strength, index) => (
                    <li key={index} className="text-gray-700 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Défis</h5>
                <ul className="space-y-1">
                  {secondaryArchetype.challenges.slice(0, 3).map((challenge, index) => (
                    <li key={index} className="text-gray-700 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};