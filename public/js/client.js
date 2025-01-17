import { InputHandler } from './input.js';
import { Renderer } from './renderer.js';

class Game{
    constructor(){
        this.renderer = new Renderer();
        this.input = new InputHandler();

        this.player = {
            x: 400,
            y:300,
            speed: 5
        };

        this.gameLoop();
    }

    update(){
        if (this.input.keys.up) this.player.y -= this.player.speed;
        if (this.input.keys.down) this.player.y += this.player.speed;
        if (this.input.keys.left) this.player.x -= this.player.speed;
        if (this.input.keys.right) this.player.x += this.player.speed;

        this.player.x = Math.max(0, Math.min(this.player.x, this.renderer.canvas.width - 32));
        this.player.y = Math.max(0, Math.min(this.player.y, this.renderer.canvas.height - 32));
    }

    draw(){
        this.renderer.clear();
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