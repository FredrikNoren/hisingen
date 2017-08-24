import * as React from 'react';
import './App.css';
import { Card } from './Card';

interface CardContainerState {
  swipe: number;
}

class CardContainer extends React.Component<{}, CardContainerState> {
  state = { swipe: 0 };
  render() {
    return (
      <div className="CardContainer">
        <Card swipe={this.state.swipe} onSwipe={swipe => this.setState({ swipe })} />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="AppBackgroundOverlay" />
        <CardContainer />
      </div>
    );
  }
}

export default App;
