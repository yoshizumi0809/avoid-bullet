// src/utils/createNewBullet.ts

import { Bullet } from "@/types/bullet";
import { calculateSpawnPosition } from "./calculateSpawnPosition";
import { BULLET_SPEED, GAME_AREA_SIZE } from "@/constants/gameConfigs";
import { calculateBulletVelocity } from "./calculateBulletVelocity";

export const createNewBullet = (): Bullet => {
    const id = Date.now().toString(); 

    const [initial_x, initial_y] = calculateSpawnPosition();
    // targetはランダムな位置（プレイヤーを狙う前の初期計算用）
    const target_x = Math.random() * GAME_AREA_SIZE; 
    const target_y = Math.random() * GAME_AREA_SIZE; 

    const [vx, vy] = calculateBulletVelocity(initial_x, initial_y, target_x, target_y, BULLET_SPEED);
    
    return {
        id: id,
        x: initial_x,
        y: initial_y,
        vx: vx,
        vy: vy,
        type: 'normal',
    };
}
