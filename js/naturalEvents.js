let g_accel = 30;
const g_max = 800;

export const gravityAccel = (velY) => {
    if (isNaN(velY)) {
        return -1;
    }

    velY += g_accel;
    if (velY >= g_max) {
        velY = g_max;
    }
    
    return velY;
}