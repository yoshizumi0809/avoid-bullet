'use client'

import React from "react";
import { gameState } from "@/types/gameState";

type GameOverScreenProps = {
  setGameState: React.Dispatch<React.SetStateAction<gameState>>;
  survivalTime: number;
};

export default function GameOverScreen({ setGameState, survivalTime }: GameOverScreenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 text-white z-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4 tracking-widest drop-shadow-lg">
        GAME OVER
      </h1>

      <div className="mb-8 text-center">
        <p className="text-gray-400 text-sm mb-1">TIME</p>
        <p className="text-4xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
            {(survivalTime / 1000).toFixed(2)} <span className="text-xl">sec</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 w-64">
        <button
          onClick={() => setGameState("playing")}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded shadow-lg transition-transform transform hover:scale-105"
        >
          🔄 リトライ
        </button>

        <button
          onClick={() => setGameState("title")}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded shadow-lg transition-transform transform hover:scale-105"
        >
          🏠 タイトルへ戻る
        </button>
      </div>
    </div>
  );
}