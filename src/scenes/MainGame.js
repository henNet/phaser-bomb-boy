import { Scene } from "phaser";
import { textStyle } from "../utils/textStyle";
import { Player } from "../gameobjects/Player";
import { Platforms } from "../gameobjects/Platforms";
import { Stars } from "../gameobjects/Stars";
import { Bombs } from "../gameobjects/Bombs";

export class MainGame extends Scene {
  constructor() {
    super("MainGame");
  }

  init() {
    this.score = 0;
    this.isGameOver = false;
    this.Player = null;
  }

  create() {
    /* Scenario */
    // this.add.image(512, 384, "background");
    this.add.image(this.scale.width / 2, this.scale.height / 2, "background");

    /* Ground and Platforms */
    this.platforms = new Platforms(this);

    /* Stars Collectables */
    this.stars = new Stars(this);

    /* Enemies */
    this.bombs = new Bombs(this);

    /* Player */
    this.player = new Player(this);

    /* Colliders */
    this.physics.add.collider(this.player.sprite, this.platforms.images);
    this.physics.add.collider(this.stars.group, this.platforms.images);
    this.physics.add.overlap(
      this.player.sprite,
      this.stars.group,
      this.stars.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.bombs.group, this.platforms.images);
    this.physics.add.collider(
      this.player.sprite,
      this.bombs.group,
      this.bombs.hitBomb,
      null,
      this
    );
    this.physics.add.collider(this.bombs.group, this.bombs.group);

    /* Texts */
    this.scoreText = this.add.text(16, 16, "Score: 0", textStyle);
  }

  update() {
    console.log(this.input.gamepad.getPad(0));

    this.player.move();

    if (this.stars.isAllStarsWereCollected() === true) {
      this.stars.restartAllStars();
      this.bombs.createBomb(this.player.sprite.x);
    }

    /* Condição de GameOver */
    if (this.isGameOver === true) {
      this.physics.pause();
      //  Swap to the GameOver scene after a miliseconds delay
      this.time.delayedCall(500, () =>
        this.scene.start("GameOver", { score: this.score })
      );
    }
  }
}
