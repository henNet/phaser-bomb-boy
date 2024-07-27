import { Physics } from "phaser";

export class Bombs extends Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, "bomb");

    this.scene = scene;
    this.group = scene.physics.add.group();
    this.isCollideWithPlayer = false;
  }

  hitBomb(player, bomb) {
    player.setTint(0xff0000);
    player.anims.play("turn");
    player.scene.isGameOver = true;
  }

  createBomb(playerPositionX) {
    var x =
      playerPositionX < this.scene.scale.width / 2
        ? Phaser.Math.Between(
            this.scene.scale.width / 2,
            this.scene.scale.width
          )
        : Phaser.Math.Between(0, this.scene.scale.width);

    var bomb = this.group.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  collideWithPlayer() {
    return this.isCollideWithPlayer;
  }
}
