import * as React from 'react';
import './App.css';
import { Card } from './Card';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="AppBackgroundOverlay" />
        <div className="CardContainer">
          <Card />
        </div>
      </div>
    );
  }
}

export default App;
