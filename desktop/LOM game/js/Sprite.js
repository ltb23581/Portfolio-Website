class Sprite {
  constructor(config) {

    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    // shadow that go underneath each character 
    this.shadow = new Image();
    this.useShadow = true; 
    if (this.useShadow) {
      this.shadow.src = "/desktop/LOM game/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    this.animations = config.animations || {
      "idle-down" : [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up"   : [ [0,2] ],
      "idle-left" : [ [0,3] ],
      "walk-down" : [ [1,0],[0,0],[3,0],[0,0], ],
      "walk-right": [ [1,1],[0,1],[3,1],[0,1], ],
      "walk-up"   : [ [1,2],[0,2],[3,2],[0,2], ],
      "walk-left" : [ [1,3],[0,3],[3,3],[0,3], ]
    }
    this.currentAnimation = "idle-down"; 
    this.currentAnimationFrame = 0;

    // note: on larger displays, the characters move much faster
    // ideal display to view game on: laptop?
    this.animationFrameLimit = config.animationFrameLimit || 16; // amount of frames before it switches to next sprite
    // if on laptop, i'd switch the frame limit to 8 (ideal to me)

    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject || {};
  }

  get frame() {
    const animation = this.animations[this.currentAnimation];
    if (!animation || animation.length === 0) {
      return [0, 0]; // Fallback to default frame
    }
    return animation[this.currentAnimationFrame];
  }  

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
  
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
  
    const currentFrame = this.frame;
    if (currentFrame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }
  
  
  // move() {
  //   // attempt to slow the movement down
  //   // (i cant see the difference on my larger display...)
  //   this.gameObject.x += 0.1; 
  //   this.gameObject.y += 0.1; 
  // }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);


    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32,
      32,32,
      x,y,
      32,32
    )

    this.updateAnimationProgress();
  }

}
