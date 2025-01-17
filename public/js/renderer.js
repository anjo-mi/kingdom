export class Renderer{
    constructor(){
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.tileColors = {
            0: '#90ee90',
            1: '#808080'
        };
    }

    clear(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    drawMap(gameMap){
        for (let y = 0; y < gameMap.height; y++){
            for (let x = 0; x < gameMap.width; x++){
                const tile = gameMap.getTileAt(x,y);
                this.ctx.fillStyle = this.tileColors[tile];
                this.ctx.fillRect(
                    x * gameMap.tileSize,
                    y * gameMap.tileSize,
                    gameMap.tileSize,
                    gameMap.tileSize
                );
            }
        }
    }

    drawPlayer(x,y){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(x,y,32,32)
    }
}