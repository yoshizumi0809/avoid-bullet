import { GAME_AREA_SIZE, SPAWN_AREA_SIZE, SPAWN_MARGIN } from "@/constants/gameConfigs";

export const calculateSpawnPosition = (): [number, number] => {
    
    // スポーンエリアの最小値と最大値
    const MIN_COORD = -SPAWN_MARGIN;
    const MAX_COORD = GAME_AREA_SIZE + SPAWN_MARGIN;
    
    // 辺の長さ (550)
    const LENGTH = SPAWN_AREA_SIZE; 

    // 0:上 (-25), 1:下 (525), 2:左 (-25), 3:右 (525)
    const side = Math.floor(Math.random() * 4); 
    
    let Sx: number; //x座標
    let Sy: number; //y座標

    // 辺に沿って一様分布でランダムな座標を生成 (範囲: -25 から 525)
    const randomCoord = Math.random() * LENGTH + MIN_COORD;

    switch (side) {
        case 0: // 上辺
            Sx = randomCoord;
            Sy = MIN_COORD;
            break;
        case 1: // 下辺
            Sx = randomCoord;
            Sy = MAX_COORD;
            break;
        case 2: // 左辺
            Sx = MIN_COORD;
            Sy = randomCoord;
            break;
        case 3: // 右辺
            Sx = MAX_COORD;
            Sy = randomCoord;
            break;
        default:
            Sx = MIN_COORD;
            Sy = MIN_COORD;
    }

    return [Sx, Sy];
};