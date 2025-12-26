'use client';

import { Bullet } from "@/types/bullet";
import { gameState } from "@/types/gameState";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { 
    INITIAL_LIVES, 
    BULLET_SIZE, 
    BULLET_SPAWN_INTERVAL, 
    GAME_AREA_SIZE, 
    MAX_COORD, 
    MIN_COORD, 
    PLAYER_SIZE, 
    PLAYER_SPEED,
    HOMING_BULLET_SPEED,
    HOMING_PROBABILITY
} from "../constants/gameConfigs";
import { createNewBullet } from "@/utils/createNewBullet";

type PlayingScreenProps = {
    gameState: gameState;
    setGameState: React.Dispatch<React.SetStateAction<gameState>>;
    gameFieldRef: React.RefObject<HTMLDivElement | null>;
    setSurvivalTime: (time: number) => void;
};


export default function PlayingScreen(props: PlayingScreenProps) {
    const [coordinates, setCoordinates] = useState<{x: number; y: number}>({x: 250, y: 250});
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [lives, setLives] = useState<number>(INITIAL_LIVES);
    
    // 画面上のタイマー表示用
    const [currentTime, setCurrentTime] = useState<number>(0);

    const bulletsRef = useRef<Bullet[]>([]);
    const livesRef = useRef<number>(INITIAL_LIVES);
    
    // ゲーム開始時間を記録
    const startTimeRef = useRef<number>(Date.now());
    
    const keysPressed = useRef({ w: false, a: false, s: false, d: false });
    const playerPosRef = useRef<{ x: number; y: number }>(coordinates);

    useEffect(() => {
        playerPosRef.current = coordinates;
    }, [coordinates]);

    useEffect(() => {
        const handleKey = (key: string, isPressed: boolean) => {
            const lowerKey = key.toLowerCase();
            if (keysPressed.current.hasOwnProperty(lowerKey)) {
                keysPressed.current[lowerKey as 'w' | 'a' | 's' | 'd'] = isPressed;
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => handleKey(e.key, true);
        const handleKeyUp = (e: KeyboardEvent) => handleKey(e.key, false);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
       
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // 開始時間をリセット
    useEffect(() => {
        startTimeRef.current = Date.now();
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        let frameCounter: number = 0;

        const gameLoop = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;
            setCurrentTime(elapsed);

            // 1. プレイヤーの移動
            setCoordinates(prevCoords => {
                let newX = prevCoords.x;
                let newY = prevCoords.y;

                if (keysPressed.current.w) newY -= PLAYER_SPEED;
                if (keysPressed.current.s) newY += PLAYER_SPEED;
                if (keysPressed.current.a) newX -= PLAYER_SPEED;
                if (keysPressed.current.d) newX += PLAYER_SPEED;

                const minPos = PLAYER_SIZE / 2;
                const maxPos = GAME_AREA_SIZE - PLAYER_SIZE / 2;
                newX = Math.max(minPos, Math.min(newX, maxPos));
                newY = Math.max(minPos, Math.min(newY, maxPos));

                return { x: newX, y: newY };
            });

            // 2. 弾の移動と衝突判定
            const player = playerPosRef.current;
            const playerRadius = PLAYER_SIZE / 2;
            const bulletRadius = BULLET_SIZE / 2;
            const hitRadius = playerRadius + bulletRadius;
            const hitRadiusSquared = hitRadius * hitRadius;

            let hitCountInThisFrame = 0;

            const nextBullets = bulletsRef.current
                .map((bullet) => {
                    let nextVx = bullet.vx;
                    let nextVy = bullet.vy;

                    // ホーミング弾の場合、プレイヤーの方向へ速度ベクトルを修正
                    if (bullet.type === 'homing') {
                        const dx = player.x - bullet.x;
                        const dy = player.y - bullet.y;
                        const angle = Math.atan2(dy, dx);

                        nextVx = Math.cos(angle) * HOMING_BULLET_SPEED;
                        nextVy = Math.sin(angle) * HOMING_BULLET_SPEED;
                    }

                    return {
                        ...bullet,
                        vx: nextVx,
                        vy: nextVy,
                        x: bullet.x + nextVx,
                        y: bullet.y + nextVy
                    };
                })
                .filter((bullet) => {
                    if (
                        bullet.x < MIN_COORD ||
                        bullet.x > MAX_COORD ||
                        bullet.y < MIN_COORD ||
                        bullet.y > MAX_COORD
                    ) {
                        return false;
                    }

                    const dx = bullet.x - player.x;
                    const dy = bullet.y - player.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq <= hitRadiusSquared) {
                        hitCountInThisFrame++;
                        return false; 
                    }
                    return true;
                });

            // 3. 新しい弾の生成
            frameCounter++;
            if(frameCounter % BULLET_SPAWN_INTERVAL === 0) {
                const baseBullet = createNewBullet();
                
                // 確率でホーミング弾にする
                const isHoming = Math.random() < HOMING_PROBABILITY;

                const newBullet: Bullet = {
                    ...baseBullet,
                    type: isHoming ? 'homing' : 'normal',
                };

                nextBullets.push(newBullet);
                frameCounter = 0;
            }

            bulletsRef.current = nextBullets;
            setBullets(nextBullets);

            // 4. ライフ減少とゲームオーバー判定
            if (hitCountInThisFrame > 0) {
                const currentLives = livesRef.current - hitCountInThisFrame;
                livesRef.current = Math.max(0, currentLives);
                setLives(livesRef.current);

                if (livesRef.current <= 0) {
                    cancelAnimationFrame(animationFrameId);
                    props.setSurvivalTime(elapsed); 
                    props.setGameState("gameover");
                    return; 
                }
            }

            animationFrameId = requestAnimationFrame(gameLoop);
        };
        
        animationFrameId = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [props]); 
    
    return (
        <div className="w-full h-full relative overflow-hidden bg-gray-900">
            {/* プレイヤー: シンプルな赤丸 */}
            <div
                className="absolute bg-red-500 rounded-full shadow-md"
                style={{
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE,
                    left: coordinates.x - PLAYER_SIZE / 2, 
                    top: coordinates.y - PLAYER_SIZE / 2,
                    pointerEvents: 'none',
                    zIndex: 20
                }}
            />
            
            {/* 弾: タイプによって色を変える */}
            {bullets.map(bullet => (
                <div
                    key={bullet.id}
                    className={`absolute rounded-full shadow-sm ${
                        bullet.type === 'homing' ? 'bg-purple-500' : 'bg-yellow-400'
                    }`}
                    style={{
                        width: BULLET_SIZE,
                        height: BULLET_SIZE,
                        // 正確な中心座標にするため、サイズ/2 を引く形に修正
                        left: bullet.x - BULLET_SIZE / 2,
                        top: bullet.y - BULLET_SIZE / 2,
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                />
            ))}

            {/* タイム表示: 左下にシンプルに表示 */}
            <div className="absolute bottom-4 left-4 z-30">
                <p className="text-white font-bold text-xl drop-shadow-md">
                    Time: {(currentTime / 1000).toFixed(2)}s
                </p>
            </div>

            {/* ライフ表示: 右上にシンプルに表示 */}
            <div className="absolute top-4 right-4 flex gap-1 z-30">
                {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
                    <span key={i} className="text-2xl text-red-500 drop-shadow-md">
                        ❤️
                    </span>
                ))}
            </div>
        </div>
    );
}