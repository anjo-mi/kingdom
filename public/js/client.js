import { InputHandler } from './input.js';
import { Renderer } from './renderer.js';
import { GameMap } from './models/map.js';

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
            speed: 5
        };

        this.gameLoop();
    }

    update(){
        let newX = this.player.x;
        let newY = this.player.y;

        if (this.input.keys.up) newY -= this.player.speed;
        if (this.input.keys.down) newY += this.player.speed;
        if (this.input.keys.left) newX -= this.player.speed;
        if (this.input.keys.right) newX += this.player.speed;

        if (!this.map.checkCollision(newX, newY, this.player.width, this.player.height)){
            this.player.x = newX;
            this.player.y = newY;
        }

        this.player.x = Math.max(0, Math.min(this.player.x, this.renderer.canvas.width - this.player.width));
        this.player.y = Math.max(0, Math.min(this.player.y, this.renderer.canvas.height - this.player.height));
    }

    draw(){
        this.renderer.clear();
        this.renderer.drawMap(this.map);
        this.renderer.drawPlayer(this.player.x, this.player.y);
    }

    gameLoop(){
        this.update();
        this.draw();

        requestAnimationFrame(() => this.gameLoop());
    }

}

window.onload = () => {
    const game = new Game();
}