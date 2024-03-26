class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoginScene" });
  }

  preload() {
    // Preload assets if needed
  }

  create() {
    // Display login text
    this.add.text(200, 200, "Enter Your Name:", {
      fontSize: "24px",
      fill: "#fff",
    });

    // Create input field for player's name
    const input = this.add.dom(400, 250, "input", {
      type: "text",
      fontSize: "24px",
      backgroundColor: "#fff",
    });
    input.setScale(1.5); // Adjust scale as needed

    // Create play button
    const playButton = this.add
      .text(400, 320, "Play", { fontSize: "32px", fill: "#0f0" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        const playerName = input.node.value.trim();
        if (playerName !== "") {
          // Proceed to next scene with player's name
          this.scene.start("GameScene", { playerName });
        } else {
          // Inform user to enter a name
          this.add
            .text(400, 400, "Please enter your name.", {
              fontSize: "20px",
              fill: "#f00",
            })
            .setOrigin(0.5);
        }
      });

    // Center text and input
    Phaser.Display.Align.In.Center(
      playButton,
      this.add.zone(400, 320, 100, 50)
    );
    Phaser.Display.Align.In.Center(input, this.add.zone(400, 250, 100, 50));
  }
}

// Define your GameScene here

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [LoginScene, GameScene], // Add other scenes as needed
};

const game = new Phaser.Game(config);
