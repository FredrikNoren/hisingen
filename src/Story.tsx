import { stringEnum } from './StringEnum';
declare var require: (id: string) => string;

export interface GameState {
  world: WorldId;
  card: CardId;
}

export interface Card {
  title: string;
  image: string;
  leftOption: Option;
  rightOption: Option;
}

type GameStateTransition = (state: GameState) => GameState;

export interface Option {
  name: string;
  result: string;
  nextState: GameStateTransition;
}

const randomCard = (): GameStateTransition => {
  return (state: GameState) => {
    const cards = Worlds[state.world].cards;
    return { world: state.world, card: cards[Math.floor(Math.random() * cards.length)] };
  };
};

export const randomCardInWorld = (worldId: WorldId) => {
  return (): GameState => {
    const cards = Worlds[worldId].cards;
    return { world: worldId, card: cards[Math.floor(Math.random() * cards.length)] };
  };
};

const specificCard = (cardId: CardId): GameStateTransition => {
  return (state: GameState) => {
    return { world: state.world, card: cardId };
  };
};

export const CardId = stringEnum([
  'Goblin',
  'Fallen',
  'Eating',
  'Buss',
  'FredrikOster',
  'GubbeMedTrad',
  'Uggla',
  'Roman',
  'Raksalladsdistributor',
  'Pepsi',
  'Spanskalararen',
  'Palaggstroll',
  'KillPig',
  'Student'
]);
export type CardId = keyof typeof CardId;

export const WorldId = stringEnum([
  'Askim',
  'Onsala',
  'Angered',
  'Sisjon',
  'Dodsriket',
  'Schillerska',
  'Keldyn',
  'Norrland',
  'Skovde',
  'Lost'
]);
export type WorldId = keyof typeof WorldId;

export const Cards: { [key: string]: Card } = {};
Cards[CardId.Goblin] = {
  title: 'Du möter en goblin, vill du köpa jordgubbar av honom?',
  image: require('./Images/Characters/Character3.jpg'),
  leftOption: {
    name: 'Nej',
    result: 'Han blir arg, och förvandlades till ett monster',
    nextState: specificCard(CardId.Fallen)
  },
  rightOption: {
    name: 'Ja',
    result: 'Du fick inga jordgubbar, men förlorade 10kr och hela spelet. Nu för du döda grisar i WoW i all evighet.',
    nextState: randomCardInWorld(WorldId.Lost)
  }
};

Cards[CardId.Fallen] = {
  title: 'Du möter en Fallen.',
  image: require('./Images/Characters/Fallen1.jpg'),
  leftOption: {
    name: 'Spring',
    result: 'Phew, du hann undan genom att springa till Sisjön!',
    nextState:  randomCardInWorld(WorldId.Sisjon)
  },
  rightOption: {
    name: 'Slåss',
    result: 'Åh nej, du dog! Men du vaknade igen i dödsriket.',
    nextState: randomCardInWorld(WorldId.Dodsriket)
  }
};

Cards[CardId.Eating] = {
  title: 'Du sitter och äter, Elin frågar om hon kan få något.',
  image: require('./Images/Characters/Characters1.jpg'),
  leftOption: {
    name: 'Nej',
    result: 'Du kommer till dödsriket.',
    nextState: randomCardInWorld(WorldId.Dodsriket)
  },
  rightOption: {
    name: 'Ja',
    result: 'Elin blir glad och bjuder på en resa till onsala',
    nextState: randomCardInWorld(WorldId.Onsala)
  }
};

Cards[CardId.Buss] = {
  title: 'Du åker buss. Busschauffören ropar ut hållplatsen du ska gå av. Vill du gå av?',
  image: require('./Images/Characters/Forgotten1.jpg'),
  leftOption: {
    name: 'Nej',
    result: 'Du gick inte av. Du hamnar i Angered.',
    nextState: randomCardInWorld(WorldId.Angered)
  },
  rightOption: {
    name: 'Ja',
    result: 'Du gick inte av. Du hamnar i Angered.',
    nextState: randomCardInWorld(WorldId.Angered)
  }
};

Cards[CardId.FredrikOster] = {
  title: 'Du möter Fredrik Oster, han erbjuder ett kontrakt.',
  image: require('./Images/Characters/Ogre2.jpg'),
  leftOption: {
    name: 'Ta inte kontraktet',
    result: 'Inget hander',
    nextState: randomCard()
  },
  rightOption: {
    name: 'Ta kontraktet',
    result: 'Grattis, du får knäckebröd och vatten!',
    nextState: randomCardInWorld(WorldId.Skovde)
  }
};

Cards[CardId.GubbeMedTrad] = {
  title: 'Här finns ju inget! En gubbe med ett träd ger dig lift hem.',
  image: require('./Images/Characters/Iantucauru1.jpg'),
  leftOption: {
    name: 'Åk hem',
    result: 'Du åkte hem',
    nextState: randomCardInWorld(WorldId.Askim)
  },
  rightOption: {
    name: 'Åk hem',
    result: 'Du åkte hem',
    nextState: randomCardInWorld(WorldId.Askim)
  }
};

Cards[CardId.Uggla] = {
  title: 'Du stöter på en klok uggla som berättar hur du ska ta dig tillbaka.',
  image: require('./Images/Characters/Owlkin1.jpg'),
  leftOption: {
    name: 'Åk till skolan',
    result: 'Halba español?',
    nextState: randomCardInWorld(WorldId.Schillerska)
  },
  rightOption: {
    name: 'Åk hem',
    result: 'Du åkte hem',
    nextState: randomCardInWorld(WorldId.Askim)
  }
};

Cards[CardId.Roman] = {
  title: 'Grattis! Du hittade en romersk uniform i skogen.',
  image: require('./Images/Characters/Human_char1b.jpg'),
  leftOption: {
    name: 'Bada i Sisjön',
    result: 'Du kan ju inte simma i romersk uniform, du hamnade på sjöbottnen och vaknar upp igen i dödsriket.',
    nextState: randomCardInWorld(WorldId.Dodsriket)
  },
  rightOption: {
    name: 'Gå hem',
    result: 'Du gick hem',
    nextState: randomCardInWorld(WorldId.Askim)
  }
};

Cards[CardId.Raksalladsdistributor] = {
  title: 'En räksalladdistributor uppenbarar sig. Han säljer räksallad.',
  image: require('./Images/Characters/Sentry_char1.jpg'),
  leftOption: {
    name: 'Hoppa',
    result: 'Ojojoj, nu är du körd!',
    nextState: randomCardInWorld(WorldId.Dodsriket)
  },
  rightOption: {
    name: 'Köp',
    result: 'Mums!',
    nextState: randomCardInWorld(WorldId.Keldyn)
  }
};

Cards[CardId.Pepsi] = {
  title: 'Du möter Pepsi. Majuuu?',
  image: require('./Images/Characters/pepsi.jpg'),
  leftOption: {
    name: 'Jag vill gå ut!',
    result: 'Rätt val',
    nextState: randomCardInWorld(WorldId.Askim)
  },
  rightOption: {
    name: 'Mjöööölk',
    result: 'Rätt val',
    nextState: randomCardInWorld(WorldId.Askim)
  }
};

Cards[CardId.Spanskalararen] = {
  title: 'Spanskaläraren ger dig läxor.',
  image: require('./Images/Characters/Krugel1.jpg'),
  leftOption: {
    name: 'Hoppa av klassen',
    result: 'Jahopp',
    nextState: randomCardInWorld(WorldId.Askim)
  },
  rightOption: {
    name: 'Gör läxorna',
    result: 'Grattis! Du tog studenten!',
    nextState: specificCard(CardId.Student)
  }
};
Cards[CardId.Student] = {
  title: 'Grattis till studenten!',
  image: require('./Images/Characters/Magnus.png'),
  leftOption: {
    name: 'Hoppa av klassen',
    result: 'Jahopp',
    nextState: randomCardInWorld(WorldId.Askim)
  },
  rightOption: {
    name: 'Gör läxorna',
    result: 'Grattis! Du tog studenten!',
    nextState: specificCard(CardId.Student)
  }
};
Cards[CardId.Palaggstroll] = {
  title: 'Den här killen säljer pålägg. Vilket är bäst?',
  image: require('./Images/Characters/Troll2.jpg'),
  leftOption: {
    name: 'Ost',
    result: 'Zergrush! SPRING',
    nextState: randomCardInWorld(WorldId.Askim)
  },
  rightOption: {
    name: 'Vitbetor',
    result: 'Eldorado tackar dig',
    nextState: randomCardInWorld(WorldId.Askim)
  }
};

Cards[CardId.KillPig] = {
  title: 'Du möter en gris.',
  image: require('./Images/Characters/Yppotryll2.jpg'),
  leftOption: {
    name: 'Döda den',
    result: '+1 xp',
    nextState: randomCardInWorld(WorldId.Lost)
  },
  rightOption: {
    name: 'Gå därifrån',
    result: '+0 xp',
    nextState: randomCardInWorld(WorldId.Lost)
  }
};

export interface World {
  name: string;
  image: string;
  cards: CardId[];
}

export const Worlds: { [key: string]: World } = {};

Worlds[WorldId.Askim] = {
  name: 'Askim',
  image: require('./Images/Environments/Forestroad.jpg'),
  cards: [CardId.Goblin, CardId.Eating, CardId.Buss, CardId.FredrikOster]
};

Worlds[WorldId.Onsala] = {
  name: 'Onsala',
  image: require('./Images/Environments/Gloomcove1.jpg'),
  cards: [CardId.GubbeMedTrad]
};

Worlds[WorldId.Angered] = {
  name: 'Angered',
  image: require('./Images/Environments/Skypeak1.jpg'),
  cards: [CardId.Uggla]
};

Worlds[WorldId.Sisjon] = {
  name: 'Sisjön',
  image: require('./Images/Environments/Green_forest1.jpg'),
  cards: [CardId.Roman]
};

Worlds[WorldId.Dodsriket] = {
  name: 'Dödsriket',
  image: require('./Images/Environments/Ghostcity1.jpg'),
  cards: [CardId.Pepsi]
};

Worlds[WorldId.Schillerska] = {
  name: 'Schillerska',
  image: require('./Images/Environments/Temple1.jpg'),
  cards: [CardId.Spanskalararen, CardId.Student]
};

Worlds[WorldId.Keldyn] = {
  name: 'Keldyn',
  image: require('./Images/Environments/Rivervillage1_copy.jpg'),
  cards: [CardId.Palaggstroll]
};

Worlds[WorldId.Norrland] = {
  name: 'Norrland',
  image: require('./Images/Environments/Icegrip_glacier1.jpg'),
  cards: []
};

Worlds[WorldId.Skovde] = {
  name: 'Skövde',
  image: require('./Images/Environments/Highlands2.jpg'),
  cards: [CardId.GubbeMedTrad]
};

Worlds[WorldId.Lost] = {
  name: 'Du har förlorat',
  image: require('./Images/Environments/Landscape2.jpg'),
  cards: [CardId.KillPig]
};
