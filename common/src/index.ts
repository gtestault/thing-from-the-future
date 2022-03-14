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
    kind: CardKind
    name: string
}

export type CardKind = "terrain" | "arc" | "object" | "mood"

export class Arc implements Card {
    public readonly name
    public readonly kind: CardKind = "arc"
    public readonly scenario: ArcScenario
    public readonly timeframe: ArcTimeframe

    constructor(scenario: ArcScenario, timeframe: ArcTimeframe) {
        this.scenario = scenario
        this.timeframe = timeframe
        this.name = scenario.name + " | " + timeframe
    }
}

export class Terrain implements Card {
    public readonly kind: CardKind = "terrain";
    public readonly name
    constructor(name: string) {
        this.name = name;
    }
}

export class GameObject implements Card {
    public readonly kind: CardKind = "object"
    public readonly name: string
    constructor(name: string) {
        this.name = name;
    }
}

export class Mood implements Card {
    public readonly kind: CardKind = "mood"
    public readonly name: string

    constructor(name: string) {
        this.name = name;
    }
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
    new Terrain("agriculture"),
    new Terrain("the brain"),
    new Terrain("childhood"),
    new Terrain("citizenship"),
    new Terrain("class"),
    new Terrain("climate"),
    new Terrain("cloning"),
    new Terrain("communications"),
    new Terrain("court"),
    new Terrain("disease"),
    new Terrain("drones"),
    new Terrain("the economy"),
    new Terrain("education"),
    new Terrain("entertainment"),
    new Terrain("environment"),
    new Terrain("equality"),
    new Terrain("family"),
    new Terrain("fashion"),
    new Terrain("flight"),
    new Terrain("forests"),
    new Terrain("genetics"),
    new Terrain("gender"),
    new Terrain("governance"),
    new Terrain("health"),
    new Terrain("hobbies"),
    new Terrain("home"),
    new Terrain("identity"),
    new Terrain("insects"),
    new Terrain("intellectual property"),
    new Terrain("journalism"),
    new Terrain("justice"),
    new Terrain("learning"),
    new Terrain("memory"),
    new Terrain("mining"),
    new Terrain("the moon"),
    new Terrain("music"),
    new Terrain("oceans"),
    new Terrain("oil"),
    new Terrain("old age"),
    new Terrain("pets"),
    new Terrain("power"),
    new Terrain("religion"),
    new Terrain("robots"),
    new Terrain("sex"),
    new Terrain("shopping"),
    new Terrain("space"),
    new Terrain("sports"),
    new Terrain("theatre"),
    new Terrain("travel"),
    new Terrain("war"),
    new Terrain("water"),
    new Terrain("wealth"),
    new Terrain("women"),
    new Terrain("work"),
    new Terrain("zombies"),
    new Terrain("the zoo"),
    new Terrain("wildcard"),
]

const objects: GameObject[] = [
    new GameObject("advertisement"),
    new GameObject("artwork"),
    new GameObject("beverage"),
    new GameObject("book"),
    new GameObject("bottle"),
    new GameObject("box"),
    new GameObject("brochure"),
    new GameObject("building"),
    new GameObject("candy"),
    new GameObject("clothing"),
    new GameObject("corporation"),
    new GameObject("device"),
    new GameObject("document"),
    new GameObject("event"),
    new GameObject("festival"),
    new GameObject("flag"),
    new GameObject("game"),
    new GameObject("gift"),
    new GameObject("headline"),
    new GameObject("implant"),
    new GameObject("instrument"),
    new GameObject("jewellery"),
    new GameObject("kit"),
    new GameObject("law"),
    new GameObject("logo"),
    new GameObject("lotion"),
    new GameObject("machine"),
    new GameObject("magazine cover"),
    new GameObject("map"),
    new GameObject("mask"),
    new GameObject("monument"),
    new GameObject("passport"),
    new GameObject("pill"),
    new GameObject("plant"),
    new GameObject("postcard"),
    new GameObject("poster"),
    new GameObject("product"),
    new GameObject("prosthetic"),
    new GameObject("public service announcement"),
    new GameObject("relic"),
    new GameObject("ritual"),
    new GameObject("show"),
    new GameObject("slogan"),
    new GameObject("snack"),
    new GameObject("song"),
    new GameObject("souvenir"),
    new GameObject("statue"),
    new GameObject("sticker"),
    new GameObject("symbol"),
    new GameObject("t-shirt"),
    new GameObject("tattoo"),
    new GameObject("tool"),
    new GameObject("toy"),
    new GameObject("vehicle"),
    new GameObject("video"),
    new GameObject("weapon"),
    new GameObject("wildcard"),
]

const moods: Mood[] = [
    new Mood("admiration"),
    new Mood("admiration"),
    new Mood("amusement"),
    new Mood("anger"),
    new Mood("anxiety"),
    new Mood("awkwardness"),
    new Mood("calm"),
    new Mood("charm"),
    new Mood("cheer"),
    new Mood("contentment"),
    new Mood("curiosity"),
    new Mood("decadence"),
    new Mood("delight"),
    new Mood("dignity"),
    new Mood("disgust"),
    new Mood("dread"),
    new Mood("embarrassment"),
    new Mood("excitement"),
    new Mood("exhilaration"),
    new Mood("fascination"),
    new Mood("fervor"),
    new Mood("frustration"),
    new Mood("gratitude"),
    new Mood("happiness"),
    new Mood("hilarity"),
    new Mood("hope"),
    new Mood("longing"),
    new Mood("malaise"),
    new Mood("melancholy"),
    new Mood("melodrama"),
    new Mood("nostalgia"),
    new Mood("optimism"),
    new Mood("outrage"),
    new Mood("pathos"),
    new Mood("pleasure"),
    new Mood("pride"),
    new Mood("rationality"),
    new Mood("relief"),
    new Mood("resentment"),
    new Mood("respect"),
    new Mood("sadness"),
    new Mood("satisfaction"),
    new Mood("serenity"),
    new Mood("shame"),
    new Mood("shock"),
    new Mood("sorrow"),
    new Mood("surprise"),
    new Mood("unease"),
    new Mood("warmth"),
    new Mood("weirdness"),
    new Mood("wellbeing"),
    new Mood("wonder"),
    new Mood("worry"),
    new Mood("zen"),
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
        baseDeckCards.push(...DeckBuilder.generateArcBaseCards())
        baseDeckCards.push(...terrains)
        baseDeckCards.push(...objects)
        baseDeckCards.push(...moods)
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
                const arcCard: Arc =  new Arc(scenario, timeframe)
                arcCards.push(arcCard)
            }
        }
        return arcCards
    }
}
