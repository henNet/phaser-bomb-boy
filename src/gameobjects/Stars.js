import { Physics } from "phaser";

export class Stars extends Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, "star");

    this.group = scene.physics.add.group({
      key: "star",
      repeat: 14,
      setXY: { x: 50, y: 0, stepX: 90 },
    });

    this.group.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }

  /* Chamada quando o player colide com uma star */
  collectStar(player, star) {
    star.disableBody(true, true);

    player.scene.score += 10;
    player.scene.scoreText.setText("Score: " + this.score);
  }

  isAllStarsWereCollected() {
    return this.group.countActive(true) === 0;
  }

  restartAllStars() {
    this.group.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}
