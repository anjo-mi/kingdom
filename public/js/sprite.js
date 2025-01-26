export class Frame{
    constructor(path, x, y, width, height, flip){
        this.path = path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flip = false || flip;
    }
}


export class Animation{
    constructor(frameArray){
        this.frames = frameArray;
        this.frameRate = 8;
        this.loop = true;
        this.isRunning = false;
        this.currentFrame = 0;
        this.isPaused = false;
        this.priority = 0;
        this.canInterrupt = false;
    }
}


export class Sprite{
    constructor(imagePath){
        this.animations = [];
        this.currentAnimation = null;
        this.currentDirection = null;
        this.image = new Image();
        this.image.src = imagePath;
    }

    addAnimation(animation){
        this.animations.push(animation);
    }

    startAnimation(index){
        if (index >= 0 && index < this.animations.length){
            this.currentAnimation = this.animations[index];
            this.currentAnimation.isRunning = true;
            this.currentAnimation.currentFrame = 0;
            this.currentAnimation.frameCount = 0;
        }
    }
    
    stopAnimation(){
        if (this.currentAnimation){
            this.currentAnimation.isRunning = false;
            // ?????????? will this leave it frozen on last walking animation???????
            this.currentAnimation.currentFrame = 0;
        }
    }

    update(){
        if (!this.currentAnimation || !this.currentAnimation.isRunning || this.currentAnimation.isPaused){

            return;
        }
        console.log(this.currentAnimation.frameCount)
        this.currentAnimation.frameCount = (this.currentAnimation.frameCount || 0) + 1
        console.log(this.currentAnimation.frameCount)

        // this needs to update for just lateral movement

        if (this.currentAnimation.frameCount >= this.currentAnimation.frameRate){
            this.currentAnimation.frameCount = 0;
            this.currentAnimation.currentFrame++;

            if(!this.currentAnimation.loop){
                this.currentAnimation.currentFrame = 0;
                this.stopAnimation();
                return;
            }else if(this.currentAnimation.currentFrame >= this.currentAnimation.frames.length){
                this.currentAnimation.currentFrame = 0;
                if (!this.currentAnimation.loop){
                    this.stopAnimation();
                    return;
                }
            }
        }
    }

    getCurrentFrame(){
        if (!this.currentAnimation) return null;
        return this.currentAnimation.frames[this.currentAnimation.currentFrame];
    }
}