import { Bullet } from "@/types/bullet";
import { calculateSpawnPosition } from "./calculateSpawnPosition";
import { BULLET_SPEED, GAME_AREA_SIZE } from "@/constants/gameConfigs";
import { calculateBulletVelocity } from "./calculateBulletVelocity";

export const createNewBullet = (): Bullet => {
    const id = Date.now(); // ユニークなIDを生成（例としてタイムスタンプを使用）

    const [initial_x, initial_y] = calculateSpawnPosition();
    const target_x = Math.random() * GAME_AREA_SIZE; // 0.0 ～ 500.0
    const target_y = Math.random() * GAME_AREA_SIZE; // 0.0 ～ 500.0

    const [vx, vy] = calculateBulletVelocity(initial_x, initial_y, target_x, target_y, BULLET_SPEED);
    
    return {
        id: id,
        x: initial_x,
        y: initial_y,
        vx: vx,
        vy: vy,
    };
}