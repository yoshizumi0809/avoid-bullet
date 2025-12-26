export type BulletType = 'normal' | 'homing';

export interface Bullet {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: BulletType;
}