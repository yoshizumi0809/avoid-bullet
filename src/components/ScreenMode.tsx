'use client';

import { gameState } from "@/types/gameState";
import TitleScreen from "./TitleScreen";
import PlayingScreen from "./PlayingScreen";
import GameOverScreen from "./GameOverScreen";
import { useState, Dispatch, SetStateAction } from "react"; 

export type ScreenModeProps = {
    gameState: gameState; 
    setGameState: Dispatch<SetStateAction<gameState>>;
    gameFieldRef: React.RefObject<HTMLDivElement|null>;
};

export default function ScreenMode(props: ScreenModeProps){
    const {gameState, setGameState, gameFieldRef} = props;
    
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
                    setSurvivalTime={setSurvivalTime}
                />
            );
        
        case 'gameover':
            return (
                <GameOverScreen 
                    setGameState={setGameState} 
                    survivalTime={survivalTime}
                />
            );
            
        default:
            return null;
    }
}