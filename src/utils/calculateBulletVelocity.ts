export const calculateBulletVelocity = (startX: number, startY: number, targetX: number, targetY: number, speed: number): [number, number] => {
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const vx = (deltaX / distance) * speed;
    const vy = (deltaY / distance) * speed;
    return [vx, vy];
}