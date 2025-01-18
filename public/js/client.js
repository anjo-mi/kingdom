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

    // checks for input, calls Map.getAvailableDistance() which will check for collisions between start and target, moves player to position { x , y } returned from getAvailableDistance()
    // sets player.x and player.y to new postiion, while maintaining position inside the canvas
    update(){
        let newX = this.player.x;
        let newY = this.player.y;


        if (this.input.keys.left) newX -= this.player.speed;
        if (this.input.keys.right) newX += this.player.speed;
        if (this.input.keys.up) newY -= this.player.speed;
        if (this.input.keys.down) newY += this.player.speed;
        

        const availableDistance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, newY, this.player.width, this.player.height);

        this.player.x += availableDistance.x;
        this.player.y += availableDistance.y;

        this.player.x = Math.max(0, Math.min(this.player.x, this.renderer.canvas.width - this.player.width));
        this.player.y = Math.max(0, Math.min(this.player.y, this.renderer.canvas.height - this.player.height));
    }

    // clear the canvas, draw the map and draw the player
    draw(){
        this.renderer.clear();
        this.renderer.drawMap(this.map);
        this.renderer.drawPlayer(this.player.x, this.player.y);
    }

    // continually calls update() and draw() with new animation frames to continuously 'paint' the canvas
    gameLoop(){
        this.update();
        this.draw();

        requestAnimationFrame(() => this.gameLoop());
    }

}

window.onload = () => {
    const game = new Game();
}