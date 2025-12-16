'use client';

import { useRef, useState } from "react";
import ScreenMode from "./ScreenMode";
import { gameState } from "@/types/gameState";
import { GAME_AREA_HEIGHT, GAME_AREA_WIDTH } from "@/constants/gameConfigs";


export default function GameField() {
  const [gameState, setGameState] = useState<gameState>('title');
  const gameFieldRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={gameFieldRef}
      className="absolute m-12 top-5 left-5 border-4 border-black"
      style={{
        width: `${GAME_AREA_WIDTH}px`,
        height: `${GAME_AREA_HEIGHT}px`,
      }}
    >
      <ScreenMode
        gameState={gameState}
        setGameState={setGameState}
        gameFieldRef={gameFieldRef}
      />
    </div>
  );
}
