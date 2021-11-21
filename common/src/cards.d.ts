export declare class Deck {
    private readonly cards;
    constructor(cards: Card[]);
    drawRandomWithReplacement(): Card | null;
    drawRandom(): Card | null;
}
export interface Card {
}
export interface Arc extends Card {
    scenario: ArcScenario;
    timeframe: ArcTimeframe;
}
export interface Terrain extends Card {
    name: string;
}
export interface Object extends Card {
    name: string;
}
export interface Mood extends Card {
    name: string;
}
export interface ArcScenario {
    name: string;
    description: string;
}
export declare type ArcTimeframe = string;
export declare class DeckBuilder {
    private static instance;
    private constructor();
    static getInstance(): DeckBuilder;
    baseDeck(): Deck;
    arcDeck(): Deck;
    terrainDeck(): Deck;
    objectDeck(): Deck;
    moodDeck(): Deck;
    private static generateArcBaseCards;
}
