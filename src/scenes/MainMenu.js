import { Scene } from "phaser";
import { textStyle, textStyleBig } from "../utils/textStyle";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  /* Use it to create your game objects. This method 
  is called by the Scene Manager when the scene starts, 
  after init() and preload(). Can be receive a data object 
  passed via scene.start()  */
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

    /* Input Mouse */
    this.input.once("pointerdown", () => {
      this.scene.start("MainGame");
    });

    /* Input Keyboard */
    const enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.on("down", () => {
      console.log("Aqui");
      this.scene.start("MainGame");
    });

    /* Input Gamepad */
    this.input.gamepad.once(
      "down",
      function (gamepad, button, value) {
        // console.log(button.pad.A);
        if (gamepad.A) {
          this.scene.start("MainGame");
        }
      },
      this /* Representa a scene (contexto) atual */
    );
  }
}
