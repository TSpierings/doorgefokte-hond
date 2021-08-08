import * as React from 'react';
import './dog-navigator.scss';
import play from '../../assets/play.png'
import backward from '../../assets/backward.png'
import { dogs } from '../../interfaces/dogs';
import { iconsByPhase } from '../../interfaces/phases';
import ReactToPrint from 'react-to-print';

interface DogNavigatorProps {
  phase: number,
  selected: number,
  onForward: Function,
  onBack: Function,
  onSelect: Function,
  componentToPrint: React.RefObject<any>
}

export class DogNavigator extends React.Component<DogNavigatorProps, {}> {
  private buttonRef: React.RefObject<HTMLButtonElement>;

  constructor(props: DogNavigatorProps) {
    super(props);

    this.buttonRef = React.createRef();
  }

  private listener = (event: KeyboardEvent) => {
    console.log(event);
    switch(event.key) {
      case 'ArrowLeft':
        if (this.props.phase === 0) {
          window.location.href = 'home';
        }
        this.props.onBack();
        break;
      case 'ArrowRight':
        if (this.props.phase === 5) {
          this.buttonRef.current?.click();
        }
        this.props.onForward();
        break;
      case ',':
        if (this.props.selected > 0) {
          this.select(this.props.selected - 1);
        }
        break;
      case '.':
        if (this.props.selected < 4) {
          this.select(this.props.selected + 1);
        }
        break;
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.listener);
  }

  private select(index: number) {
    this.props.onSelect(index);
  }

  render() {
    return <div className="dog-navigator">
      <button style={{ backgroundImage: `url(${backward})` }} onClick={() => this.props.onBack()} />

      {this.props.phase < 5 && dogs.map((item, index) => (
        <div key={item} className={`part ${this.props.selected === index ? 'selected' : ''}`} onClick={() => this.select(index)}>
          <div><img alt='' src={iconsByPhase[this.props.phase][index]} /></div>
          <span>{item}</span>
        </div>
      ))}

      {this.props.phase === 5 && (
        <>
          <div className='info'>
            <span>Druk op de groene knop om je hond te creëren</span>
          </div>

          <ReactToPrint
            trigger={() => <button ref={this.buttonRef} style={{ backgroundImage: `url(${play})` }} onClick={() => this.props.onForward()} />}
            content={() => this.props.componentToPrint!!.current}
          />
        </>
      )}

      {this.props.phase < 5 && <button style={{ backgroundImage: `url(${play})` }} onClick={() => this.props.onForward()} />}
    </div>
  }
}
