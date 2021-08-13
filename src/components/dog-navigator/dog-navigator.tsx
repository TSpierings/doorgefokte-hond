import * as React from 'react';
import './dog-navigator.scss';
import play from '../../assets/play.png'
import backward from '../../assets/backward.png'
import { dogs } from '../../interfaces/dogs';
import { iconsByPhase } from '../../interfaces/phases';
import ReactToPrint from 'react-to-print';
import browseSound from '../../assets/sounds/browse.mp3';
import printSound from '../../assets/sounds/print.wav';
import { PhaseSounds } from '../../interfaces/sounds';

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
  private browseSoundEffect: HTMLAudioElement;
  private fooSound: HTMLAudioElement;

  constructor(props: DogNavigatorProps) {
    super(props);

    this.buttonRef = React.createRef();
    this.browseSoundEffect = new Audio(browseSound);
    this.fooSound = new Audio();
  }

  private listener = (event: KeyboardEvent) => {
    switch(event.key) {
      case 'ArrowLeft':
        if (this.props.phase === 0) {
          window.location.href = 'home';
        }
        this.fooSound.src = PhaseSounds[this.props.phase];
        this.fooSound.play();
        this.props.onBack();
        break;
      case 'ArrowRight':
      case 'Enter':
        if (this.props.phase === 5) {
          this.buttonRef.current?.click();
        }
        this.fooSound.src = PhaseSounds[this.props.phase];
        this.fooSound.play();
        this.props.onForward();        
        break;
      case ',':
        if (this.props.selected > 0) {
          this.select(this.props.selected - 1);
          this.playBrowseSound()
        }
        break;
      case '.':
        if (this.props.selected < 4) {
          this.select(this.props.selected + 1);
          this.playBrowseSound()
        }
        break;
    }
  };

  playBrowseSound() {
    this.browseSoundEffect.pause();
    this.browseSoundEffect.currentTime = 0;
    this.browseSoundEffect.play();
  }

  playPrintSound() {
    this.fooSound.src = printSound;
    this.fooSound.play();
  }

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
            onBeforePrint={() => this.playPrintSound()}
            onAfterPrint={() => window.location.href = 'home'}
            trigger={() => <button ref={this.buttonRef} style={{ backgroundImage: `url(${play})` }} onClick={() => this.props.onForward()} />}
            content={() => this.props.componentToPrint!!.current}
          />
        </>
      )}

      {this.props.phase < 5 && <button style={{ backgroundImage: `url(${play})` }} onClick={() => this.props.onForward()} />}
    </div>
  }
}
