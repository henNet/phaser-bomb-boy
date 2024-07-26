import { Scene } from "phaser";
import { textStyle } from "../utils/textStyle";

export class MainGame extends Scene {
  #player = null;
  #platforms = null;
  #cursors = null;
  #stars = null;
  #score = 0;
  #scoreText = null;
  #bombs = null;
  #gameOver = null;

  constructor() {
    super("MainGame");
    this.score = 0;
    this.gameOver = false;
  }

  create() {
    /* Scenario */
    this.add.image(512, 384, "background");

    /* Ground to the player */
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(512, 718.5, "ground");
    this.platforms.create(624, 500, "platform").setOrigin(0, 0).refreshBody();
    // this.platforms.create(-50, 390, "platform").setOrigin(0, 0).refreshBody();
    this.platforms
      .create(0, 390 + 39, "platform")
      .setOrigin(0, 0)
      .refreshBody();
    // this.platforms.create(650, 200, "platform").setOrigin(0, 0).refreshBody();
    this.platforms
      .create(512, 284 + 39, "platform")
      // .setOrigin(0, 0)
      .refreshBody();

    /* Collectables */
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 10,
      setXY: { x: 50, y: 0, stepX: 90 },
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    /* Enemies */
    this.bombs = this.physics.add.group();

    /* Player */
    this.player = this.physics.add.sprite(100, 450, "player");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(600);

    /* Colliders */
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
    this.physics.add.collider(this.bombs, this.bombs);

    /* Inputs */
    this.cursors = this.input.keyboard.createCursorKeys();

    /* Texts */
    this.scoreText = this.add.text(16, 16, "Score: 0", textStyle);
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play("turn");
    this.gameOver = true;
  }

  update() {
    /* Movimentação Direita e Esquerda */
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    /* Movimentação do pulo */
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-730);
    }

    if (this.cursors.space.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-730);
    }

    if (this.gameOver === true) {
      //  Swap to the GameOver scene after a 2 second delay
      this.gameOver = false;
      this.time.delayedCall(500, () => this.scene.start("GameOver"));
    }
  }
}
