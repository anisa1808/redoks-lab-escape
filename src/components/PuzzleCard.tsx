
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Lock, Unlock } from 'lucide-react';
import { toast } from 'sonner';

interface Puzzle {
  id: number;
  title: string;
  description: string;
  question: string;
  answer: string | string[];
  hint?: string;
  type: 'single' | 'multiple';
  fields?: string[];
}

interface PuzzleCardProps {
  puzzle: Puzzle;
  puzzleIndex: number;
  onSolved: () => void;
  isSolved: boolean;
}

export const PuzzleCard: React.FC<PuzzleCardProps> = ({ 
  puzzle, 
  puzzleIndex, 
  onSolved, 
  isSolved 
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>(
    puzzle.type === 'multiple' ? new Array(puzzle.fields?.length || 0).fill('') : []
  );
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = () => {
    if (puzzle.type === 'single') {
      const isCorrect = userAnswer.toLowerCase().trim() === puzzle.answer.toString().toLowerCase().trim();
      if (isCorrect) {
        onSolved();
      } else {
        toast.error("Jawaban belum tepat. Coba lagi! 💪");
      }
    } else {
      // Multiple answers
      const correctAnswers = puzzle.answer as string[];
      const isCorrect = userAnswers.every((answer, index) => 
        answer.toLowerCase().trim() === correctAnswers[index].toLowerCase().trim()
      );
      
      if (isCorrect) {
        onSolved();
      } else {
        toast.error("Ada jawaban yang belum tepat. Periksa kembali! 🔍");
      }
    }
  };

  const handleMultipleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-emerald-500/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {isSolved ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          ) : (
            <Lock className="h-6 w-6 text-orange-400" />
          )}
          <span className="text-emerald-300">🔐 {puzzle.title}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <p className="text-slate-300 whitespace-pre-line">{puzzle.description}</p>
        </div>
        
        <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
          <h4 className="font-semibold text-emerald-300 mb-2">Pertanyaan:</h4>
          <p className="text-white whitespace-pre-line">{puzzle.question}</p>
        </div>

        {!isSolved && (
          <div className="space-y-4">
            {puzzle.type === 'single' ? (
              <div>
                <Input
                  placeholder="Masukkan jawabanmu..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {puzzle.fields?.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm text-emerald-300 mb-1">{field}:</label>
                    <Input
                      placeholder={`Jawaban untuk ${field}`}
                      value={userAnswers[index] || ''}
                      onChange={(e) => handleMultipleAnswerChange(index, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-3">
              <Button 
                onClick={checkAnswer}
                className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Coba Jawaban
              </Button>
              
              {puzzle.hint && (
                <Button 
                  onClick={() => setShowHint(!showHint)}
                  variant="outline"
                  className="border-orange-500 text-orange-300 hover:bg-orange-500/10"
                >
                  💡 Hint
                </Button>
              )}
            </div>
            
            {showHint && puzzle.hint && (
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                <p className="text-orange-200 text-sm">💡 <strong>Hint:</strong> {puzzle.hint}</p>
              </div>
            )}
          </div>
        )}
        
        {isSolved && (
          <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Teka-teki berhasil dipecahkan! 🎉</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
