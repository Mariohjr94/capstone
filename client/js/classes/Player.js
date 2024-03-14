export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cursors) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.speed = 160;

    //Create the player's animations
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 144,
        end: 150,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 176,
        end: 184,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Play the 'turn' animation by default
    // this.anims.play("right");

    this.cursors = cursors;
  }

  update() {
    this.setDrag(550);

    // Move the player left or right based on the arrow keys
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.body.setVelocityX(0);
      this.anims.play("right");
    }

    // Allow the player to jump if they are on the ground
    if (this.body.onFloor && this.cursors.up.isDown) {
      this.setVelocityY(-330);
    }
  }
}
