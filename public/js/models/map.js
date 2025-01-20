export class GameMap{
    constructor(tileSize = 64){
        this.tileSize = tileSize;
        this.tiles = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.width = this.tiles[0].length * this.tileSize;
        this.height = this.tiles.length * this.tileSize;

    }
    // called from Renderer.drawMap() and this.checkCollision()
    // takes x and y coordinates and return the tile value at that position
    getTileAt(x,y){
        if (x < 0 || x >= this.width || y < 0 || y >= this.height){
            return 1;
        }
        return this.tiles[y][x];
    }


    // called from this.getAvailableDistance()
    // checks the tiles between start and target position to see if a collision (1) occurs at any point
    // RETURNS: true if collision, false if not
    checkCollision(x,y,width,height){

        const leftTile = Math.floor(x / this.tileSize);
        const rightTile = Math.floor((x - 1 + width) / this.tileSize);
        const topTile = Math.floor(y / this.tileSize);
        const bottomTile = Math.floor((y - 1 + height) / this.tileSize);

        for (let tileY = topTile; tileY <= bottomTile; tileY++){
            for (let tileX = leftTile; tileX <= rightTile; tileX++){
                if (this.getTileAt(tileX, tileY) === 1){
                    return true;
                }
            }
        }
        return false;
    }

    // called from Game.update(), if there is no collision, return the distance between start and target, otherwise find the first tile in the way and return the distance to that tile (both for x and y motion)
    // RETURN: { x , y }
    getAvailableDistance(startX, startY, targetX, targetY, width, height) {
        if (!this.checkCollision(targetX, targetY, width, height)) {
            return {
                x: targetX - startX,
                y: targetY - startY
            }
        }

        let availableX = 0;
        let availableY = 0;

        if (this.checkCollision(targetX, startY, width, height)){
            const dx = Math.sign(targetX - startX);
            if (dx !== 0){
                let testX = startX;
                while (testX !== targetX && !this.checkCollision(testX + dx, startY, width, height)){
                    testX += dx;
                    availableX = testX - startX;
                }
            }
        }

        if (this.checkCollision(startX, targetY, width, height)){
            const dy = Math.sign(targetY - startY);
            if (dy !== 0){
                let testY = startY;
                while (testY !== targetY && !this.checkCollision(startX, testY + dy, width, height)){
                    testY += dy;
                    availableY = testY - startY;
                }
            }
        }

        return {x: availableX, y: availableY};
    }   

}

