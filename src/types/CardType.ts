export type CardId = '1' | '2' | '3' | '4' | '5';

export type CardPosition = { x: number; y: number };

export type CardProps = CardPosition & { id: CardId };
