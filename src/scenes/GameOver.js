import { Scene } from "phaser";
import { textStyle, textStyleBig, textStyleMedium } from "../utils/textStyle";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
    this.score = 0;
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    /* Scenario */
    this.add.image(512, 384, "background");

    const title = this.add
      .text(512, 490, "Game Over", textStyleBig)
      .setOrigin(0.5)
      .setDepth(100);

    this.score = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        "Final Score: " + this.score,
        textStyleMedium
      )
      .setOrigin(0.5)
      .setDepth(100);

    this.add
      .text(
        this.scale.width / 2,
        this.scale.height * 0.7,
        "Click to Play Again",
        textStyle
      )
      .setOrigin(0.5)
      .setDepth(100);

    /* Gera uma animação caindo para o titulo do jogo */
    this.tweens.add({
      targets: title,
      y: 270,
      duration: 1000,
      ease: "Bounce",
    });

    this.input.once("pointerdown", () => {
      this.scene.start("MainGame");
    });
  }
}
