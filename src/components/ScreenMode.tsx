'use client';

import { gameState } from "@/types/gameState";
import TitleScreen from "./TitleScreen";
import PlayingScreen from "./PlayingScreen";
import GameOverScreen from "./GameOverScreen";
import { useState } from "react"; // useStateを追加

export type ScreenModeProps = {
    gameState: gameState; 
    setGameState: (state: gameState) => void;
    gameFieldRef: React.RefObject<HTMLDivElement|null>;
};

export default function ScreenMode(props: ScreenModeProps){
    const {gameState, setGameState, gameFieldRef} = props;
    
    // 💡 追加: 生存時間を管理するState
    const [survivalTime, setSurvivalTime] = useState(0);

    switch (gameState) {
        case 'title':
            return (
                <TitleScreen gameState={gameState} setGameState={setGameState} gameFieldRef={gameFieldRef}/>
            );
        
        case 'playing':
            return (
                <PlayingScreen 
                    gameState={gameState} 
                    setGameState={setGameState} 
                    gameFieldRef={gameFieldRef}
                    setSurvivalTime={setSurvivalTime} // 💡 時間セット関数を渡す
                />
            );
        
        case 'gameover':
            return (
                <GameOverScreen 
                    setGameState={setGameState} 
                    survivalTime={survivalTime} // 💡 記録した時間を渡す
                />
            );
            
        default:
            return null;
    }
}