export class Deck {
    private readonly cards: Card[]

    constructor(cards: Card[]) {
        this.cards = cards
    }

    public drawRandomWithReplacement(): Card | null {
        if (!this.cards) {
            return null
        }
        const randomCardIndex = Math.floor(Math.random() * this.cards.length)
        return this.cards[randomCardIndex]
    }
    public drawRandom(): Card | null {
        if (!this.cards) {
            return null
        }
        const randomCardIndex = Math.floor(Math.random() * this.cards.length)
        const card = this.cards[randomCardIndex]
        this.cards.splice(randomCardIndex, 1)
        return card
    }
}

export interface Card {
}

export interface Arc extends Card {
    scenario: ArcScenario
    timeframe: ArcTimeframe
}

export interface Terrain extends Card {
    name: string
}

export interface Object extends Card {
    name: string
}

export interface Mood extends Card {
    name: string
}

export interface ArcScenario {
    name: string,
    description: string
}

export type ArcTimeframe = string

const fewYearsArcTimeframe: ArcTimeframe = "A few years"
const decadeArcTimeframe: ArcTimeframe = "A decade"
const generationArcTimeframe: ArcTimeframe = "A generation"
const twoGenerationsArcTimeframe: ArcTimeframe = "Two generations"
const centuryArcTimeframe: ArcTimeframe = "A century"
const millenniumArcTimeframe: ArcTimeframe = "A millennium"

const collapseArcScenario: ArcScenario = {
    name: "Collapse",
    description: "Collapse is a kind of future in which life as we know it has fallen – or is falling – apart."
}
const growArcScenario: ArcScenario = {
    name: "Grow",
    description: "Grow is a kind of future in which everything and everyone keeps climbing: population, production, consumption…"
}
const disciplineArcScenario: ArcScenario = {
    name: "Discipline",
    description: "Discipline is a kind of future in which things are carefully managed by concerted coordination, perhaps top-down or perhaps collaboratively."
}
const transformArcScenario: ArcScenario = {
    name: "Transform",
    description: "Transform is a kind of future in which a profound historical transition has occurred, whether spiritual or technological in nature."
}

const arcScenarios: ArcScenario[] = [
    collapseArcScenario,
    growArcScenario,
    disciplineArcScenario,
    transformArcScenario
]

const arcTimeframes: ArcTimeframe[] = [
    fewYearsArcTimeframe,
    decadeArcTimeframe,
    generationArcTimeframe,
    twoGenerationsArcTimeframe,
    centuryArcTimeframe,
    millenniumArcTimeframe,
]

const terrains: Terrain[] = [
    {name: "agriculture"},
    {name: "the brain"},
    {name: "childhood"},
    {name: "citizenship"},
    {name: "class"},
    {name: "climate"},
    {name: "cloning"},
    {name: "communications"},
    {name: "court"},
    {name: "disease"},
    {name: "drones"},
    {name: "the economy"},
    {name: "education"},
    {name: "entertainment"},
    {name: "environment"},
    {name: "equality"},
    {name: "family"},
    {name: "fashion"},
    {name: "flight"},
    {name: "forests"},
    {name: "genetics"},
    {name: "gender"},
    {name: "governance"},
    {name: "health"},
    {name: "hobbies"},
    {name: "home"},
    {name: "identity"},
    {name: "insects"},
    {name: "intellectual property"},
    {name: "journalism"},
    {name: "justice"},
    {name: "learning"},
    {name: "memory"},
    {name: "mining"},
    {name: "the moon"},
    {name: "music"},
    {name: "oceans"},
    {name: "oil"},
    {name: "old age"},
    {name: "pets"},
    {name: "power"},
    {name: "religion"},
    {name: "robots"},
    {name: "sex"},
    {name: "shopping"},
    {name: "space"},
    {name: "sports"},
    {name: "theatre"},
    {name: "travel"},
    {name: "war"},
    {name: "water"},
    {name: "wealth"},
    {name: "women"},
    {name: "work"},
    {name: "zombies"},
    {name: "the zoo"},
    {name: "wildcard"},
]

const objects: Object[] = [
    {name: "advertisement"},
    {name: "artwork"},
    {name: "beverage"},
    {name: "book"},
    {name: "bottle"},
    {name: "box"},
    {name: "brochure"},
    {name: "building"},
    {name: "candy"},
    {name: "clothing"},
    {name: "corporation"},
    {name: "device"},
    {name: "document"},
    {name: "event"},
    {name: "festival"},
    {name: "flag"},
    {name: "game"},
    {name: "gift"},
    {name: "headline"},
    {name: "implant"},
    {name: "instrument"},
    {name: "jewellery"},
    {name: "kit"},
    {name: "law"},
    {name: "logo"},
    {name: "lotion"},
    {name: "machine"},
    {name: "magazine cover"},
    {name: "map"},
    {name: "mask"},
    {name: "monument"},
    {name: "passport"},
    {name: "pill"},
    {name: "plant"},
    {name: "postcard"},
    {name: "poster"},
    {name: "product"},
    {name: "prosthetic"},
    {name: "public service announcement"},
    {name: "relic"},
    {name: "ritual"},
    {name: "show"},
    {name: "slogan"},
    {name: "snack"},
    {name: "song"},
    {name: "souvenir"},
    {name: "statue"},
    {name: "sticker"},
    {name: "symbol"},
    {name: "t-shirt"},
    {name: "tattoo"},
    {name: "tool"},
    {name: "toy"},
    {name: "vehicle"},
    {name: "video"},
    {name: "weapon"},
    {name: "wildcard"},
]

const moods: Mood[] = [
    {name: "admiration"},
    {name: "admiration"},
    {name: "amusement"},
    {name: "anger"},
    {name: "anxiety"},
    {name: "awkwardness"},
    {name: "calm"},
    {name: "charm"},
    {name: "cheer"},
    {name: "contentment"},
    {name: "curiosity"},
    {name: "decadence"},
    {name: "delight"},
    {name: "dignity"},
    {name: "disgust"},
    {name: "dread"},
    {name: "embarrassment"},
    {name: "excitement"},
    {name: "exhilaration"},
    {name: "fascination"},
    {name: "fervor"},
    {name: "frustration"},
    {name: "gratitude"},
    {name: "happiness"},
    {name: "hilarity"},
    {name: "hope"},
    {name: "longing"},
    {name: "malaise"},
    {name: "melancholy"},
    {name: "melodrama"},
    {name: "nostalgia"},
    {name: "optimism"},
    {name: "outrage"},
    {name: "pathos"},
    {name: "pleasure"},
    {name: "pride"},
    {name: "rationality"},
    {name: "relief"},
    {name: "resentment"},
    {name: "respect"},
    {name: "sadness"},
    {name: "satisfaction"},
    {name: "serenity"},
    {name: "shame"},
    {name: "shock"},
    {name: "sorrow"},
    {name: "surprise"},
    {name: "unease"},
    {name: "warmth"},
    {name: "weirdness"},
    {name: "wellbeing"},
    {name: "wonder"},
    {name: "worry"},
    {name: "zen"},
]


export class DeckBuilder {
    private static instance: DeckBuilder

    private constructor() {
    }

    public static getInstance(): DeckBuilder {
        if (!DeckBuilder.instance) {
            DeckBuilder.instance = new DeckBuilder()
        }
        return DeckBuilder.instance
    }

    public baseDeck(): Deck {
        const baseDeckCards: Card[] = []
        baseDeckCards.push(DeckBuilder.generateArcBaseCards())
        baseDeckCards.push(terrains)
        baseDeckCards.push(objects)
        baseDeckCards.push(moods)
        return new Deck(baseDeckCards)
    }

    public arcDeck(): Deck {
        return new Deck(DeckBuilder.generateArcBaseCards())
    }
    public terrainDeck(): Deck {
        return new Deck(terrains)
    }
    public objectDeck(): Deck {
        return new Deck(objects)
    }
    public moodDeck(): Deck {
        return new Deck(moods)
    }

    private static generateArcBaseCards(): Card[] {
        let arcCards: Card[] = []
        for (const scenario of arcScenarios) {
            for (const timeframe of arcTimeframes) {
                const arcCard: Arc = {timeframe, scenario}
                arcCards.push(arcCard)
            }
        }
        return arcCards
    }
}