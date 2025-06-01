
import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { PuzzleCard } from './PuzzleCard';
import { ProgressBar } from './ProgressBar';
import { puzzleData } from '../utils/puzzleData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FlaskConical, Trophy, AlertTriangle } from 'lucide-react';

export const EscapeRoom = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [solvedPuzzles, setSolvedPuzzles] = useState<boolean[]>(new Array(5).fill(false));
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const totalTime = 60 * 60; // 60 menit dalam detik

  useEffect(() => {
    const allSolved = solvedPuzzles.every(solved => solved);
    if (allSolved && gameStarted) {
      setGameWon(true);
      toast.success("🎉 Selamat! Kamu berhasil melarikan diri dari laboratorium!");
    }
  }, [solvedPuzzles, gameStarted]);

  const handlePuzzleSolved = (puzzleIndex: number) => {
    const newSolvedPuzzles = [...solvedPuzzles];
    newSolvedPuzzles[puzzleIndex] = true;
    setSolvedPuzzles(newSolvedPuzzles);
    
    toast.success(`Teka-teki ${puzzleIndex + 1} berhasil dipecahkan! 🧪`);
    
    // Pindah ke puzzle berikutnya jika ada
    if (puzzleIndex < 4) {
      setTimeout(() => {
        setCurrentPuzzle(puzzleIndex + 1);
      }, 2000);
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    toast.error("⏰ Waktu habis! Kamu terjebak di laboratorium...");
  };

  const restartGame = () => {
    setCurrentPuzzle(0);
    setSolvedPuzzles(new Array(5).fill(false));
    setGameStarted(false);
    setGameWon(false);
    setTimeUp(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <FlaskConical className="mx-auto h-20 w-20 text-emerald-400 mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Redoks Escape Room
            </h1>
            <h2 className="text-2xl text-emerald-300 mb-6">
              Misi Melarikan Diri dari Laboratorium Kimia
            </h2>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <h3 className="text-xl font-semibold text-white">Instruksi Misi</h3>
            </div>
            <div className="text-slate-300 space-y-3 text-left">
              <p>🧪 Kamu dan timmu terkunci dalam laboratorium misterius.</p>
              <p>🔐 Untuk keluar, kalian harus memecahkan 5 teka-teki kimia tentang reaksi redoks.</p>
              <p>⏰ Kalian punya waktu 60 menit.</p>
              <p>🎯 Setiap jawaban benar akan membawamu lebih dekat ke pintu keluar.</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setGameStarted(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold"
            size="lg"
          >
            Mulai Misi Pelarian! 🚀
          </Button>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <Trophy className="mx-auto h-24 w-24 text-yellow-400 mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">🎉 SELAMAT! 🎉</h1>
          <h2 className="text-3xl text-emerald-300 mb-6">Misi Berhasil!</h2>
          <p className="text-xl text-slate-300 mb-8">
            Kamu telah berhasil memecahkan semua teka-teki redoks dan melarikan diri dari laboratorium!
          </p>
          <Button 
            onClick={restartGame}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
          >
            Main Lagi 🔄
          </Button>
        </div>
      </div>
    );
  }

  if (timeUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-red-800 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <AlertTriangle className="mx-auto h-24 w-24 text-red-400 mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">⏰ WAKTU HABIS!</h1>
          <h2 className="text-3xl text-red-300 mb-6">Misi Gagal</h2>
          <p className="text-xl text-slate-300 mb-8">
            Kamu terjebak di laboratorium... Coba lagi untuk melarikan diri!
          </p>
          <Button 
            onClick={restartGame}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
          >
            Coba Lagi 🔄
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FlaskConical className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Redoks Escape Room</h1>
          </div>
          <Timer 
            totalTime={totalTime} 
            onTimeUp={handleTimeUp}
            isActive={gameStarted && !gameWon && !timeUp}
          />
        </div>

        {/* Progress Bar */}
        <ProgressBar solvedPuzzles={solvedPuzzles} />

        {/* Current Puzzle */}
        <div className="mt-8">
          <PuzzleCard
            puzzle={puzzleData[currentPuzzle]}
            puzzleIndex={currentPuzzle}
            onSolved={() => handlePuzzleSolved(currentPuzzle)}
            isSolved={solvedPuzzles[currentPuzzle]}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setCurrentPuzzle(Math.max(0, currentPuzzle - 1))}
            disabled={currentPuzzle === 0}
            variant="outline"
            className="border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
          >
            ← Puzzle Sebelumnya
          </Button>
          
          <Button
            onClick={() => setCurrentPuzzle(Math.min(4, currentPuzzle + 1))}
            disabled={currentPuzzle === 4}
            variant="outline"
            className="border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
          >
            Puzzle Selanjutnya →
          </Button>
        </div>
      </div>
    </div>
  );
};
