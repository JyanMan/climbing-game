import {isColliding} from './utils.js';
import {Vector2D} from './utils.js';
import {Player} from './player.js';
import {keyEvents} from './playerEventListeners.js';
import { gravityAccel } from './naturalEvents.js';
import { collisionReact } from './utils.js';

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvas_width = 1028;
const canvas_height = 516;
    
canvas.style.background = "hsl(200, 1%, 50%)";
canvas.height = canvas_height;
canvas.width = canvas_width;

const player = new Player();

let ground1 = {
    pos: new Vector2D(0, canvas_height/2),
    width: 500,
    height: 50,
    color: "hsl(50, 30%, 20%)",
    type: "ground"
}

let ground2 = {
    pos: new Vector2D(300, canvas_height/2+150),
    width: 500,
    height: 50,
    color: "hsl(50, 30%, 20%)",
    type: "ground"
}

let camera = {
    pos: new Vector2D(0, 0),
    width: canvas_width,
    height: canvas_height
}

const draw = () => {

    //context.fillRect(center.getX, center.getY, 20, 20);
    context.fillStyle = 'green';
    context.fillRect(player.pos.x-camera.pos.x, player.pos.y-camera.pos.y, player.width, player.height);
    context.fillStyle = ground1.color;
    context.fillRect(ground1.pos.x-camera.pos.x, ground1.pos.y-camera.pos.y, ground1.width, ground1.height);
    context.fillStyle = ground2.color;
    context.fillRect(ground2.pos.x-camera.pos.x, ground2.pos.y-camera.pos.y, ground2.width, ground2.height);
}

const keys = {
    A: false, a: false,
    D: false, d: false,
    Q: false, q: false
}

keyEvents(player, keys);

const handleInput = () => {

    if (keys.A || keys.a) {
        player.velocity.x -= player.accel;
    }
    if (keys.D || keys.d) {
        player.velocity.x += player.accel;
    }
    if (keys.Q || keys.q) {
        if (!player.is_dashing)
            player.is_dashing = true;
    }
}


const defineGravity = () => {
    if (!player.wall_running || player.velocity.y < 0) {
        player.velocity.y = gravityAccel(player.velocity.y);
    }        
}

const update = (deltaTime) => {
    //changes player velocity
    player.pos.x += player.velocity.x*deltaTime;
    player.pos.y += player.velocity.y*deltaTime;
    //player.pos.y += player.velocity.y*deltaTime;

    checkCollision();
    callForMovement();
    defineGravity();
    player.update();

    //define the camera
    camera.pos.x = player.pos.x+(player.width/2) - (camera.width/2);
    camera.pos.y = player.pos.y+(player.height/2) - (camera.height/2);

}

const callForMovement = () => {

    //x movement with using keys a and d
    if (!keys.a && !keys.d) {
        player.is_moving = false;
    }
    if (Math.abs(player.velocity.x) >= player.speed) {
        player.velocity.x = player.speed*Math.sign(player.velocity.x);
    }

    //jumping
    if (player.is_jumping === true && player.is_grounded) {
            
        player.velocity.y = -player.jumpHeight;
    }

    //wall jumping
    if (player.velocity.x === 0) {
        player.wall_running = false;
    }
    if (player.wall_running) {
        if (player.is_jumping && player.velocity.y > 0)
            player.velocity.y = -player.jumpHeight;
        else if (player.velocity.y >= 0)
            player.velocity.y = 20;
        player.velocity.x = 0;
    }

    //add dodge mechanic
    if (player.is_dashing) {
        dash();
    }

    //console.log(player.velocity.y, parseInt(player.pos.y));
}

const dash = () => {  
    console.log("dashed");
    player.is_dashing = false;
}

function checkCollision() {

    if (isColliding(player, ground1) || isColliding(player, ground2)) {
        let ground = (isColliding(player, ground1)) ? ground1 : ground2;
        
        collisionReact(ground, player);
        
        if (!player.is_moving && player.is_grounded) {
            player.velocity.x = 0;
        }
    }
    else {
        player.wall_running = false;
        player.is_grounded = false;
    }
    
}

let lastTime = Date.now();
const fps = 60;
const frameDuration = 1000/fps;
//let deltaTime = 0;
let frames = 0;
let deltaTime = 0;
let accumulatedTime = 0;

function gameLoop(timestamp) {
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (isNaN(deltaTime)) {
        deltaTime = 0;
    }
    accumulatedTime += deltaTime;

    while (accumulatedTime >= frameDuration) {
        update(frameDuration/1000);
        accumulatedTime -= frameDuration;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
   
    handleInput();
    draw();
    frames++;
    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    //console.log(frames, deltaTime);
    frames = 0;
}, 1000)

gameLoop();