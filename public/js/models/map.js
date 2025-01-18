export class GameMap{
    constructor(tileSize = 64){
        this.tileSize = tileSize;
        this.tiles = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.width = this.tiles[0].length;
        this.height = this.tiles.length;
    }

    getTileAt(x,y){
        if (x < 0 || x >= this.width || y < 0 || y >= this.height){
            return 1;
        }
        return this.tiles[y][x];
    }

    checkCollision(x,y,width,height){
        const playerLeft = x;
        const playerRight = x + width;
        const playerTop = y;
        const playerBottom = y + height;

        const leftTile = Math.floor(playerLeft / this.tileSize);
        const rightTile = Math.floor((playerRight - 1) / this.tileSize);
        const topTile = Math.floor(playerTop / this.tileSize);
        const bottomTile = Math.floor((playerBottom - 1) / this.tileSize);

        for (let tileY = topTile; tileY <= bottomTile; tileY++){
            for (let tileX = leftTile; tileX <= rightTile; tileX++){
                if (this.getTileAt(tileX, tileY) === 1){
                    const tileLeft = tileX * this.tileSize;
                    const tileRight = (tileX + 1) * this.tileSize;
                    const tileTop = tileY * this.tileSize;
                    const tileBottom = (tileY + 1) * this.tileSize;

                    if (playerRight > tileLeft && 
                        playerLeft < tileRight && 
                        playerBottom > tileTop && 
                        playerTop < tileBottom){
                            return true;
                    }
                }
            }
        }
        return false;
    }

    getAvailableDistance(startX, startY, targetX, targetY, width, height){
        
    }

}

