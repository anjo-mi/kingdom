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
        // const playerLeft = x;
        // const playerRight = x + width;
        // const playerTop = y;
        // const playerBottom = y + height;

        const leftTile = Math.floor(x / this.tileSize);
        const rightTile = Math.floor((x - 1 + width) / this.tileSize);
        const topTile = Math.floor(y / this.tileSize);
        const bottomTile = Math.floor((y - 1 + height) / this.tileSize);

        for (let tileY = topTile; tileY <= bottomTile; tileY++){
            for (let tileX = leftTile; tileX <= rightTile; tileX++){
                if (this.getTileAt(tileX, tileY) === 1){
                    return true;
                    // const tileLeft = tileX * this.tileSize;
                    // const tileRight = (tileX + 1) * this.tileSize;
                    // const tileTop = tileY * this.tileSize;
                    // const tileBottom = (tileY + 1) * this.tileSize;

                    // if (playerRight > tileLeft && 
                    //     playerLeft < tileRight && 
                    //     playerBottom > tileTop && 
                    //     playerTop < tileBottom){
                    //         return true;
                    // }
                }
            }
        }
        return false;
    }

    getAvailableDistance(startX, startY, targetX, targetY, width, height){
        if (!this.checkCollision(targetX, targetY, width, height)){
            return {
                x: targetX - startX,
                y: targetY - startY
            }
        }

        let availableX = 0;
        let availableY = 0;

        const dx = Math.sign(targetX - startX);
        if (dx !== 0){
            let testX = startX;
            while (testX !== targetX && !this.checkCollision(testX, startY, width, height)){
                testX += dx;
                availableX = testX - startX;
            }
            availableX -= dx;
        }

        const dy = Math.sign(targetY - startY);
        if (dy !== 0){
            let testY = startY;
            while (testY !== targetY && !this.checkCollision(startX, testY, width, height)){
                testY += dy;
                availableY = testY - startY;
            }
            availableY -= dy;
        }
        return {x: availableX, y: availableY};
    }

}

