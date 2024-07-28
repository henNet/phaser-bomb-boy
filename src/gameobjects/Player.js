import { Physics } from "phaser";
import { MobileVirtualInput } from "./MobileVirtualInput";

/* Physics.Arcade.Sprite representa um componente de 
corpo físico dinâmico ou estático. Sprite quer dizer que
você pode realizar animações na subclasse */
export class Player extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 100, 450, "player");
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(
      scene.scale.width / 2,
      450,
      "player"
    );
    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setGravityY(600);
    this.sprite.setScale(1.2).refreshBody();

    this.stepWalk = 300;
    this.stepJump = 730;

    /* Inputs do teclado */
    this.cursors = scene.input.keyboard.createCursorKeys();

    /* Inputs do Gamepad */
    scene.input.gamepad.on("connected", this.gamepadConnected, this);
    scene.input.gamepad.on("disconnected", this.gamepadDisconnected, this);
    scene.input.gamepad.once("down", this.gamepadButtonDown, this);

    /* Inputs do Gamepad Vitual para Mobile */
    this.inputMobile = new MobileVirtualInput(scene);
    this.scene.input.gamepad.refreshPads();
    if (this.scene.input.gamepad.total !== 0) {
      if (scene.input.gamepad.getPad(0).connected) {
        this.inputMobile.joyStick.setVisible(false);
        this.inputMobile.button.visible = false;
      }
    }

    /* Input Mouse/Touch. Resolve por ora o problema da desconexão
    do gamepad. OBS: Phaser não desconecta o gamepad */
    scene.input.once("pointerdown", () => {
      this.inputMobile.joyStick.setVisible(true);
      this.inputMobile.button.visible = true;
    });
  }

  gamepadConnected(gamepad, event) {
    console.log("Gamepad connected");
    this.inputMobile.joyStick.setVisible(false);
    this.inputMobile.button.visible = false;
  }

  gamepadDisconnected(gamepad, event) {
    console.log("Gamepad Disconnected");
    // this.inputMobile.joyStick.toggleVisible();
    this.inputMobile.joyStick.setVisible(true);
    this.inputMobile.button.visible = true;
  }

  gamepadButtonDown(gamepad, button, value) {
    /* Desabilita o inputMobile */
    this.inputMobile.joyStick.setVisible(false);
    this.inputMobile.button.visible = false;
  }

  move() {
    /* Movimentação Direita e Esquerda */
    if (this.cursors.left.isDown || this.inputMobile.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.stepWalk);
      this.sprite.anims.play("left", true);
    } else if (
      this.cursors.right.isDown ||
      this.inputMobile.cursors.right.isDown
    ) {
      this.sprite.setVelocityX(this.stepWalk);
      this.sprite.anims.play("right", true);

      /* Verifica se ha algum gamepad */
    } else if (this.scene.input.gamepad.total !== 0) {
      const pad = this.scene.input.gamepad.getPad(0);

      if (pad.A && this.sprite.body.touching.down) {
        this.sprite.setVelocityY(-this.stepJump);
      }

      if (pad.axes.length) {
        const axisH = pad.axes[0].getValue();
        // const axisV = pad.axes[1].getValue();

        if (axisH > 0.2) {
          this.sprite.setVelocityX(this.stepWalk);
          this.sprite.anims.play("right", true);
        } else if (axisH < -0.2) {
          this.sprite.setVelocityX(-this.stepWalk);
          this.sprite.anims.play("left", true);
        } else {
          this.sprite.setVelocityX(0);
          this.sprite.anims.play("turn");
        }
      }
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.anims.play("turn");
    }

    /* Movimentação do pulo */
    if (
      (this.cursors.up.isDown || this.inputMobile.getIsButtonDown()) &&
      this.sprite.body.touching.down
    ) {
      this.sprite.setVelocityY(-this.stepJump);
    }

    if (this.cursors.space.isDown && this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-this.stepJump);
    }
  }
}
