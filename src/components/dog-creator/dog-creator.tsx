import * as React from 'react';
import './dog-creator.scss';
import background from '../../assets/background.png'
import { DogNavigator } from '../dog-navigator/dog-navigator';
import { phases } from '../../interfaces/phases';

interface DogCreatorState {
  phase: number,
  selectedPart: Array<number>
}

export class DogCreator extends React.Component<{}, DogCreatorState> {

  constructor(props: any) {
    super(props);

    this.state = {
      phase: 0,
      selectedPart: [0, 0, 0, 0, 0]
    };
  }

  private previousPhase() {
    if (this.state.phase == 0) return;

    this.setState({
      phase: this.state.phase - 1
    });
  }

  private nextPhase() {
    if (this.state.phase == phases.length - 1) return;

    this.setState({
      phase: this.state.phase + 1
    });
  }

  private selectPart(index: number) {
    this.state.selectedPart[this.state.phase] = index;
    
    this.setState({
      selectedPart: [...this.state.selectedPart]
    });
  }

  render() {
    return <div className="dog-creator" style={{
      backgroundImage: `url(${background})`
    }}>

      <div className="creator">
        <span>{phases[this.state.phase]}</span>
        <div>stuff</div>
      </div>

      <DogNavigator
        phase={this.state.phase}
        selected={this.state.selectedPart[this.state.phase]}
        onBack={() => this.previousPhase()}
        onForward={() => this.nextPhase()}
        onSelect={(index: number) => this.selectPart(index)}
      />
    </div>
  }
}
