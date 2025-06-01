
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  totalTime: number; // dalam detik
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ totalTime, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage > 50) return 'text-emerald-400';
    if (percentage > 25) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Clock className={`h-6 w-6 ${getTimerColor()}`} />
        <span className="text-slate-300 font-medium">Waktu Tersisa</span>
      </div>
      
      <div className={`text-4xl font-mono font-bold text-center ${getTimerColor()}`}>
        {formatTime(timeLeft)}
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-red-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
    </div>
  );
};
