import "./style.css";
import Phaser from "phaser";
import Player from "./js/classes/Player.js";

const sizes = {
  width: 1050,
  height: 600,
};

const speedDown = 500;

//creating game scene
class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/game-assets/map/battlefield.json");
    this.load.image("tiles", "/public/game-assets/map/battlefield.png");
    this.load.spritesheet(
      "player",
      "/public/game-assets/Archers-Character/Archers/knight.png",
      { frameWidth: 64, frameHeight: 64 }
    );
  }

  create() {
    const backgroundImage = this.add.image(0, 0, "tiles").setOrigin(0);
    //scalling funtion
    const scaleFactor = Math.max(
      this.scale.width / backgroundImage.width,
      this.scale.height / backgroundImage.height
    );
    backgroundImage.setScale(scaleFactor);

    //adding collision to floors
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 12,
      tileHeight: 12,
    });
    //terrain collision
    const tileset = map.addTilesetImage("Tileset", "tiles");
    const collisionLayer = map.createLayer("collision", tileset, 0, 0);
    collisionLayer.setScale(scaleFactor);
    collisionLayer.setCollisionByExclusion([-1]);
    collisionLayer.setCollisionByProperty({ collide: true });
    collisionLayer.setAlpha(0); // makes layer invisible
    //player
    const platformLayer = map.createLayer("collision", tileset, 0, 0);
    platformLayer.setScale(scaleFactor);
    platformLayer.setCollisionByExclusion([-1]);
    platformLayer.setCollisionByProperty({ collide: true });

    // Initialize cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //player
    this.player = new Player(this, 100, 100, this.cursors);
    this.player.setGravity(speedDown);
    this.player.setOrigin(1, 1);
    this.player.setScale(0.75);

    //resizing bouncing box
    const newBoundingBoxWidth = 16;
    const newBoundingBoxHeight = 48;
    const offsetX = (this.player.width - newBoundingBoxWidth) / 2;
    const offsetY = (this.player.height - newBoundingBoxHeight) / 1.5;
    // Set the new size of the bounding box
    this.player.body.setSize(newBoundingBoxWidth, newBoundingBoxHeight, true);
    this.player.body.setOffset(offsetX, offsetY);

    // Add collision between player and collision layer
    this.physics.add.collider(this.player, collisionLayer);
  }

  update() {
    console.log("Scene update loop running");
    this.player.update();
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  parent: "phaser-game",
  mode: Phaser.Scale,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
