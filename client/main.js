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
    this.load.image("tiles", "/public/game-assets/map/battlefield.png");
    this.load.spritesheet(
      "player",
      "/game-assets/Archers-Character/Archers/Archer-1.png",
      { frameWidth: 12, frameHeight: 12 }
    );
  }

  create() {
    const backgroundImage = this.add.image(0, 0, "tiles").setOrigin(0);

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
    collisionLayer.setAlpha(0);

    const player = this.physics.add.sprite(100, 100, "player");
    this.physics.world.enable(player);
    this.physics.add.collider(player, collisionLayer);
    player.setCollideWorldBounds(true);
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
