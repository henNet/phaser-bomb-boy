import { Physics } from "phaser";

export class Platforms extends Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, "platform");

    /* Ground to the player */
    this.images = scene.physics.add.staticGroup();
    this.images.create(512, 718.5, "ground");
    this.images.create(624, 500, "platform").setOrigin(0, 0).refreshBody();
    // this.platforms.create(-50, 390, "platform").setOrigin(0, 0).refreshBody();
    this.images
      .create(0, 390 + 39, "platform")
      .setOrigin(0, 0)
      .refreshBody();
    // this.platforms.create(650, 200, "platform").setOrigin(0, 0).refreshBody();
    this.images
      .create(512, 284 + 39, "platform")
      // .setOrigin(0, 0)
      .refreshBody();
  }
}
