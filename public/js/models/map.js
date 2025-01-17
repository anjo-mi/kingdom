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
        const points = [
            {x,y},                          // top-left
            {x: x + width, y},              // top-right
            {x, y: y + height},             // bottom-left
            {x: x + width, y: y + height}   // bottom-right
        ];

        for (const point of points){
            const tileX = Math.floor(point.x / this.tileSize);
            const tileY = Math.floor(point.y / this.tileSize);
            if (this.getTileAt(tileX, tileY) === 1){
                return true;
            }
        }
        return false;
    }

}