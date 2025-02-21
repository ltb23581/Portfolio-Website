class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;

    this.fadeOverlay = document.createElement("div");
    this.fadeOverlay.style.position = "absolute";
    this.fadeOverlay.style.top = 0;
    this.fadeOverlay.style.left = 0;
    this.fadeOverlay.style.width = "100%";
    this.fadeOverlay.style.height = "100%";
    this.fadeOverlay.style.backgroundColor = "black";
    this.fadeOverlay.style.transition = "opacity 5s ease-in-out";
    this.fadeOverlay.style.opacity = "1";  
    this.element.appendChild(this.fadeOverlay);
  }

  startGameLoop() {
    const step = () => {
      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish the camera person
      const cameraPerson = this.map.gameObjects.me;

      // Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })

      // Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      // Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      // Request next frame
      requestAnimationFrame(() => {
        step();
      })
    }

    // Start the fade-out effect (fade-in the game world)
    setTimeout(() => {
      this.fadeOverlay.style.opacity = "0"; 
    }, 100); // Delay a little to ensure the black screen is visible at the start

    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there anyone to talk to?
      this.map.checkForActionCutscene();
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "me") {
        // Check for cutscenes based on position
        this.map.checkForFootstepCutscene();
      }
    })
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.DemoRoom);
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      { who: "npcA", type: "stand", direction: "down", time: 800 },
      { who: "npcA", type: "stand", direction: "left", time: 800 },
      { who: "npcA", type: "stand", direction: "down", time: 800 },
      { who: "npcA", type: "walk", direction: "down" },
      { who: "npcA", type: "walk", direction: "left" },
      { who: "npcA", type: "walk", direction: "left" },
      { who: "npcA", type: "stand", direction: "left" },

      { who: "me", type: "stand", direction: "right" },

      { type: "textMessage", text: "Hello! Welcome to Lindsay's world! To continue: click the arrow button or use 'enter'" },
      { type: "textMessage", text: "This is an interactive world where you can learn more about Lindsay." },
      { type: "textMessage", text: "To move around, you can you 'W' 'A' 'S' 'D', or the arrow keys." },
      { type: "textMessage", text: "To interact with characters, walk up to them and click 'enter'." },
      { type: "textMessage", text: "Feel free to wander to the world and explore." },

      { who: "npcB", type: "walk", direction: "up" },
      { who: "npcB", type: "walk", direction: "up" },
      { who: "npcB", type: "walk", direction: "right" },
      { who: "npcB", type: "walk", direction: "right" },
      { who: "npcB", type: "stand", direction: "right" },

      { who: "me", type: "stand", direction: "left" },

      { type: "textMessage", text: "But before we move on..." },
      { type: "textMessage", text: "We'd like to give credits to a creator named Drew Conley." },
      { type: "textMessage", text: "All art credits go to him and this world would not be created without his guidance." },
      { type: "textMessage", text: "Hopefully, in the future, this world will be entirely original." },
      { type: "textMessage", text: "But for now, let's use this as a learning experience and starting point!" },
      { type: "textMessage", text: "Without further adieu..." },
      { type: "textMessage", text: "Make sure to interact with all the characters to learn more information." },
      { type: "textMessage", text: "You can talk to us again for more information." },
      { type: "textMessage", text: "Thank you for joining and happy learning!" },

      { who: "npcA", type: "walk", direction: "right" },
      { who: "npcA", type: "walk", direction: "right" },
      { who: "npcA", type: "walk", direction: "up" },
      { who: "npcA", type: "stand", direction: "down" },

      { who: "npcB", type: "walk", direction: "left" },
      { who: "npcB", type: "walk", direction: "left" },
      { who: "npcB", type: "stand", direction: "left" },
      { who: "npcB", type: "walk", direction: "down" },
      { who: "npcB", type: "walk", direction: "down" },
      { who: "npcB", type: "stand", direction: "down" },

      { who: "me", type: "stand", direction: "down" },

    ])
  }
}
