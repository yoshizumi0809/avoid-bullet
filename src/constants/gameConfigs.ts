// src/constants/gameConfigs.ts

export const GAME_AREA_SIZE = 700;
export const GAME_AREA_WIDTH = 700;
export const GAME_AREA_HEIGHT = 700;

export const PLAYER_SPEED = 5; 
export const PLAYER_SIZE = 15; 

// ==========================================
// 弾の設定
// ==========================================
export const BULLET_SIZE = 20; 
export const BULLET_SPAWN_INTERVAL = 10; 

// 通常弾の速度
export const BULLET_SPEED = 6; 

// ホーミング弾の設定 (New!)
export const HOMING_BULLET_SPEED = 1;
export const HOMING_PROBABILITY = 0.1;


export const INITIAL_LIVES = 5; 

export const SPAWN_MARGIN = 0; 
export const SPAWN_AREA_SIZE = GAME_AREA_SIZE + SPAWN_MARGIN * 2;
export const MIN_COORD = -SPAWN_MARGIN;
export const MAX_COORD = GAME_AREA_SIZE + SPAWN_MARGIN;