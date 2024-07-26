import { Scene } from "phaser";
import { textStyle, textStyleBig } from "../utils/textStyle";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(512, 384, "background");
    // const title = this.add.image(512, 350, "title").setDepth(100);

    const title = this.add
      .text(512, 490, "Bomb Boy", textStyleBig)
      .setOrigin(0.5)
      .setDepth(100);

    this.add
      .text(512, 490, "Click to Play", textStyle)
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
