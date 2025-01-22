class Frame{
    constructor(path, x, y, width, height){
        this.path = path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

const walkRight1 = new Frame(
    '/public/images/char.png',
    '-19px',
    '-145px',
    '24px',
    '47px'
)

const walkRight2 = new Frame(
    '/public/images/char.png',
    '-53px',
    '-144px',
    '27px',
    '48px'
)
const walkRight3 = new Frame(
    '/public/images/char.png',
    '-90px',
    '-146px',
    '39px',
    '46px'
)
const walkRight4 = new Frame(
    '/public/images/char.png',
    '-137px',
    '-144px',
    '26px',
    '48px'
)
const walkRight5 = new Frame(
    '/public/images/char.png',
    '-171px',
    '-145px',
    '32px',
    '47px'
)
const walkRight6 = new Frame(
    '/public/images/char.png',
    '-210px',
    '-146px',
    '40px',
    '46px'
)
const walkRight = [walkRight1, walkRight2, walkRight3, walkRight4, walkRight5, walkRight6]
class Animation{
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

const walkRightAnimation = new Animation(walkRight)

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
}