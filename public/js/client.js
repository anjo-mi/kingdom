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
        this.player.sprite.addAnimation(slashRightAnimation);
        this.player.sprite.addAnimation(slashLeftAnimation);
        this.player.sprite.addAnimation(slashUpAnimation);
        this.player.sprite.addAnimation(slashDownAnimation);

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
        
        if (this.input.keys.s){
            if (!this.player.sprite.currentAnimation || 
                this.player.sprite.currentAnimation.loop){
                    const dir = this.player.sprite.currentDirection;
                    this.player.sprite.stopAnimation(dir);
                    if (dir){
                        this.player.sprite.startAnimation(dir + 4);
                    }else{
                        this.player.sprite.startAnimation(4)
                    }
                    
            }
        }else if (isDiagonal) {
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
                    this.player.sprite.startAnimation(dir);
                    this.player.sprite.currentDirection = dir;
                }
            }
            if (this.input.keys.left){
                newX -= this.player.speed;
                const dir = 1;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(dir);
                    this.player.sprite.currentDirection = dir;
                }
            }
            if (this.input.keys.up){
                newY -= this.player.speed;
                const dir = 2;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(dir);
                    this.player.sprite.currentDirection = dir;
                }
            }
            if (this.input.keys.down){
                newY += this.player.speed;
                const dir = 3;
                if (!this.player.sprite.currentAnimation?.isRunning || dir !== this.player.sprite.currentDirection){
                    this.player.sprite.startAnimation(dir);
                    this.player.sprite.currentDirection = dir;
                }
            }
            
        }
        if (!this.player.sprite.currentAnimation?.loop) currentInput = true
    
        for (let key in this.input.keys){
            if (this.input.keys[key] === true || this.player.sprite.currentAnimation.frameCount > this.player.sprite.currentAnimation.frames.length - 1){
                currentInput = true
            }
        }
        if (!currentInput){
            this.player.sprite.stopAnimation();
        }
        const distance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, newY, this.player.width, this.player.height);
        this.player.x += distance.x;
        this.player.y += distance.y;
        
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
const slashRight1 = new Frame(
    '/public/images/char.png',
    19,
    80,
    33,
    47
)
const slashRight2 = new Frame(
    '/public/images/char.png',
    58,
    80,
    32,
    47
)
const slashRight3 = new Frame(
    '/public/images/char.png',
    96,
    81,
    48,
    46
)
const slashRight4 = new Frame(
    '/public/images/char.png',
    150,
    82,
    32,
    45
)
const slashRight5 = new Frame(
    '/public/images/char.png',
    194,
    82,
    35,
    45
)
const slashRight6 = new Frame(
    '/public/images/char.png',
    236,
    75,
    38,
    52
)
const slashRight7 = new Frame(
    '/public/images/char.png',
    283,
    75,
    34,
    52
)
const slashRight8 = new Frame(
    '/public/images/char.png',
    326,
    87,
    60,
    40
)
const slashRight9 = new Frame(
    '/public/images/char.png',
    394,
    80,
    39,
    47
)
const slashLeft1 = new Frame(
    '/public/images/char.png',
    19,
    80,
    33,
    47,
    true
)
const slashLeft2 = new Frame(
    '/public/images/char.png',
    58,
    80,
    32,
    47,
    true
)
const slashLeft3 = new Frame(
    '/public/images/char.png',
    96,
    81,
    48,
    46,
    true
)
const slashLeft4 = new Frame(
    '/public/images/char.png',
    150,
    82,
    32,
    45,
    true
)
const slashLeft5 = new Frame(
    '/public/images/char.png',
    194,
    82,
    35,
    45,
    true
)
const slashLeft6 = new Frame(
    '/public/images/char.png',
    236,
    75,
    38,
    52,
    true
)
const slashLeft7 = new Frame(
    '/public/images/char.png',
    283,
    75,
    34,
    52,
    true
)
const slashLeft8 = new Frame(
    '/public/images/char.png',
    326,
    87,
    60,
    40,
    true
)
const slashLeft9 = new Frame(
    '/public/images/char.png',
    394,
    80,
    39,
    47,
    true
)
const slashUp1 = new Frame(
    '/public/images/char.png',
    16,
    588,
    37,
    56
)
const slashUp2 = new Frame(
    '/public/images/char.png',
    61,
    592,
    36,
    52
)
const slashUp3 = new Frame(
    '/public/images/char.png',
    104,
    597,
    41,
    47
)
const slashUp4 = new Frame(
    '/public/images/char.png',
    172,
    588,
    40,
    56
)
const slashUp5 = new Frame(
    '/public/images/char.png',
    218,
    592,
    28,
    52
)
const slashUp6 = new Frame(
    '/public/images/char.png',
    254,
    598,
    48,
    46
)
const slashUp7 = new Frame(
    '/public/images/char.png',
    312,
    583,
    44,
    65
)
const slashUp8 = new Frame(
    '/public/images/char.png',
    363,
    604,
    38,
    43
)
const slashUp9 = new Frame(
    '/public/images/char.png',
    407,
    601,
    31,
    46
)
const slashUp10 = new Frame(
    '/public/images/char.png',
    450,
    599,
    37,
    48
)
const slashDown1 = new Frame(
    '/public/images/char.png',
    37,
    916,
    26,
    57
)
const slashDown2 = new Frame(
    '/public/images/char.png',
    71,
    918,
    26,
    55
)
const slashDown3 = new Frame(
    '/public/images/char.png',
    108,
    917,
    29,
    56
)
const slashDown4 = new Frame(
    '/public/images/char.png',
    173,
    912,
    28,
    62
)
const slashDown5 = new Frame(
    '/public/images/char.png',
    216,
    916,
    26,
    56
)
const slashDown6 = new Frame(
    '/public/images/char.png',
    254,
    926,
    44,
    43
)
const slashDown7 = new Frame(
    '/public/images/char.png',
    307,
    931,
    47,
    54
)
const slashDown8 = new Frame(
    '/public/images/char.png',
    363,
    925,
    43,
    46
)
const slashDown9 = new Frame(
    '/public/images/char.png',
    412,
    924,
    46,
    47
)
const walkRight = [walkRight1, walkRight2, walkRight3, walkRight4, walkRight5, walkRight6];
const walkLeft = [walkLeft1, walkLeft2, walkLeft3, walkLeft4, walkLeft5, walkLeft6];
const walkUp = [walkUp1, walkUp2, walkUp3, walkUp4, walkUp5, walkUp6];
const walkDown = [walkDown1, walkDown2, walkDown3, walkDown4, walkDown5, walkDown6];
const slashRight = [slashRight1, slashRight2, slashRight3, slashRight4, slashRight5, slashRight6, slashRight7, slashRight8, slashRight9];
const slashLeft = [slashLeft1, slashLeft2, slashLeft3, slashLeft4, slashLeft5, slashLeft6, slashLeft7, slashLeft8, slashLeft9];
const slashUp = [slashUp1, slashUp2, slashUp3, slashUp4, slashUp5, slashUp6, slashUp7, slashUp8, slashUp9, slashUp10];
const slashDown = [slashDown1, slashDown2, slashDown3, slashDown4, slashDown5, slashDown6, slashDown7, slashDown8, slashDown9];

const walkRightAnimation = new Animation(walkRight);
const walkLeftAnimation = new Animation(walkLeft);
const walkUpAnimation = new Animation(walkUp);
const walkDownAnimation = new Animation(walkDown);
const slashRightAnimation = new Animation(slashRight);
    slashRightAnimation.loop = false;
    slashRightAnimation.frameRate = 5;
    const slashLeftAnimation = new Animation(slashLeft);
    slashLeftAnimation.loop = false;
    slashLeftAnimation.frameRate = 5;
    const slashUpAnimation = new Animation(slashUp);
    slashUpAnimation.loop = false;
    slashUpAnimation.frameRate = 5;
    const slashDownAnimation = new Animation(slashDown);
    slashDownAnimation.loop = false;
    slashDownAnimation.frameRate = 5;

window.onload = () => {
    const game = new Game();
}