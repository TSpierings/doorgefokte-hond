import * as React from 'react';
import background from '../../assets/background.png';
import { phases } from '../../interfaces/phases';
import { DogNavigator } from '../dog-navigator/dog-navigator';
import { DogVisualization } from '../dog-visualization/dog-visualization';
import { Printout } from '../printout/printout';
import './dog-creator.scss';

interface DogCreatorState {
  phase: number,
  selectedPart: Array<number>,
  name: string
}

export class DogCreator extends React.Component<{}, DogCreatorState> {
  private printRef: React.RefObject<any>;
  
  constructor(props: any) {
    super(props);

    this.printRef = React.createRef();

    this.state = {
      phase: 0,
      selectedPart: [0, 0, 0, 0, 0],
      name: 'Kwispel'
    };
  }

  private previousPhase() {
    if (this.state.phase === 0) return;

    this.setState({
      phase: this.state.phase - 1
    });
  }

  private nextPhase() {
    if (this.state.phase === phases.length - 1) {
      return;
    };

    this.setState({
      phase: this.state.phase + 1
    });
  }

  private selectPart(index: number) {
    const tempPart = this.state.selectedPart
    tempPart[this.state.phase] = index;

    this.setState({
      selectedPart: [...tempPart]
    });
  }

  render() {
    return <div className="dog-creator" style={{
      backgroundImage: `url(${background})`
    }}>

      <div className={`creator ${phases[this.state.phase]}`}>
        {this.state.phase < 5 ? (
          <>
            <span>{phases[this.state.phase]}</span>
            <DogVisualization
              phase={this.state.phase}
              selectedParts={this.state.selectedPart}
            />
          </>
        ) : (
          <>
            <span>{phases[this.state.phase]}</span>
            <input type='text' spellCheck={false} maxLength={10} value={this.state.name} autoFocus onChange={(el) => this.setState({ name: el.target.value })}/>
          </>
        )}

      </div>

      <DogNavigator
        phase={this.state.phase}
        selected={this.state.selectedPart[this.state.phase]}
        onBack={() => this.previousPhase()}
        onForward={() => this.nextPhase()}
        onSelect={(index: number) => this.selectPart(index)}
        componentToPrint={this.printRef}
      />

      <div style={{display: 'none'}}>
        <Printout ref={this.printRef} name={this.state.name} selectedParts={this.state.selectedPart} />
      </div>
    </div>
  }
}