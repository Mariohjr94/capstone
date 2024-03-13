export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cursors) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.speed = 160;

    // Create the player's animations
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
    console.log("Playing default animation: left");

    this.anims.play("left");

    this.cursors = cursors;
  }

  update() {
    console.log("Left:", this.cursors.left.isDown);
    console.log("Right:", this.cursors.right.isDown);
    console.log("Up:", this.cursors.up.isDown);
    console.log("Down:", this.cursors.down.isDown);
    this.setDrag(2000);
    // Move the player left or right based on the arrow keys
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
      //this.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play("right", true);
      //this.setFlipX(false);
    } else {
      this.body.setVelocityX(0);
      this.anims.play("right");
    }

    // Allow the player to jump if they are on the ground
    if (
      (this.body.blocked.down || this.body.touching.down) &&
      this.scene.input.keyboard.isDown(Phaser.Input.Keyboard.SPACE)
    ) {
      this.setVelocityY(-330);
    }
  }
}
