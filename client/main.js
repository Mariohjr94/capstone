import "./style.css";
import Phaser from "phaser";

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
    this.load.image("tiles", "/game-assets/map/battlefield.png");
    // this.load.spritesheet(
    //   "player",
    //   "/game-assets/Archers-Character/Archers/Archer-1.png",
    //   { frameWidth: 12, frameHeight: 12 }
    // );
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("battlefield", "tiles");

    const backgroundClouds = map.createStaticLayer(
      "background_clouds",
      tileset,
      0,
      0
    );
  }

  update() {}
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
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
