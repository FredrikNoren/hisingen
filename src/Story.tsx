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
function card(c: Card): Card {
  return c;
}

export interface Option {
  name: string;
  result: string;
  nextState: (state: GameState) => GameState;
}

function randomCard(state: GameState): GameState {
  const cards = WORLDS[state.world].cards;
  return { world: state.world, card: cards[Math.floor(Math.random() * cards.length)] };
}

export const CardId = stringEnum(['Goblin', 'Fallen']);
export type CardId = keyof typeof CardId;

export const Cards: { [key: string]: Card } = {
  [CardId.Goblin]: card({
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
      nextState: randomCard
    }
  }),
  [CardId.Fallen]: card({
    title: 'Du möter en Fallen.',
    image: require('./Images/Characters/Fallen1.jpg'),
    leftOption: {
      name: 'Slåss',
      result: 'Åh nej, du dog! Men du vaknade igen i dödsriket.',
      nextState: randomCard
    },
    rightOption: {
      name: 'Spring',
      result: 'Phew, du hann undan genom att springa till Sisjön!',
      nextState: randomCard
    }
  })
};

export interface World {
  image: string;
  cards: CardId[];
}
function world(c: World): World {
  return c;
}

export const WORLDS = {
  Askim: world({
    image: require('./Images/Environments/Forestroad.jpg'),
    cards: [CardId.Fallen, CardId.Goblin]
  })
};
export type WorldId = keyof typeof WORLDS;
