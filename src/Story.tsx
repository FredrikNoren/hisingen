import { stringEnum } from './StringEnum';

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

export const CardId = stringEnum(['Goblin', 'Fallen', 'Eating']);
export type CardId = keyof typeof CardId;

export const WorldId = stringEnum(['Askim', 'Onsala', 'Dodsriket']);
export type WorldId = keyof typeof WorldId;

export const Cards: { [key: string]: Card } = {};
Cards[CardId.Goblin] = {
  title: 'Du möter en goblin, vill du köpa jordgubbar av honom?',
  image: require('./Images/Characters/Character3.jpg'),
  leftOption: {
    name: 'Nej',
    result: 'Han blir arg, och förvandlades till ett monster',
    nextState: s => ({ world: s.world, card: CardId.Fallen })
  },
  rightOption: {
    name: 'Ja',
    result: 'Du fick inga jordgubbar, men förlorade 10kr',
    nextState: randomCard()
  }
};

Cards[CardId.Fallen] = {
  title: 'Du möter en Fallen.',
  image: require('./Images/Characters/Fallen1.jpg'),
  leftOption: {
    name: 'Spring',
    result: 'Phew, du hann undan genom att springa till Sisjön!',
    nextState: randomCard()
  },
  rightOption: {
    name: 'Slåss',
    result: 'Åh nej, du dog! Men du vaknade igen i dödsriket.',
    nextState: randomCardInWorld(WorldId.Dodsriket)
  }
};

Cards[CardId.Eating] = {
  title: 'Du sitter och äter, Elin frågar om hon kan få.',
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

export interface World {
  image: string;
  cards: CardId[];
}

export const Worlds: { [key: string]: World } = {};

Worlds[WorldId.Askim] = {
  image: require('./Images/Environments/Forestroad.jpg'),
  cards: [CardId.Goblin, CardId.Eating]
};

Worlds[WorldId.Onsala] = {
  image: require('./Images/Environments/Gloomcove1.jpg'),
  cards: [CardId.Fallen, CardId.Goblin, CardId.Eating]
};

Worlds[WorldId.Dodsriket] = {
  image: require('./Images/Environments/Ghostcity1.jpg'),
  cards: [CardId.Fallen, CardId.Goblin, CardId.Eating]
};
