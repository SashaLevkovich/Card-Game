import { GameObjects, Scene } from 'phaser';
import { TimerProp } from './types/TimerProps';

export class Timer {
    private _scene: Scene;
    private _text: GameObjects.Text;
    private _position: { x: number; y: number };
    private _time: number;

    onTimeIsOver: () => unknown | null;

    tick = () => {
        this._time -= 1;
        this._text.text = `Time: ${this._time}`;

        if (this._time === 0) {
            this.onTimeIsOver?.();
            this._scene.time.paused = true;
        }
    };

    constructor(scene: Scene, props: TimerProp) {
        const { x, y, maxTime } = props;

        this._scene = scene;
        this._position = { x, y };
        this._time = maxTime;

        this.createText();
    }

    private createText() {
        this._text = this._scene.add.text(
            this._position.x,
            this._position.y,
            `Time: ${this._time}`,
            {
                fontSize: '20px',
            }
        );
    }

    stop() {
        this._scene.time.paused = true;
    }

    start() {
        this._scene.time.paused = false;
        this._scene.time.addEvent({
            delay: 1000,
            callback: this.tick,
            loop: true,
        });
    }
}
