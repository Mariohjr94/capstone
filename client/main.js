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
    this.load.image("map", "/game-assets/battlefield.png");
    this.load.tilemapTiledJSON("collisions", "/game-assets/battlefield.json");
    this.load.spritesheet(
      "player",
      "/game-assets/Archers-Character/Archers/Archer-1.png",
      { frameWidth: 16, frameHeight: 16 }
    );
  }

  create() {
    const background = this.add.sprite(0, 0, "map");
    background.setOrigin(0, 0);
    const scaleX = sizes.width / background.width;
    const scaleY = sizes.height / background.height;
    background.setScale(scaleX, scaleY);

    this.player = this.physics.add.sprite(10, 10, "player", 1);
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
