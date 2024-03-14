export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cursors) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.speed = 160;

    //Create the player's animations
    //using the knight.png as a reference for the animations
    this.anims.create({
      key: "move-left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 144,
        end: 150,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "move-right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 176,
        end: 184,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn-left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 144,
        end: 144,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn-right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 176,
        end: 176,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "shoot-left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 256,
        end: 268,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "shoot-right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 288,
        end: 300,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "die",
      frames: this.anims.generateFrameNumbers("player", {
        start: 336,
        end: 341,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.cursors = cursors;
  }

  update() {
    this.setDrag(550);

    // Move the player left or right based on the arrow keys
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("move-left", true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play("move-right", true);
      // } else if (
      //   this.input.keyboard.on("keydown-A", listener) &&
      //   this.cursors.right.isDown
      // ) {
      //   this.anims.play("shoot-right");
    } else {
      this.body.setVelocityX(0);
      this.anims.play("turn-right");
    }

    // Allow the player to jump if they are on the ground
    if (this.body.onFloor && this.cursors.up.isDown) {
      this.setVelocityY(-330);
    }
  }
}
