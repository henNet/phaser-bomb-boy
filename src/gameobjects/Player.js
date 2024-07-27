import { Physics } from "phaser";

/* Physics.Arcade.Sprite representa um componente de 
corpo físico dinâmico ou estático. Sprite quer dizer que
você pode realizar animações na subclasse */
export class Player extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 100, 450, "player");
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(100, 450, "player");
    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setGravityY(600);

    /* Inputs do teclado */
    this.cursors = scene.input.keyboard.createCursorKeys();

    /* Inputs do Gamepad */
    scene.input.gamepad.on("connected", this.gamepadConnected);
  }

  gamepadConnected(gamepad, event) {
    console.log("Gamepad connected");
  }

  move() {
    /* Movimentação Direita e Esquerda */
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-200);
      this.sprite.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(200);
      this.sprite.anims.play("right", true);

      /* Verifica se ha algum gamepad */
    } else if (this.scene.input.gamepad.total !== 0) {
      const pad = this.scene.input.gamepad.getPad(0);

      if (pad.A && this.sprite.body.touching.down) {
        this.sprite.setVelocityY(-630);
      }

      if (pad.axes.length) {
        const axisH = pad.axes[0].getValue();
        const axisV = pad.axes[1].getValue();

        if (axisH > 0.2) {
          this.sprite.setVelocityX(200);
          this.sprite.anims.play("right", true);
        } else if (axisH < -0.2) {
          this.sprite.setVelocityX(-200);
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
    if (this.cursors.up.isDown && this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-730);
    }

    if (this.cursors.space.isDown && this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-730);
    }
  }
}
