'use client';

import { useRef, useState } from "react";
import ScreenMode from "./ScreenMode";
import { gameState } from "@/types/gameState";

export default function GameField() {
    const [gameState, setGameState] = useState<gameState>('title');

    const gameFieldRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            className="absolute m-12 top-5 left-5 w-[500px] h-[500px] border-4 border-black"
            ref={gameFieldRef}
        >
            <ScreenMode 
                gameState={gameState}
                setGameState={setGameState}
                gameFieldRef={gameFieldRef}
            />
        </div>
    );
}