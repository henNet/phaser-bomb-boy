import VirtualJoystick from "phaser3-rex-plugins/plugins/virtualjoystick.js";

export class MobileVirtualInput {
  constructor(scene) {
    this.joyStick = new VirtualJoystick(scene, {
      x: scene.scale.width * 0.1,
      y: scene.scale.height * 0.9,
      radius: 50,
      base: scene.add.circle(0, 0, 50, 0x888888, 0.7),
      thumb: scene.add.circle(0, 0, 25, 0xcccccc),
    });

    console.log(this.joyStick);

    this.cursors = this.joyStick.createCursorKeys();

    this.button = scene.add
      .circle(
        scene.scale.width * 0.9,
        scene.scale.height * 0.9,
        50,
        0x888888,
        0.7
      )
      .setStrokeStyle(2, 0x000000)
      .setInteractive();
  }
}
