import { MenuRenderProps } from './types/MenuRenderProps';

export class MemoDom {
    private _elementDom: HTMLElement;

    onStartGame: () => unknown | null;
    onRestartGame: () => unknown | null;

    render({ type, isWin }: MenuRenderProps) {
        const wrapper = document.createElement('div');

        wrapper.innerHTML =
            type === 'start'
                ? this.startTemplate()
                : this.restartTemplate(isWin);

        this._elementDom = wrapper.firstElementChild as HTMLElement;

        const buttonDOM = this._elementDom.querySelector(
            'button'
        ) as HTMLButtonElement;

        buttonDOM.addEventListener('click', () => {
            this._elementDom.remove();

            type === 'start' ? this.onStartGame?.() : this.onRestartGame?.();
        });

        document.body.append(this._elementDom);
    }

    private startTemplate = () => /*html*/ `
        <div class='menu'>
            <span>Игра</span>    
            <button>НАЧАТЬ</button>
        </div>
    `;

    private restartTemplate = (isWin?: boolean) => /*html*/ `
        <div class='menu'>
            <span>${isWin ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}</span>    
            <button>ЗАНОВО</button>
        </div>
    `;
}
