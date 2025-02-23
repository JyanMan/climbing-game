import { Vector2D } from './utils.js';

export class Player {
    constructor() {
        this.pos = new Vector2D(0,0);
        this.width = 50;
        this.height = 50;
        this.accel = 80;
        this.speed = 300;
        this.velocity = new Vector2D(0, 0);
        this.jumpHeight = 600;
        this.is_grounded = false;
        this.is_jumping = false;
        this.is_moving = false;
        this.wall_running = false;
        this.is_dashing = false;
        this.type = "player";
    }
}