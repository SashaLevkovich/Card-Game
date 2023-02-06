import { Scene } from 'phaser';
import { Card } from '../Card';
import { CardDealer } from '../CardDealer';
import { MemoDom } from '../MemoDOM';
import { Timer } from '../Timer';

type SceneCreateProps = {
    isRestart: boolean;
};

export class GameScene extends Scene {
    private _cardDealer: CardDealer;

    private _memoDOM: MemoDom;

    private _timer: Timer;

    private _isGameOver: boolean;

    onCardClick = (_: unknown, object: unknown) => {
        if (object instanceof Card) {
            if (this._isGameOver) return;

            this._cardDealer.openCard(object);
        }
    };

    onStartGame = async () => {
        await this._cardDealer.createCards();
        this._timer.start();
        this.input.on('gameobjectdown', this.onCardClick);
    };

    onRestartGame = () => {
        this.scene.restart({ isRestart: true });
    };

    onAllCardsOpen = () => {
        this._memoDOM.render({ type: 'end', isWin: true });
        this._timer.stop();
        this._isGameOver = true;
    };

    onTimerIsOver = () => {
        this._memoDOM.render({ type: 'end', isWin: false });
        this._isGameOver = true;
    };

    constructor() {
        super('GameScene');
    }

    async create({ isRestart }: SceneCreateProps) {
        this._isGameOver = false;

        this._cardDealer = new CardDealer(this);

        this._timer = new Timer(this, {
            x: 600,
            y: 10,
            maxTime: 30,
        });

        this._memoDOM = new MemoDom();

        isRestart
            ? this.onStartGame()
            : this._memoDOM.render({ type: 'start' });

        this.initEvents();
    }

    initEvents() {
        this._memoDOM.onStartGame = this.onStartGame;
        this._memoDOM.onRestartGame = this.onRestartGame;
        this._cardDealer.onAllCardsOpen = this.onAllCardsOpen;
        this._timer.onTimeIsOver = this.onTimerIsOver;
    }
}
