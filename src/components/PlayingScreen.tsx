'use client';

import { Bullet } from "@/types/bullet";
import { gameState } from "@/types/gameState";
import { useState, useEffect, useRef } from "react";
import React from "react"; // Reactの型を使うためインポート

// Propsの型を適切に再定義します（ScreenModeから渡されるRefを受け取る）
type PlayingScreenProps = {
    gameState: gameState; // 適切な型に修正してください
    setGameState: (state: any) => void; // 適切な型に修正してください
    gameFieldRef: React.RefObject<HTMLDivElement>;
};

// ゲーム定数
const PLAYER_SPEED = 2; // ピクセル/フレームの移動速度
const PLAYER_SIZE = 20; 
const GAME_AREA_SIZE = 500; // GameFieldの幅・高さと一致させてください

export default function PlayingScreen(props: PlayingScreenProps) {
    // プレイヤーの位置 (初期位置を中央付近に設定)
    const [coordinates, setCoordinates] = useState<{x: number; y: number}>({x: 250, y: 250});

    // 弾の状態
    const [bullets, setBullets] = useState<Bullet[]>([]);
    
    // 💡 1. 押されているキーの状態を保持するRef (再レンダリング不要)
    const keysPressed = useRef({ w: false, a: false, s: false, d: false });
    
    // 💡 2. onKeyDown/onKeyUpの代わりにwindow全体でキーイベントを捕捉
    //      DOM要素に直接 onKeyDown を設定する必要はありません
    useEffect(() => {
        // キーの状態を更新するヘルパー関数
        const handleKey = (key: string, isPressed: boolean) => {
            const lowerKey = key.toLowerCase();
            if (keysPressed.current.hasOwnProperty(lowerKey)) {
                keysPressed.current[lowerKey as 'w' | 'a' | 's' | 'd'] = isPressed;
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            handleKey(e.key, true);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            handleKey(e.key, false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        /* もしこのコードを useEffect 外に書くと、コンポーネントが再レンダリングされるたびにリスナーが無限に増殖し続け、アプリケーションが壊れてしまいます。
        依存配列が空の [] であるため、この useEffect はコンポーネントの全ライフサイクルを通じて設定 (1回) → 解除 (1回) だけが保証されます。 */

        // クリーンアップ
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // 💡 3. ゲームループの実装 (requestAnimationFrame)
    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = () => {
            setCoordinates(prevCoords => {
                let newX = prevCoords.x;
                let newY = prevCoords.y;

                // 押されているキーの状態を同時に参照し、座標を更新
                // これにより斜め移動が可能になり、キーリピートの問題も解決します
                if (keysPressed.current.w) newY -= PLAYER_SPEED;
                if (keysPressed.current.s) newY += PLAYER_SPEED;
                if (keysPressed.current.a) newX -= PLAYER_SPEED;
                if (keysPressed.current.d) newX += PLAYER_SPEED;

                // 境界線チェック (GameField内 (500x500) に留まるように制限)
                const minPos = PLAYER_SIZE / 2; // 中心基準で考える
                const maxPos = GAME_AREA_SIZE - PLAYER_SIZE / 2;

                newX = Math.max(minPos, Math.min(newX, maxPos));
                newY = Math.max(minPos, Math.min(newY, maxPos));

                return { x: newX, y: newY };
            });

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        // クリーンアップ
        return () => cancelAnimationFrame(animationFrameId);
    }, []); // マウント/アンマウント時のみ実行
    
    return (
        <div
            // 💡 onKeyDown/onKeyUpを削除し、キーボードイベントの処理はwindowで行う
            // 💡 tabIndex も不要になりました（windowでキーイベントを捕捉するため）
            className="w-full h-full relative"
        >
            {/* 💡 操作するおぶジェクト */}
            <div
                className="absolute bg-red-500 rounded-full"
                style={{
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE,
                    // 座標を適用 (中心が coordinates.x/y になるようオフセット)
                    left: coordinates.x - PLAYER_SIZE / 2, 
                    top: coordinates.y - PLAYER_SIZE / 2,
                    pointerEvents: 'none' // マウス操作を妨げないように
                }}
            />
            
            {/* 座標 */}
            <div className="absolute top-2 left-2 text-white bg-black/50 p-1 rounded z-10">
                座標: ({coordinates.x.toFixed(0)}, {coordinates.y.toFixed(0)})
            </div>
        </div>
    );
}