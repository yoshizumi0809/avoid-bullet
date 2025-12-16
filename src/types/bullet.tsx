export type BulletType = 'normal' | 'homing';

export interface Bullet {
    id: string; // または number
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: BulletType; // 👈 これを追加！
}