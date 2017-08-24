import * as React from 'react';
import './Card.css';

interface CardProps {
  swipe: number;
  onSwipe: (swipe: number) => void;
}

export class Card extends React.Component<CardProps, {}> {
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
    this.swipingStart = undefined;
    this.props.onSwipe(0);
  }
  handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.swipingStart !== undefined && this.root) {
      this.props.onSwipe((e.clientX - this.swipingStart) / this.root.getBoundingClientRect().width);
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
    this.props.onSwipe(0);
  }
  handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.swipingStart !== undefined && this.root) {
      this.props.onSwipe((e.touches[0].clientX - this.swipingStart) / this.root.getBoundingClientRect().width);
    }
  }
  render() {
    const style = {
      transform: `rotateZ(${this.props.swipe * 40}deg)`,
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
