// src/constants/gameConfig.ts

export const GAME_AREA_SIZE = 700; // GameFieldの幅・高さ
export const GAME_AREA_WIDTH = 700; // GameFieldの横幅
export const GAME_AREA_HEIGHT = 700; // GameFieldの縦幅 (必要に応じて 800 などに変更可能)

export const PLAYER_SPEED = 5; // ピクセル/フレームの移動速度
export const PLAYER_SIZE = 15; //プレイヤーの大きさ
export const BULLET_SPEED = 7; //弾幕の移動速度
export const BULLET_SIZE = 20; //弾幕の大きさ
export const BULLET_SPAWN_INTERVAL = 5; //弾幕の出現間隔（フレーム数）


export const SPAWN_MARGIN = 0; 
export const SPAWN_AREA_SIZE = GAME_AREA_SIZE + SPAWN_MARGIN * 2;
export const MIN_COORD = -SPAWN_MARGIN;
export const MAX_COORD = GAME_AREA_SIZE + SPAWN_MARGIN;