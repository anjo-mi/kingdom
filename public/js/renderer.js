export class Renderer{
    constructor(){
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.camera = {
            x: 0,
            y: 0
        };
        this.tileColors = {
            0: '#90ee90',
            1: '#808080'
        };
    }

    updateCamera(player, mapWidth, mapHeight){
        this.camera.x = player.x - this.canvas.width / 2;
        this.camera.y = player.y - this.canvas.height / 2;

        this.camera.x = Math.max(0, Math.min(this.camera.x, mapWidth - this.canvas.width));
        this.camera.y = Math.max(0, Math.min(this.camera.y, mapHeight - this.canvas.height));
    }

    clear(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    drawMap(gameMap){
        const startCol = Math.floor(this.camera.x / gameMap.tileSize);
        const endCol = Math.ceil((this.camera.x + this.canvas.width) / gameMap.tileSize);
        const startRow = Math.floor(this.camera.y / gameMap.tileSize);
        const endRow = Math.ceil((this.camera.y + this.canvas.height) / gameMap.tileSize);

        for (let row = startRow; row < endRow; row++){
            for (let col = startCol; col < endCol; col++){
                if (row >= 0 && 
                    row < gameMap.tiles.length && 
                    col >= 0 && 
                    col < gameMap.tiles[0].length){
                        const tile = gameMap.tiles[row][col];
                        this.ctx.fillStyle = this.tileColors[tile];
                        this.ctx.fillRect(
                            col * gameMap.tileSize - this.camera.x,
                            row * gameMap.tileSize - this.camera.y,
                            gameMap.tileSize,
                            gameMap.tileSize
                        );
                    }

            }
        }
    }

    drawPlayer(x,y){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            x - this.camera.x,
            y - this.camera.y,
            32,
            32)
    }
}