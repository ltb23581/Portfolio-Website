class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.entryEvents = config.entryEvents || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key];
      object.id = key;

      //TODO: determine if this object should actually mount
      object.mount(this);

    });

    if (this.entryEvents.length) {
      this.startCutscene(this.entryEvents);
    }
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    //Reset NPCs to do their idle behavior
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const me = this.gameObjects["me"];
    const nextCoords = utils.nextPosition(me.x, me.y, me.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    // test to detect if program can identify if "me" is near a person to interact with 
    console.log({ match })

    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene() {
    const me = this.gameObjects["me"];
    const match = this.cutsceneSpaces[`${me.x},${me.y}`];
    if (!this.isCutscenePlaying && match) {
      // console.log({match})
      this.startCutscene(match[0].events)
    }
  }


  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }

  //   // TODO: fix so text box stays in same position 
  //   updateTextMessagePosition() {
  //     const me = this.gameObjects["me"];
  //     const cameraPerson = this.cameraPerson; // Assuming this holds the camera position

  //     const messageElement = document.querySelector('.TextMessage'); // Get the text message element

  //     if (messageElement) {
  //       // Calculate the position of "me" relative to the camera
  //       const xOffset = me.x - cameraPerson.x + utils.withGrid(10.5); // Adjust to center with grid
  //       const yOffset = me.y - cameraPerson.y + utils.withGrid(6);   // Adjust to fit grid

  //       // Fine-tuning offsets to make sure the text stays inside the container
  //       const adjustedX = xOffset - (messageElement.offsetWidth / 2); // Centering horizontally
  //       const adjustedY = yOffset - (messageElement.offsetHeight / 2); // Centering vertically

  //       // Update the position of the message using absolute positioning
  //       messageElement.style.left = `${adjustedX}px`;
  //       messageElement.style.top = `${adjustedY}px`;
  //     }
  //   }

  //   // Call this method in your main game loop or whenever the character moves
  //   update() {
  //     // Update position based on player movement
  //     this.updateTextMessagePosition();
  //     // Other update logic...
  //   }

}

function createHorizontalWall(walls, y, startX, endX) {
  for (let x = startX; x <= endX; x++) {
    walls[utils.asGridCoord(x, y)] = true;
  }
}

function createVerticalWall(walls, x, startY, endY) {
  for (let y = startY; y <= endY; y++) {
    walls[utils.asGridCoord(x, y)] = true;
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/desktop/lom/images/maps/DemoLower.png",
    upperSrc: "/desktop/lom/images/maps/DemoUpper.png",
    gameObjects: {
      me: new Person({ // this is my character! 
        isPlayerControlled: true,
        x: utils.withGrid(7),
        y: utils.withGrid(5),
      }),
      npcA: new Person({ // blonde haired girl with green shirt 
        x: utils.withGrid(10),
        y: utils.withGrid(4),
        src: "/desktop/lom/images/characters/people/npc1.png",
        behaviorLoop: [

          { type: "stand", direction: "down", time: 1500 },
          { type: "stand", direction: "left", time: 1200 },
          { type: "stand", direction: "up", time: 1400 },
          { type: "stand", direction: "left", time: 1300 },
          { type: "stand", direction: "down", time: 1450 },

        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Hello! I hope everything has ran smoothly so far.", faceMe: "npcA" },
              { type: "textMessage", text: "As you can see, the text box is a little misplaced…" },
              { type: "textMessage", text: "She will be fixing this in the future." },
              { type: "textMessage", text: "I hope you’ll still continue to enjoy the world!" },
              { type: "textMessage", text: "This is the information I will give you:" },
              { type: "textMessage", text: "Who is the owner of this world?:" },
              { type: "textMessage", text: "English name: Lindsay, Vietnamese name: Thuy-Nhi, Full Name: Lindsay Thuy-Nhi Thi Bui" },
              { type: "textMessage", text: "Age: 20, Birthday: June 6, 2004" },
              { type: "textMessage", text: "Current third-year Computer Science student studying at the University of Georgia also pursuing the New Media Certificate (Dev Track)." },
              { type: "textMessage", text: "That’s all I have for you! Make sure to talk to the other people for more  information!" }
            ]
          }
        ]
      }),
      npcB: new Person({ // blonder haired boy with white shirt and blue strips 
        x: utils.withGrid(4),
        y: utils.withGrid(7),
        src: "/desktop/lom/images/characters/people/npc3.png",
        behaviorLoop: [

          { type: "stand", direction: "down", time: 1000 },
          { type: "stand", direction: "right", time: 900 },
          { type: "stand", direction: "down", time: 850 },
          { type: "stand", direction: "left", time: 200 },

          { type: "walk", direction: "left", time: 800 },
          { type: "walk", direction: "left", time: 800 },

          { type: "walk", direction: "up", time: 3000 },
          { type: "walk", direction: "up", time: 3000 },

          { type: "stand", direction: "right", time: 1000 },
          { type: "stand", direction: "up", time: 850 },
          { type: "stand", direction: "left", time: 900 },
          { type: "stand", direction: "up", time: 790 },
          { type: "stand", direction: "right", time: 920 },
          { type: "stand", direction: "down", time: 850 },
          { type: "stand", direction: "right", time: 200 },

          { type: "walk", direction: "right", time: 3000 },
          { type: "walk", direction: "right", time: 3000 },

          { type: "stand", direction: "right", time: 1000 },
          { type: "stand", direction: "up", time: 850 },
          { type: "stand", direction: "left", time: 900 },
          { type: "stand", direction: "down", time: 790 },
          { type: "stand", direction: "right", time: 920 },

          { type: "walk", direction: "down", time: 3000 },
          { type: "walk", direction: "down", time: 3000 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Greetings! Here’s the info I have for you:", faceMe: "npcB" },
              { type: "textMessage", text: "What are Lindsay’s interests (degree-related)?:" },
              { type: "textMessage", text: "If you couldn’t already tell, Lindsay is interested in anything design-related in the CS aspect." },
              { type: "textMessage", text: "In the future she hopes to do more with web dev, game dev, UI/UX design, etc…" },
              { type: "textMessage", text: "Also, in the future, this game/resume will also be updated with her own pixel art." },
              { type: "textMessage", text: "Due to the time crunch, the world functionalities are a little simple..." },
              { type: "textMessage", text: "But I hope you’ll support her in her continued expansion of this world!" },
              { type: "textMessage", text: "Let's talk again soon!" }
            ]
          }
        ]
      }),
    },
    walls: (() => {
      const walls = {};
      createVerticalWall(walls, 7, 6, 7)
      createVerticalWall(walls, 8, 6, 7)
      createVerticalWall(walls, 11, 4, 9)
      createVerticalWall(walls, 0, 4, 9)
      createHorizontalWall(walls, 3, 0, 10)
      createHorizontalWall(walls, 4, 6, 6)
      createHorizontalWall(walls, 4, 8, 8)
      createHorizontalWall(walls, 10, 0, 4)
      createHorizontalWall(walls, 10, 6, 10)
      createHorizontalWall(walls, 11, 4, 6)
      return walls
    })(),
    cutsceneSpaces: {
      [utils.asGridCoord(7, 4)]: [
        {
          events: [
            { who: "npcB", type: "stand", direction: "right" },
            { type: "textMessage", text: "Sorry, you can't go there" },
            { who: "me", type: "walk", direction: "down" },
            { who: "me", type: "stand", direction: "down" }
          ]
        }
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            { type: "changeMap", map: "Street" }
          ],
        }
      ]
    }
  },
  Street: {
    lowerSrc: "/desktop/lom/images/maps/StreetLower.png",
    upperSrc: "/desktop/lom/images/maps/StreetUpper.png",
    gameObjects: {
      me: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(10),
      }),
      npcA: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(10),
        src: "/desktop/lom/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 1500 },
          { type: "stand", direction: "right", time: 1400 },
          { type: "stand", direction: "up", time: 1300 },
          { type: "stand", direction: "right", time: 1450 },
          { type: "stand", direction: "down", time: 1500 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Oh, hi there! I see you’ve made it to the new area.", faceMe: "npcA" },
              { type: "textMessage", text: "Feel free to walk around and explore this part of the world." },
              { type: "textMessage", text: "Be aware that you cannot access some areas…" },
              { type: "textMessage", text: "Catch them if you can… Have fun!" }
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(13),
        y: utils.withGrid(9),
        src: "/desktop/lom/images/characters/people/npc4.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 1300 },
          { type: "stand", direction: "left", time: 1400 },
          { type: "stand", direction: "down", time: 1150 },
          { type: "stand", direction: "right", time: 1300 },
          { type: "stand", direction: "up", time: 1200 },
          { type: "stand", direction: "right", time: 1010 },
          { type: "stand", direction: "right", time: 1250 },

          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },

          { type: "stand", direction: "down", time: 1010 },
          { type: "stand", direction: "left", time: 1200 },
          { type: "stand", direction: "up", time: 1400 },
          { type: "stand", direction: "right", time: 1350 },
          { type: "stand", direction: "down", time: 1300 },
          { type: "stand", direction: "right", time: 1010 },
          { type: "stand", direction: "up", time: 1210 },

          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm so bored and HUNGRY", faceMe: "npcB" },
              { type: "textMessage", text: "Let's talk details" },
              { type: "textMessage", text: "Lindsay gave me some food recs, but idk if I can trust her..." },
              { type: "textMessage", text: "Her favorite boba places are: Greatea, ChuChat, and Onezo" },
              { type: "textMessage", text: "Favorite overall food places: The Cream - Duluth and Momonoki" },
              { type: "textMessage", text: "Favorite kbbq: EmBop" },
              { type: "textMessage", text: "Favorite dessert place: Cafe Intermezzo" },
              { type: "textMessage", text: "Favorite coffee shop: The Alchemist Trading Co" },
              { type: "textMessage", text: "Want a ramen rec? That's the trend these days huh?" },
              { type: "textMessage", text: "Jinya is overated... Try OkiBoru (Sandy Springs location is the best tbh)" },
              { type: "textMessage", text: "Need more recs?" },
              { type: "textMessage", text: "Too bad! HA!" },
            ]
          }
        ]
      }),
      npcC: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(15),
        src: "/desktop/lom/images/characters/people/npc5.png",
        behaviorLoop: [
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },

          { type: "stand", direction: "left", time: 5000 },

          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },

          { type: "stand", direction: "right", time: 5000 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Oh, hey. I was just going on my daily jog.", faceMe: "npcC" },
              { type: "textMessage", text: "If you didn’t know, Lindsay hates running." },
              { type: "textMessage", text: "What does she like you ask?" },
              { type: "textMessage", text: "Linday LOVES playing horror games." },
              { type: "textMessage", text: "She rarely gets scared, so you likes playing with her friends that get scared easily." },
              { type: "textMessage", text: "It’s quite amusing in case you were wondering." },
              { type: "textMessage", text: "Other than horror games, she enjoy ‘cozy’ and storymode/adventure games as well." },
              { type: "textMessage", text: "Now, if you don't mind, I'm going back to my jog..." },
            ]
          }
        ]
      }),
      npcD: new Person({
        x: utils.withGrid(25),
        y: utils.withGrid(5),
        src: "/desktop/lom/images/characters/people/npc8.png",
        behaviorLoop: [

        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Sorry, you can't go here.", faceMe: "npcD" },
              { type: "textMessage", text: "I can tell you some details though" },
              { type: "textMessage", text: "You know, Lindsay grew up playing on console." },
              { type: "textMessage", text: "She has 3 older siblings (all in their 30s now), so they made sure to keep the house entertaining." },
              { type: "textMessage", text: "You know the n64?" },
              { type: "textMessage", text: "She played Pokemon Stadium on that thing all the time with her siblings" },
              { type: "textMessage", text: "So many hours on it but could never beat her brother..." },
              { type: "textMessage", text: "Hey, but at least she got her redemption on the PlayStation with Mortal Kombat" },
              { type: "textMessage", text: "She also spent a lot of time on Animal Crossing" },
              { type: "textMessage", text: "That cheapo Tom Nook scamming people... I mean what" },
              { type: "textMessage", text: "I'd be willing to give you more info later, but I got to get back to guarding" },
              { type: "textMessage", text: "Get moving!" },

              { who: "me", type: "walk", direction: "down" },
              { who: "me", type: "walk", direction: "down" },
              { who: "me", type: "stand", direction: "down" },

              { type: "textMessage", text: "Must've played a lot of games growing up" },
            ]
          }
        ]
      }),
      npcE: new Person({
        x: utils.withGrid(29),
        y: utils.withGrid(10),
        src: "/desktop/lom/images/characters/people/npc6.png",
        behaviorLoop: [

        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Shop is closed, sorry.", faceMe: "npcE" },
              { type: "textMessage", text: "Oh, you want to know more?" },
              { type: "textMessage", text: "I guess I have some time to spare..." },
              { type: "textMessage", text: "Did you know that Lindsay is studying abroad next semester (Spring 2025)?" },
              { type: "textMessage", text: "Yeah, she's going to Korea or whatever... not that I care..." },
              { type: "textMessage", text: "I guess she's going to have a lot of fun, but once she gets back the fun is over..." },
              { type: "textMessage", text: "Graduating is eventful. Let's see if she can land a job tho..." },
              { type: "textMessage", text: "K. Leave me alone now" },

              { who: "me", type: "walk", direction: "down", faceMe: "me" },
              { who: "me", type: "walk", direction: "down", faceMe: "me" },
              { who: "me", type: "stand", direction: "down" },
              { type: "textMessage", text: "..." },
              { type: "textMessage", text: "What an attitude..." },

              { who: "npcE", type: "stand", direction: "down" },
            ]
          }
        ]
      }),
      npcF: new Person({
        x: utils.withGrid(24),
        y: utils.withGrid(9),
        src: "/desktop/lom/images/characters/people/npc7.png",
        behaviorLoop: [
          { who: "npcF", type: "walk", direction: "left" },
          { who: "npcF", type: "walk", direction: "left" },
          { who: "npcF", type: "walk", direction: "left" },
          { who: "npcF", type: "walk", direction: "left" },

          { who: "npcF", type: "walk", direction: "down" },
          { who: "npcF", type: "walk", direction: "down" },

          { who: "npcF", type: "walk", direction: "right" },
          { who: "npcF", type: "walk", direction: "right" },
          { who: "npcF", type: "walk", direction: "right" },
          { who: "npcF", type: "walk", direction: "right" },

          { who: "npcF", type: "walk", direction: "up" },
          { who: "npcF", type: "walk", direction: "up" },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I had too much caffeine…", faceMe: "npcF" },
              { type: "textMessage", text: "Run run run run run run run run run run run" },
              { type: "textMessage", text: "Speaking of caffine, Lindsay loves to drink coffee, tea,and milk tea." },
              { type: "textMessage", text: "Her first part-time job was at Ding Tea, so you could say she knows her boba well :D" },
              { type: "textMessage", text: "Her favorite drink combinations are: mango + peach w/ green tea" },
              { type: "textMessage", text: "and black tea or green tea (trust me) w/caramel" },
              { type: "textMessage", text: "anyways, back to running!" },
            ]
          }
        ]
      }),
    },
    cutsceneSpaces: {
      [utils.asGridCoord(5, 9)]: [
        {
          events: [
            { type: "changeMap", map: "DemoRoom", x: utils.withGrid(7), y: utils.withGrid(5) },
          ],
        },
      ],
    },
    walls: (() => {
      const walls = {};
      createVerticalWall(walls, 3, 10, 18)
      createHorizontalWall(walls, 19, 3, 33)
      createVerticalWall(walls, 34, 10, 18)
      createHorizontalWall(walls, 9, 30, 33)
      createVerticalWall(walls, 28, 8, 9)
      createHorizontalWall(walls, 7, 26, 27)
      createVerticalWall(walls, 26, 5, 6)
      createVerticalWall(walls, 25, 4, 4)
      createVerticalWall(walls, 24, 5, 7)
      createHorizontalWall(walls, 7, 15, 23)
      createHorizontalWall(walls, 8, 13, 14)
      createHorizontalWall(walls, 9, 6, 12)
      createHorizontalWall(walls, 9, 4, 4)
      createHorizontalWall(walls, 8, 4, 6)
      createVerticalWall(walls, 25, 9, 11)
      createVerticalWall(walls, 26, 9, 11)
      createVerticalWall(walls, 16, 9, 11)
      createVerticalWall(walls, 17, 9, 11)
      createHorizontalWall(walls, 11, 18, 19)
      createHorizontalWall(walls, 13, 5, 8)
      createHorizontalWall(walls, 14, 5, 8)
      return walls
    })(),
    entryEvents: [
      { who: "npcA", type: "stand", time: 500 }, // adds delay before first text shows up
      { type: "textMessage", text: "You've entered a new area of the map, welcome!" },
      { type: "textMessage", text: "You can continue to interact with characters or step into the door frame to go back to the starting room." },
      { type: "textMessage", text: "Note: re-entering this area will replay this dialog." },
      { type: "textMessage", text: "Enjoy exploring!" },
    ],
  },
}

