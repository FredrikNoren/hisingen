import * as React from 'react';
import './App.css';
import { Card } from './Card';
import { GameState, WorldId, CardId, Worlds, Cards, Option } from './Story';
import * as url from 'url';

interface AppState {
  world: WorldId;
  card: CardId;
  swipe: number;
  lastSelectedOption: Option;
  nextCard: CardId;
  state: 'card' | 'next';
  visisted: { [id: string]: boolean };
}

const parsedUrl = url.parse(window.location.href, true);

class App extends React.Component<{}, AppState> {
  state: AppState = {
    world: parsedUrl.query.world || WorldId.Askim,
    card: parsedUrl.query.card || CardId.Start,
    swipe: 0,
    state: 'card',
    lastSelectedOption: { name: '', result: '', nextState: s => s },
    nextCard: CardId.Fallen,
    visisted: {}
  };
  gameState(): GameState {
    return { world: this.state.world, card: this.state.card, visisted: this.state.visisted };
  }
  chooseOption(option: 'left' | 'right') {
    const card = Cards[this.state.card];
    let opt;
    let swipe;
    if (option === 'left') {
      opt = card.leftOption;
      swipe = -1;
    } else {
      opt = card.rightOption;
      swipe = 1;
    }
    const nextState = opt.nextState(this.gameState());
    this.setState({ swipe, state: 'next', lastSelectedOption: opt,
      world: nextState.world, nextCard: nextState.card, visisted: nextState.visisted });
  }
  goNext() {
    this.setState({ state: 'card', swipe: 0, card: this.state.nextCard });
  }
  handleSwipeRelease = () => {
    if (Math.abs(this.state.swipe) > 0.3) {
      if (this.state.swipe > 0) {
        this.chooseOption('right');
      } else {
        this.chooseOption('left');
      }
    } else {
      this.setState({ swipe: 0 });
    }
  }
  render() {
    const world = Worlds[this.state.world];
    const card = Cards[this.state.card];
    return (
      <div
        className={`App ${this.state.state === 'card' ? 'CardState' : 'NextState'}`}
        style={{ backgroundImage: `url(${world.image})` }}
      >
        <div className="AppBackgroundOverlay Overlay" />
        <div className="Content">
          <div className="WorldTitle">{world.name}</div>
          <div className="CardTitle">{card.title}</div>
          <Card
            imageSrc={card.image}
            leftOption={card.leftOption.name}
            rightOption={card.rightOption.name}
            swipe={this.state.swipe}
            onSwipe={swipe => this.setState({ swipe })}
            onSwipeRelease={this.handleSwipeRelease}
          />
          <div className="Next">
            <div className="NextTitle">"{this.state.lastSelectedOption.result}"</div>
            <button
              onClick={e => { e.preventDefault(); this.goNext(); }}
              onTouchStart={e => { e.preventDefault(); this.goNext(); }}
            >
              Ok!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
