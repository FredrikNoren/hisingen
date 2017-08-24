import * as React from 'react';
import './Card.css';

interface CardState {
  swipe: number;
}

export class Card extends React.Component<{}, CardState> {
  state = { swipe: 0 };
  startMousePosition?: { x: number, y: number } = undefined;
  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.startMousePosition = { x: e.clientX, y: e.clientY };
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({ swipe: 0 });
  }
  handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.startMousePosition) {
      this.setState({ swipe: e.clientX - this.startMousePosition.x });
    }
  }
  render() {
    const style = {
      transform: `rotateZ(${this.state.swipe / 30}deg)`,
      transformOrigin: '50% 100vw'
    };
    return (
      <div className="Card" onMouseDown={this.handleMouseDown} style={style}>
        <div className="CardOverlay"/>
        <div className="CardTitle">Wolfen</div>
        {this.state.swipe}
      </div>
    );
  }
}
