export class Renderer{
    constructor(){
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 600;
    }

    clear(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    drawPlayer(x,y){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(x,y,32,32)
    }
}