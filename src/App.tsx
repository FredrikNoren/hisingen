import * as React from 'react';
import './App.css';
import { Card } from './Card';
import { STORY } from './Story';

interface AppState {
  world: string;
  card: string;
  swipe: number;
}

class App extends React.Component<{}, AppState> {
  state = { world: 'Askim', card: 'Goblin', swipe: 0 };
  render() {
    const world = STORY[this.state.world];
    const card = world.cards[this.state.card];
    return (
      <div className="App" style={{ backgroundImage: `url(${world.image})` }}>
        <div className="AppBackgroundOverlay Overlay" />
        <div className="Content">
          <div className="CardTitle">{card.title}</div>
          <Card
            imageSrc={card.image}
            swipe={this.state.swipe}
            onSwipe={swipe => this.setState({ swipe })}
          />
          <div className="Actions">
            <div className="CardLeft">{card.leftOption.name}</div>
            <div className="CardRight">{card.rightOption.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
