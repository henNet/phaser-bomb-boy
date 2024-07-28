import VirtualJoystick from "phaser3-rex-plugins/plugins/virtualjoystick.js";

export class MobileVirtualInput {
  constructor(scene) {
    /* Habilita mais um toque na tela quando no Mobile */
    scene.input.addPointer(1);

    this.joyStick = new VirtualJoystick(scene, {
      x: scene.scale.width * 0.1,
      y: scene.scale.height * 0.85,
      radius: 100,
      base: scene.add.circle(0, 0, 100, 0x888888, 0.7),
      thumb: scene.add.circle(0, 0, 50, 0xcccccc),
    });

    this.cursors = this.joyStick.createCursorKeys();

    this.isButtonDown = false;
    this.button = scene.add
      .circle(
        scene.scale.width * 0.9,
        scene.scale.height * 0.85,
        100,
        0x888888,
        0.7
      )
      .setStrokeStyle(2, 0x000000)
      .setInteractive()
      .on("pointerdown", () => {
        this.isButtonDown = true;
      })
      .on("pointerup", () => {
        this.isButtonDown = false;
      });
  }

  getIsButtonDown() {
    return this.isButtonDown;
  }
}
