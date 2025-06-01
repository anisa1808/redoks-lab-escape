
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressBarProps {
  solvedPuzzles: boolean[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ solvedPuzzles }) => {
  const totalPuzzles = solvedPuzzles.length;
  const solvedCount = solvedPuzzles.filter(Boolean).length;
  const progressPercentage = (solvedCount / totalPuzzles) * 100;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Progress Pelarian</h3>
        <span className="text-emerald-300 font-medium">
          {solvedCount}/{totalPuzzles} Teka-teki
        </span>
      </div>
      
      {/* Progress bar visual */}
      <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Individual puzzle indicators */}
      <div className="flex justify-between items-center">
        {solvedPuzzles.map((solved, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            {solved ? (
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            ) : (
              <Circle className="h-8 w-8 text-slate-500" />
            )}
            <span className={`text-xs font-medium ${solved ? 'text-emerald-300' : 'text-slate-400'}`}>
              Puzzle {index + 1}
            </span>
          </div>
        ))}
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 text-center">
        {solvedCount === 0 && (
          <p className="text-slate-300 text-sm">🧪 Mulai pecahkan teka-teki pertama!</p>
        )}
        {solvedCount > 0 && solvedCount < totalPuzzles && (
          <p className="text-emerald-300 text-sm">
            🔥 Bagus! {totalPuzzles - solvedCount} teka-teki lagi menuju kebebasan!
          </p>
        )}
        {solvedCount === totalPuzzles && (
          <p className="text-emerald-300 text-sm font-semibold">
            🎉 Semua teka-teki selesai! Kamu bebas!
          </p>
        )}
      </div>
    </div>
  );
};
