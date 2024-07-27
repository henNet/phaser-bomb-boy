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
  }

  move() {
    /* Movimentação Direita e Esquerda */
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-200);
      this.sprite.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(200);
      this.sprite.anims.play("right", true);
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
