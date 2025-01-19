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
        const isDiagonal = (this.input.keys.up || this.input.keys.down) && (this.input.keys.left || this.input.keys.right);
        const speed = isDiagonal ? this.player.speed / Math.sqrt(2) : this.player.speed;
        
        if (isDiagonal){
            if (this.input.keys.up) newY -= speed;
            if (this.input.keys.down) newY += speed;
            if (this.input.keys.right) newX += speed;
            if (this.input.keys.left) newX -= speed;
            
            console.log({newX, newY})
            const diagonalDistance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, newY, this.player.width, this.player.height);

            if (diagonalDistance.x === 0) {
                // Only X is blocked, reset just X and recalculate
                newX = this.player.x;
                if (this.input.keys.left) newX -= this.player.speed;
                if (this.input.keys.right) newX += this.player.speed;
                // Keep Y at diagonal speed since it's not blocked
                this.player.y += diagonalDistance.y;
            } else if (diagonalDistance.y === 0) {
                // Only Y is blocked, reset just Y and recalculate
                newY = this.player.y;
                if (this.input.keys.up) newY -= this.player.speed;
                if (this.input.keys.down) newY += this.player.speed;
                // Keep X at diagonal speed since it's not blocked
                this.player.x += diagonalDistance.x;
            }else{
                this.player.x += diagonalDistance.x;
                this.player.y += diagonalDistance.y;
            }
        }else{
            if (this.input.keys.left) newX -= this.player.speed;
            if (this.input.keys.right) newX += this.player.speed;
            if (this.input.keys.up) newY -= this.player.speed;
            if (this.input.keys.down) newY += this.player.speed;

            const distance = this.map.getAvailableDistance(this.player.x, this.player.y, newX, newY, this.player.width, this.player.height);
            this.player.x += distance.x;
            this.player.y += distance.y;
        }

        this.player.x = Math.max(0, Math.min(this.player.x, this.map.width - this.player.width));
        this.player.y = Math.max(0, Math.min(this.player.y, this.map.height - this.player.height));

        this.renderer.updateCamera(this.player, this.map.width, this.map.height);
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