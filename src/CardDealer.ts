import { Scene, Utils } from 'phaser';
import { Card } from './Card';
import GameConfig from './GameConfig';
import { CardPosition } from './types/CardType';

export class CardDealer {
    private _scene: Scene;
    private possibleCardIds: Card['id'][] = ['1', '2', '3', '4', '5'];
    private prevOpenCard: Card | null = null;
    private guessedPairs = 0;

    public onAllCardsOpen: (...args: any) => any = () => null;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    async openCard(card: Card) {
        if (card.isOpen) return;

        await card.open();

        if (!this.prevOpenCard) {
            this.prevOpenCard = card;
            return;
        }

        if (this.prevOpenCard.id === card.id) {
            this.guessedPairs += 1;
        } else {
            await Promise.all([this.prevOpenCard.close(), card.close()]);
        }

        this.prevOpenCard = null;

        if (this.guessedPairs === this.possibleCardIds.length) {
            this.onAllCardsOpen();
        }
    }

    async createCards() {
        const allCardPosition = Utils.Array.Shuffle([
            ...this.possibleCardIds,
            ...this.possibleCardIds,
        ]);

        const cardPositions = this.getCardPositions();

        let i = 0;

        for (const cardId of allCardPosition) {
            const { x, y } = cardPositions[i];
            const card = new Card(this._scene, {
                x: -200,
                y: -200,
                id: cardId,
            });

            await card.move(x, y);
            i++;
        }

        i = NaN;
    }

    private getCardPositions() {
        const cardsPosition: CardPosition[] = [];

        const screenWidth = GameConfig.screenWidth;
        const screenHeight = GameConfig.screenHeight;

        const cardTexture = this._scene.textures.get('card').getSourceImage();

        const cardWidth = cardTexture.width;
        const cardHeight = cardTexture.height;

        const cardMargin = 4;

        const cols = 5;
        const rows = 2;

        const marginLeft = (screenWidth - cardWidth * cols) / 2 + cardWidth / 2;
        const marginTop =
            (screenHeight - cardHeight * rows) / 2 + cardHeight / 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = marginLeft + col * (cardWidth + cardMargin);
                const y = marginTop + row * (cardHeight + cardMargin);

                cardsPosition.push({ x, y });
            }
        }

        return cardsPosition;
    }
}
