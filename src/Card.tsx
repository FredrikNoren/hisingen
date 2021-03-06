import * as React from 'react';
import './Card.css';

interface CardProps {
  imageSrc: string;
  leftOption: string;
  rightOption: string;
  swipe: number;
  onSwipe: (swipe: number) => void;
  onSwipeRelease: () => void;
}
interface CardState {
  shine: { x: number, y: number };
}

export class Card extends React.Component<CardProps, CardState> {
  state = { shine: { x: 0, y: 0 } };
  swipingStart?: number = undefined;
  root: HTMLDivElement | null = null;
  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('deviceorientation', this.handleOrientation);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('deviceorientation', this.handleOrientation);
  }
  handleOrientation = (e: DeviceOrientationEvent) => {
    this.setState({ shine: { x: -(e.gamma || 0), y: -(e.beta || 0) } });
  }
  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.swipingStart = e.clientX;
  }
  handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.swipingStart !== undefined) {
      this.swipingStart = undefined;
      this.props.onSwipeRelease();
    }
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
    if (this.swipingStart !== undefined) {
      this.swipingStart = undefined;
      this.props.onSwipeRelease();
    }
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
      transform: `rotateZ(${this.props.swipe * 30}deg)`,
      transformOrigin: '50% 300%',
      backgroundImage: `url(${this.props.imageSrc})`
    };
    const shineStyle = {
      left: (-20 + this.state.shine.x) + 'vmin',
      top: (30 + this.state.shine.y) + 'vmin',
      display: 'block'
    };
    return (
      <div
        className="Card"
        ref={e => this.root = e}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        style={style}
      >
        <div className="CardOverlay Overlay"/>
        <div className="CardAcceptOverlay Overlay" style={{ opacity: Math.max(0, this.props.swipe) }}/>
        <div className="CardRejectOverlay Overlay" style={{ opacity: Math.max(0, -this.props.swipe) }}/>
        <div
          className="CardAcceptText"
          style={{
            opacity: Math.min(Math.abs(this.props.swipe) * 10, 0.95),
            textAlign: this.props.swipe < 0 ? 'left' : 'right'
          }}
        >
          {this.props.swipe < 0 ? this.props.leftOption : this.props.rightOption}
        </div>
        <div className="CardShineContainer Overlay">
          <div className="CardShine" style={shineStyle} />
        </div>
      </div>
    );
  }
}
