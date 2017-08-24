
interface Story {
  [id: string]: World;
}

interface World {
  image: string;
  cards: { [id: string]: Card };
}

interface Card {
  title: string;
  image: string;
  leftOption: Option;
  rightOption: Option;
}

interface Option {
  name: string;
  result: string;
  action: () => void;
}

export const STORY: Story = {
  Askim: {
    image: require('./Images/Environments/Forestroad.jpg'),
    cards: {
      Goblin: {
        title: 'Du möter en goblin, vill du köpa jordgubbar av honom?',
        image: require('./Images/Characters/Character3.jpg'),
        leftOption: {
          name: 'Nej',
          result: 'Han blir arg, och förvandlades till ett monster',
          action: () => undefined
        },
        rightOption: {
          name: 'Ja',
          result: 'Du fick inga jordgubbar, men förlorade 10kr',
          action: () => undefined
        }
      },
    }
  }
};
