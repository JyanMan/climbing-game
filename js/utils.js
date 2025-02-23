export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function isColliding(rectA, rectB) {
    return (
        rectA.pos.y + rectA.height > rectB.pos.y && 
        rectA.pos.y < rectB.pos.y + rectB.height &&
        rectA.pos.x + rectA.width > rectB.pos.x &&
        rectA.pos.x < rectB.pos.x + rectB.width
    );
}

export function collisionReact(ground, entity) {
    let centerA = new Vector2D(entity.pos.x + entity.width*0.5, entity.pos.y + entity.height*0.5);
    let centerB = new Vector2D(ground.pos.x + ground.width*0.5, ground.pos.y + ground.height*0.5);
    let distance = new Vector2D(centerA.x-centerB.x, centerA.y-centerB.y);

    let hs1 = new Vector2D(entity.width*0.5, entity.height*0.5);
    let hs2 = new Vector2D(ground.width*0.5, ground.height*0.5);

    let minDistX = (hs1.x+hs2.x) - Math.abs(distance.x); 
    let minDistY = (hs1.y+hs2.y) - Math.abs(distance.y);

    if (minDistX > minDistY) {

        entity.pos.y += Math.abs(minDistY)*Math.sign(distance.y);
        entity.velocity.y = 0;

        if (Math.sign(distance.y) === -1)
            entity.is_grounded = true;

        entity.wall_running = false;
    }
    else {
        if (entity.velocity.x !== 0) {
            entity.wall_running = true;
        }
        entity.pos.x += Math.abs(minDistX)*Math.sign(distance.x)
    }
}