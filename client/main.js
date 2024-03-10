import "./style.css";
import Phaser from "phaser";
import Player from "./js/classes/Player.js";

const sizes = {
  width: 1000,
  height: 600,
};

const speedDown = 300;

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
      "/public/game-assets/Archers-Character/Archers/Archer-1.png",
      { frameWidth: 64, frameHeight: 48 }
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

    const tileset = map.addTilesetImage("Tileset", "tiles");
    const collisionLayer = map.createLayer("collision", tileset, 0, 0);
    collisionLayer.setScale(scaleFactor);
    collisionLayer.setCollisionByExclusion([-1]);
    collisionLayer.setAlpha(0); // makes layer invisible

    //player
    this.player = new Player(this, 100, 100);
    this.player.setOrigin(0.5, 0.5);
    this.player.setScale(1.5);
    this.physics.world.enable(this.player);
    // Add collision between player and collision layer
    this.physics.add.collider(this.player, collisionLayer);
  }

  update() {}
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  mode: Phaser.Scale.FIT,
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
