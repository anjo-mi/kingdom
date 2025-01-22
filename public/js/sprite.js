export class Frame{
    constructor(path, x, y, width, height){
        this.path = path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}


export class Animation{
    constructor(frameArray){
        this.frames = frameArray;
        this.frameRate = 7;
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
        if (!this.currentAnimation || !this.currentAnimation.isRunning || this.currentAnimation.isPaused) return;

        this.currentAnimation.frameCount = (this.currentAnimation.frameCount || 0) + 1

        if (this.currentAnimation.frameCount >= this.currentAnimation.frameRate){
            this.currentAnimation.frameCount = 0;
            this.currentAnimation.currentFrame++;

            if(this.currentAnimation.currentFrame >= this.currentAnimation.frames.length){
                this.currentAnimation.currentFrame = 0;
                if (!this.currentAnimation.loop){
                    this.stopAnimation()
                }
            }
        }
    }

    getCurrentFrame(){
        if (!this.currentAnimation) return null;
        return this.currentAnimation.frames[this.currentAnimation.currentFrame];
    }
}