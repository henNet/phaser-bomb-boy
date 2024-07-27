import { Scene } from "phaser";

/* Classe responsável por carregar previamente os 
assets do jogo */
export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.setPath("assets");
    this.load.image("background", "background.png");
    this.load.image("title", "title.png");
    this.load.image("ground", "ground.png");
    this.load.image("platform", "platform.png");
    this.load.image("star", "star.png");
    this.load.image("bomb", "bomb.png");
    this.load.spritesheet("player", "player.png", {
      frameWidth: 32,
      frameHeight: 43,
    });
  }

  create() {
    /* Animações do Player */
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1 /* -1 means loop */,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    /* Transita de tela após um tempo (dutation) (Outra sugestão) */
    // this.scene.transition({
    //   target: "MainMenu",
    //   duration: 1000,
    //   moveBelow: true,
    //   onUpdate: (progress) => {
    //     this.cameras.main.setAlpha(1 - progress);
    //   },
    // });

    /* Muda direto para outra tela  */
    this.scene.start("MainMenu");
    // this.scene.start("GameOver");
  }
}
