export class InputHandler{
    constructor(keys){
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            s: false
        };

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e){
        switch(e.key){
            case 'ArrowUp' : this.keys.up = true; break;
            case 'ArrowDown' : this.keys.down = true; break;
            case 'ArrowLeft' : this.keys.left = true; break;
            case 'ArrowRight' : this.keys.right = true; break;
            case 's' : this.keys.s = true; break;
        }
    }
    handleKeyUp(e){
        switch(e.key){
            case 'ArrowUp' : this.keys.up = false; break;
            case 'ArrowDown' : this.keys.down = false; break;
            case 'ArrowLeft' : this.keys.left = false; break;
            case 'ArrowRight' : this.keys.right = false; break;
            case 's' : this.keys.s = false; break;
        }
    }
}