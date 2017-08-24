import * as React from 'react';
import './Card.css';

interface CardState {
  swipe: number;
}

export class Card extends React.Component<{}, CardState> {
  state = { swipe: 0 };
  swipingStart?: number = undefined;
  root: HTMLDivElement | null = null;
  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchmove', this.handleTouchMove);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }
  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.swipingStart = e.clientX;
  }
  handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ swipe: 0 });
    this.swipingStart = undefined;
  }
  handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.swipingStart !== undefined) {
      this.setState({ swipe: e.clientX - this.swipingStart });
    }
  }
  handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.swipingStart = e.touches[0].clientX;
  }
  handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.swipingStart = undefined;
    this.setState({ swipe: 0 });
  }
  handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.swipingStart !== undefined) {
      this.setState({ swipe: e.touches[0].clientX - this.swipingStart });
    }
  }
  render() {
    const swipe = this.root ? this.state.swipe / this.root.getBoundingClientRect().width : 0;
    const style = {
      transform: `rotateZ(${swipe * 40}deg)`,
      transformOrigin: '50% 300%'
    };
    return (
      <div
        className="Card"
        ref={e => this.root = e}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        style={style}
        >
        <div className="CardOverlay"/>
        <div className="CardTitle">Wolfen</div>
      </div>
    );
  }
}
