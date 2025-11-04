import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, Circle } from 'lucide-react';

interface SectionData {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    text: string;
    options: {
      value: number;
      text: string;
    }[];
  }[];
}

interface SectionCardProps {
  section: SectionData;
  answers: Record<string, number>;
  onAnswerChange: (questionId: string, value: number) => void;
  isCompleted: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  answers,
  onAnswerChange,
  isCompleted
}) => {
  const completedQuestions = section.questions.filter(q => answers[q.id] !== undefined).length;
  const progressPercentage = (completedQuestions / section.questions.length) * 100;

  return (
    <Card className={`mb-6 transition-all duration-200 ${isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
            <div>
              <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                {section.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">
              {completedQuestions}/{section.questions.length}
            </div>
            <div className="text-xs text-gray-500">questions</div>
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {section.questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <div className="flex gap-4">
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${answers[question.id] !== undefined 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' 
                  : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                }
              `}>
                {index + 1}
              </div>
              <div className="flex-grow">
                <Label className="text-base font-medium text-gray-900 leading-relaxed">
                  {question.text}
                </Label>
              </div>
            </div>

            <div className="ml-12">
              <RadioGroup
                value={answers[question.id]?.toString() || ''}
                onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3">
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={`${question.id}-${option.value}`}
                      className="mt-1"
                    />
                    <Label 
                      htmlFor={`${question.id}-${option.value}`}
                      className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-grow"
                    >
                      <span className="font-medium text-blue-600 mr-2">
                        {option.value}/5
                      </span>
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};