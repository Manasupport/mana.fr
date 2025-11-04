import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RadarDataPoint {
  dimension: string;
  score: number;
  maxScore: number;
  percentage: number;
}

interface ResultsRadarProps {
  data: RadarDataPoint[];
  title?: string;
  description?: string;
  showLegend?: boolean;
}

export const ResultsRadar: React.FC<ResultsRadarProps> = ({
  data,
  title = "Profil de Maturité Innovation",
  description = "Visualisation de vos scores par dimension",
  showLegend = true
}) => {
  // Préparer les données pour le radar chart
  const radarData = data.map(item => ({
    dimension: item.dimension.length > 20 
      ? item.dimension.substring(0, 20) + '...' 
      : item.dimension,
    fullDimension: item.dimension,
    percentage: Math.round(item.percentage),
    score: item.score,
    maxScore: item.maxScore
  }));

  // Calculer le score moyen
  const averageScore = data.length > 0 
    ? Math.round(data.reduce((sum, item) => sum + item.percentage, 0) / data.length)
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Votre score</span>
          </div>
          <div className="text-gray-600">
            Score moyen: <span className="font-medium">{averageScore}%</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid 
                gridType="polygon" 
                radialLines={true}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <PolarAngleAxis 
                dataKey="dimension" 
                tick={{ fontSize: 11, fill: '#374151' }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Radar
                name="Score de maturité"
                dataKey="percentage"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ r: 4, fill: '#3b82f6' }}
              />
              {showLegend && (
                <Legend 
                  wrapperStyle={{ fontSize: '12px', color: '#374151' }}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Détails des scores */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-grow">
                <div className="font-medium text-sm text-gray-900">{item.dimension}</div>
                <div className="text-xs text-gray-600">
                  {item.score}/{item.maxScore} points
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-lg ${
                  item.percentage >= 80 ? 'text-green-600' :
                  item.percentage >= 60 ? 'text-blue-600' :
                  item.percentage >= 40 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {Math.round(item.percentage)}%
                </div>
                <div className="text-xs text-gray-500">
                  {item.percentage >= 80 ? 'Excellent' :
                   item.percentage >= 60 ? 'Bon' :
                   item.percentage >= 40 ? 'Moyen' :
                   'À améliorer'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};