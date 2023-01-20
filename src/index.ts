import { Game, Types, AUTO } from 'phaser';
import { GameScene } from './scenes/GameScene';
import { PreloadScene } from './scenes/PreloadScene';
import GameConfig from './GameConfig';

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: GameConfig.screenWidth,
    height: GameConfig.screenHeight,
    backgroundColor: GameConfig.backgroundColor,
    scene: [PreloadScene, GameScene],
};

new Game(config);
