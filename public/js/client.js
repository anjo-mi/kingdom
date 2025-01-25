import { InputHandler } from './input.js';
import { Renderer } from './renderer.js';
import { GameMap } from './models/map.js';
import { Frame } from './sprite.js';
import { Animation } from './sprite.js';
import { Sprite } from './sprite.js';

class Game{
    constructor(){
        this.renderer = new Renderer();
        this.input = new InputHandler();
        this.map = new GameMap();

        this.player = {
            x: this.map.tileSize + 16,
            y: this.map.tileSize + 16,
            width: 32,
            height: 32,
            speed: 3,
            sprite: new Sprite('/public/images/char.png')
        };

        this.player.sprite.addAnimation(walkRightAnimation);
        this.player.sprite.addAnimation(walkLeftAnimation);
        this.player.sprite.addAnimation(walkUpAnimation);
        this.player.sprite.addAnimation(walkDownAnimation);

        this.gameLoop();
    }

    // checks for input, calls Map.getAvailableDistance() which will check for collisions between start and target, moves player to position { x , y } returned from getAvailableDistance()
    // sets player.x and player.y to new postiion, while maintaining position inside the canvas
    update(){
        let currentInput = false;
        let newX = this.player.x;
        let newY = this.player.y;
        const isDiagonal = (this.input.keys.up || this.input.keys.down) && (this.input.keys.left || this.input.keys.right);
        const speed = isDiagonal ? this.player.speed / Math.sqrt(2) : this.player.speed;

        if (isDiagonal) {
            if (this.input.keys.up) newY -= speed;
            if (this.input.keys.down) newY += speed;
            if (this.input.keys.right) newX += speed;
            if (this.input.keys.left) newX -= speed;
        
            const diagonalDistance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, newY, this.player.width, this.player.height);
            if (diagonalDistance.x === 0 || diagonalDistance.y === 0) {
                // If either direction is blocked, recalculate both at full speed
                newX = this.player.x;
                newY = this.player.y;
                
                if (this.input.keys.up) newY -= this.player.speed;
                if (this.input.keys.down) newY += this.player.speed;
                if (this.input.keys.right) newX += this.player.speed;
                if (this.input.keys.left) newX -= this.player.speed;
        
                if (diagonalDistance.x !== 0){
                    const distance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, this.player.y, this.player.width, this.player.height);
                    this.player.x += distance.x;
                }
                if (diagonalDistance.y !== 0){
                    const distance = this.map.getAvailableDistance(this.player.x, this.player.y, this.player.x, newY, this.player.width, this.player.height);
                    this.player.y += distance.y;
                }
            } else {
                // No collision, apply diagonal movement
                this.player.x += diagonalDistance.x;
                this.player.y += diagonalDistance.y;
            }
        }else{
            if (this.input.keys.right) {
                newX += this.player.speed;
                const dir = 0;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(0);
                    this.player.sprite.currentDirection = 0;
                }
            }
            if (this.input.keys.left){
                newX -= this.player.speed;
                const dir = 1;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(1);
                    this.player.sprite.currentDirection = 1;
                }
            }
            if (this.input.keys.up){
                newY -= this.player.speed;
                const dir = 2;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(2);
                    this.player.sprite.currentDirection = 2;
                }
            }
            if (this.input.keys.down){
                newY += this.player.speed;
                const dir = 3;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(3);
                    this.player.sprite.currentDirection = 3;
                }
            }


            for (let key in this.input.keys){
                if (this.input.keys[key] === true){
                    currentInput = true
                }
            }

            if (!currentInput){
                this.player.sprite.stopAnimation();
            }

            const distance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, newY, this.player.width, this.player.height);
            this.player.x += distance.x;
            this.player.y += distance.y;
        }

        this.player.x = Math.max(0, Math.min(this.player.x, this.map.width - this.player.width));
        this.player.y = Math.max(0, Math.min(this.player.y, this.map.height - this.player.height));

        this.player.sprite.update();

        this.renderer.updateCamera(this.player, this.map.width, this.map.height);
    }

    // clear the canvas, draw the map and draw the player
    draw(){
        this.renderer.clear();
        this.renderer.drawMap(this.map);
        this.renderer.drawPlayer(this.player);
    }

    // continually calls update() and draw() with new animation frames to continuously 'paint' the canvas
    gameLoop(){
        this.update();
        this.draw();

        requestAnimationFrame(() => this.gameLoop());
    }

}
const walkRight1 = new Frame(
    '/public/images/char.png',
    19,
    145,
    24,
    47
)

const walkRight2 = new Frame(
    '/public/images/char.png',
    53,
    144,
    27,
    48
)
const walkRight3 = new Frame(
    '/public/images/char.png',
    90,
    146,
    39,
    46
)
const walkRight4 = new Frame(
    '/public/images/char.png',
    137,
    144,
    26,
    48
)
const walkRight5 = new Frame(
    '/public/images/char.png',
    171,
    145,
    32,
    47
)
const walkRight6 = new Frame(
    '/public/images/char.png',
    210,
    146,
    40,
    46
)
const walkLeft1 = new Frame(
    '/public/images/char.png',
    19,
    145,
    24,
    47,
    true
)

const walkLeft2 = new Frame(
    '/public/images/char.png',
    53,
    144,
    27,
    48,
    true
)
const walkLeft3 = new Frame(
    '/public/images/char.png',
    90,
    146,
    39,
    46,
    true
)
const walkLeft4 = new Frame(
    '/public/images/char.png',
    137,
    144,
    26,
    48,
    true
)
const walkLeft5 = new Frame(
    '/public/images/char.png',
    171,
    145,
    32,
    47,
    true
)
const walkLeft6 = new Frame(
    '/public/images/char.png',
    210,
    146,
    40,
    46,
    true
)
const walkUp1 = new Frame(
    '/public/images/char.png',
    15,
    517,
    38,
    49
)
const walkUp2 = new Frame(
    '/public/images/char.png',
    58,
    520,
    42,
    46
)
const walkUp3 = new Frame(
    '/public/images/char.png',
    107,
    520,
    42,
    46
)
const walkUp4 = new Frame(
    '/public/images/char.png',
    156,
    521,
    41,
    45
)
const walkUp5 = new Frame(
    '/public/images/char.png',
    203,
    516,
    38,
    50
)
const walkUp6 = new Frame(
    '/public/images/char.png',
    247,
    513,
    31,
    53
)
const walkDown1 = new Frame(
    '/public/images/char.png',
    30,
    857,
    36,
    43
)
const walkDown2 = new Frame(
    '/public/images/char.png',
    75,
    852,
    39,
    48
)
const walkDown3 = new Frame(
    '/public/images/char.png',
    120,
    854,
    37,
    46
)
const walkDown4 = new Frame(
    '/public/images/char.png',
    161,
    857,
    41,
    43
)
const walkDown5 = new Frame(
    '/public/images/char.png',
    210,
    852,
    36,
    48
)
const walkDown6 = new Frame(
    '/public/images/char.png',
    253,
    854,
    35,
    46
)
const walkRight = [walkRight1, walkRight2, walkRight3, walkRight4, walkRight5, walkRight6];
const walkLeft = [walkLeft1, walkLeft2, walkLeft3, walkLeft4, walkLeft5, walkLeft6];
const walkUp = [walkUp1, walkUp2, walkUp3, walkUp4, walkUp5, walkUp6];
const walkDown = [walkDown1, walkDown2, walkDown3, walkDown4, walkDown5, walkDown6];

const walkRightAnimation = new Animation(walkRight)
const walkLeftAnimation = new Animation(walkLeft)
const walkUpAnimation = new Animation(walkUp)
const walkDownAnimation = new Animation(walkDown)

window.onload = () => {
    const game = new Game();
}