"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckBuilder = exports.Deck = void 0;
var Deck = /** @class */ (function () {
    function Deck(cards) {
        this.cards = cards;
    }
    Deck.prototype.drawRandomWithReplacement = function () {
        if (!this.cards) {
            return null;
        }
        var randomCardIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards[randomCardIndex];
    };
    Deck.prototype.drawRandom = function () {
        if (!this.cards) {
            return null;
        }
        var randomCardIndex = Math.floor(Math.random() * this.cards.length);
        var card = this.cards[randomCardIndex];
        this.cards.splice(randomCardIndex, 1);
        return card;
    };
    return Deck;
}());
exports.Deck = Deck;
var fewYearsArcTimeframe = "A few years";
var decadeArcTimeframe = "A decade";
var generationArcTimeframe = "A generation";
var twoGenerationsArcTimeframe = "Two generations";
var centuryArcTimeframe = "A century";
var millenniumArcTimeframe = "A millennium";
var collapseArcScenario = {
    name: "Collapse",
    description: "Collapse is a kind of future in which life as we know it has fallen – or is falling – apart."
};
var growArcScenario = {
    name: "Grow",
    description: "Grow is a kind of future in which everything and everyone keeps climbing: population, production, consumption…"
};
var disciplineArcScenario = {
    name: "Discipline",
    description: "Discipline is a kind of future in which things are carefully managed by concerted coordination, perhaps top-down or perhaps collaboratively."
};
var transformArcScenario = {
    name: "Transform",
    description: "Transform is a kind of future in which a profound historical transition has occurred, whether spiritual or technological in nature."
};
var arcScenarios = [
    collapseArcScenario,
    growArcScenario,
    disciplineArcScenario,
    transformArcScenario
];
var arcTimeframes = [
    fewYearsArcTimeframe,
    decadeArcTimeframe,
    generationArcTimeframe,
    twoGenerationsArcTimeframe,
    centuryArcTimeframe,
    millenniumArcTimeframe,
];
var terrains = [
    { name: "agriculture" },
    { name: "the brain" },
    { name: "childhood" },
    { name: "citizenship" },
    { name: "class" },
    { name: "climate" },
    { name: "cloning" },
    { name: "communications" },
    { name: "court" },
    { name: "disease" },
    { name: "drones" },
    { name: "the economy" },
    { name: "education" },
    { name: "entertainment" },
    { name: "environment" },
    { name: "equality" },
    { name: "family" },
    { name: "fashion" },
    { name: "flight" },
    { name: "forests" },
    { name: "genetics" },
    { name: "gender" },
    { name: "governance" },
    { name: "health" },
    { name: "hobbies" },
    { name: "home" },
    { name: "identity" },
    { name: "insects" },
    { name: "intellectual property" },
    { name: "journalism" },
    { name: "justice" },
    { name: "learning" },
    { name: "memory" },
    { name: "mining" },
    { name: "the moon" },
    { name: "music" },
    { name: "oceans" },
    { name: "oil" },
    { name: "old age" },
    { name: "pets" },
    { name: "power" },
    { name: "religion" },
    { name: "robots" },
    { name: "sex" },
    { name: "shopping" },
    { name: "space" },
    { name: "sports" },
    { name: "theatre" },
    { name: "travel" },
    { name: "war" },
    { name: "water" },
    { name: "wealth" },
    { name: "women" },
    { name: "work" },
    { name: "zombies" },
    { name: "the zoo" },
    { name: "wildcard" },
];
var objects = [
    { name: "advertisement" },
    { name: "artwork" },
    { name: "beverage" },
    { name: "book" },
    { name: "bottle" },
    { name: "box" },
    { name: "brochure" },
    { name: "building" },
    { name: "candy" },
    { name: "clothing" },
    { name: "corporation" },
    { name: "device" },
    { name: "document" },
    { name: "event" },
    { name: "festival" },
    { name: "flag" },
    { name: "game" },
    { name: "gift" },
    { name: "headline" },
    { name: "implant" },
    { name: "instrument" },
    { name: "jewellery" },
    { name: "kit" },
    { name: "law" },
    { name: "logo" },
    { name: "lotion" },
    { name: "machine" },
    { name: "magazine cover" },
    { name: "map" },
    { name: "mask" },
    { name: "monument" },
    { name: "passport" },
    { name: "pill" },
    { name: "plant" },
    { name: "postcard" },
    { name: "poster" },
    { name: "product" },
    { name: "prosthetic" },
    { name: "public service announcement" },
    { name: "relic" },
    { name: "ritual" },
    { name: "show" },
    { name: "slogan" },
    { name: "snack" },
    { name: "song" },
    { name: "souvenir" },
    { name: "statue" },
    { name: "sticker" },
    { name: "symbol" },
    { name: "t-shirt" },
    { name: "tattoo" },
    { name: "tool" },
    { name: "toy" },
    { name: "vehicle" },
    { name: "video" },
    { name: "weapon" },
    { name: "wildcard" },
];
var moods = [
    { name: "admiration" },
    { name: "admiration" },
    { name: "amusement" },
    { name: "anger" },
    { name: "anxiety" },
    { name: "awkwardness" },
    { name: "calm" },
    { name: "charm" },
    { name: "cheer" },
    { name: "contentment" },
    { name: "curiosity" },
    { name: "decadence" },
    { name: "delight" },
    { name: "dignity" },
    { name: "disgust" },
    { name: "dread" },
    { name: "embarrassment" },
    { name: "excitement" },
    { name: "exhilaration" },
    { name: "fascination" },
    { name: "fervor" },
    { name: "frustration" },
    { name: "gratitude" },
    { name: "happiness" },
    { name: "hilarity" },
    { name: "hope" },
    { name: "longing" },
    { name: "malaise" },
    { name: "melancholy" },
    { name: "melodrama" },
    { name: "nostalgia" },
    { name: "optimism" },
    { name: "outrage" },
    { name: "pathos" },
    { name: "pleasure" },
    { name: "pride" },
    { name: "rationality" },
    { name: "relief" },
    { name: "resentment" },
    { name: "respect" },
    { name: "sadness" },
    { name: "satisfaction" },
    { name: "serenity" },
    { name: "shame" },
    { name: "shock" },
    { name: "sorrow" },
    { name: "surprise" },
    { name: "unease" },
    { name: "warmth" },
    { name: "weirdness" },
    { name: "wellbeing" },
    { name: "wonder" },
    { name: "worry" },
    { name: "zen" },
];
var DeckBuilder = /** @class */ (function () {
    function DeckBuilder() {
    }
    DeckBuilder.getInstance = function () {
        if (!DeckBuilder.instance) {
            DeckBuilder.instance = new DeckBuilder();
        }
        return DeckBuilder.instance;
    };
    DeckBuilder.prototype.baseDeck = function () {
        var baseDeckCards = [];
        baseDeckCards.push(DeckBuilder.generateArcBaseCards());
        baseDeckCards.push(terrains);
        baseDeckCards.push(objects);
        baseDeckCards.push(moods);
        return new Deck(baseDeckCards);
    };
    DeckBuilder.prototype.arcDeck = function () {
        return new Deck(DeckBuilder.generateArcBaseCards());
    };
    DeckBuilder.prototype.terrainDeck = function () {
        return new Deck(terrains);
    };
    DeckBuilder.prototype.objectDeck = function () {
        return new Deck(objects);
    };
    DeckBuilder.prototype.moodDeck = function () {
        return new Deck(moods);
    };
    DeckBuilder.generateArcBaseCards = function () {
        var arcCards = [];
        for (var _i = 0, arcScenarios_1 = arcScenarios; _i < arcScenarios_1.length; _i++) {
            var scenario = arcScenarios_1[_i];
            for (var _a = 0, arcTimeframes_1 = arcTimeframes; _a < arcTimeframes_1.length; _a++) {
                var timeframe = arcTimeframes_1[_a];
                var arcCard = { timeframe: timeframe, scenario: scenario };
                arcCards.push(arcCard);
            }
        }
        return arcCards;
    };
    return DeckBuilder;
}());
exports.DeckBuilder = DeckBuilder;
