import { Scene } from "phaser";
import { textStyle, textStyleBig } from "../utils/textStyle";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    /* Scenario */
    this.add.image(512, 384, "background");

    const title = this.add
      .text(512, 490, "Game Over", textStyleBig)
      .setOrigin(0.5)
      .setDepth(100);

    this.add
      .text(512, 490, "Click to Play Again", textStyle)
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
