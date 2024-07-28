import { AUTO, Scale, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { MainGame } from "./scenes/MainGame";
import { GameOver } from "./scenes/GameOver";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: AUTO,
  width: 1366,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  input: {
    gamepad: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
    },
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Preloader, MainMenu, MainGame, GameOver],
};

export default new Game(config);
