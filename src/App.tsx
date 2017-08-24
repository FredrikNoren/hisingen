import * as React from 'react';
import './App.css';
import { Card } from './Card';
import { WorldId, CardId, WORLDS, Cards, Option } from './Story';

interface AppState {
  world: WorldId;
  card: CardId;
  swipe: number;
  lastSelectedOption: Option;
  state: 'card' | 'next';
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    world: 'Askim',
    card: 'Fallen',
    swipe: 0,
    state: 'card',
    lastSelectedOption: { name: '', result: '', nextState: s => s }
  };
  chooseOption(option: 'left' | 'right') {
    const card = Cards[this.state.card];
    if (option === 'left') {
      this.setState({ swipe: -1, state: 'next', lastSelectedOption: card.leftOption });
    } else {
      this.setState({ swipe: 1, state: 'next', lastSelectedOption: card.rightOption });
    }
    // setTimeout(() => {
    // }, 100);
  }
  goNext() {
    const nextState = this.state.lastSelectedOption.nextState({ world: this.state.world, card: this.state.card });
    this.setState({...nextState, state: 'card', swipe: 0 });
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
    const world = WORLDS[this.state.world];
    const card = Cards[this.state.card];
    return (
      <div
        className={`App ${this.state.state === 'card' ? 'CardState' : 'NextState'}`}
        style={{ backgroundImage: `url(${world.image})` }}
      >
        <div className="AppBackgroundOverlay Overlay" />
        <div className="Content">
          <div className="CardTitle">{card.title}</div>
          <Card
            imageSrc={card.image}
            swipe={this.state.swipe}
            onSwipe={swipe => this.setState({ swipe })}
            onSwipeRelease={this.handleSwipeRelease}
          />
          <div className="Next">
            <div className="NextTitle">{this.state.lastSelectedOption.result}</div>
            <button
              onClick={e => { e.preventDefault(); this.goNext(); }}
              onTouchStart={e => { e.preventDefault(); this.goNext(); }}
            >
              Ok!
            </button>
          </div>
          <div className="Actions">
            <div className="CardLeft">◀ {card.leftOption.name}</div>
            <div className="CardRight">{card.rightOption.name} ▶</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
