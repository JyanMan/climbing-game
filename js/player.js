import { Vector2D } from './utils.js';
import { gravityAccel } from './naturalEvents.js';

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
        this.type = "this";
    }

    update(deltaTime) {
        this.pos.x += this.velocity.x*deltaTime;
        this.pos.y += this.velocity.y*deltaTime;
        this.movement();
        this.defineGravity();
    }

    defineGravity() {
        if (!this.wall_running || this.velocity.y < 0) {
            this.velocity.y = gravityAccel(this.velocity.y);
        }  
    }

    movement() {
        if (Math.abs(this.velocity.x) >= this.speed) {
            this.velocity.x = this.speed*Math.sign(this.velocity.x);
        }
    
        //jumping
        if (this.is_jumping === true && this.is_grounded) {
                
            this.velocity.y = -this.jumpHeight;
        }
    
        //wall jumping
        if (this.velocity.x === 0) {
            this.wall_running = false;
        }
        if (this.wall_running) {
            if (this.is_jumping && this.velocity.y > 0)
                this.velocity.y = -this.jumpHeight;
            else if (this.velocity.y >= 0)
                this.velocity.y = 20;
            this.velocity.x = 0;
        }
    
        //add dodge mechanic
        if (this.is_dashing) {
            this.dash();
        }
    }

    dash() {
        console.log("is_dashing");
    }
}