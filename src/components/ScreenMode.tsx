'use client';

import { gameState } from "@/types/gameState";
import TitleScreen from "./TitleScreen";
import PlayingScreen from "./PlayingScreen";

export type ScreenModeProps = {
    gameState: gameState; // 実際はGameFieldから渡されるGameStateの型
    setGameState: (state: gameState) => void;
    gameFieldRef: React.RefObject<HTMLDivElement|null>;
};

export default function ScreenMode(props: ScreenModeProps){
    const {gameState, setGameState, gameFieldRef} = props;
    switch (gameState) {
        case 'title':
            return (
                <TitleScreen gameState={gameState} setGameState={setGameState} gameFieldRef={gameFieldRef}/>
            );
            break;  
        case 'playing':
            return (
                <PlayingScreen gameState={gameState} setGameState={setGameState} gameFieldRef={gameFieldRef}/>
            );
            break;
    }
}