import * as React from 'react';
import './dog-creator.scss';
import background from '../../assets/background.png'
import { DogNavigator } from '../dog-navigator/dog-navigator';
import { phases } from '../../interfaces/phases';
import { DogVisualization } from '../dog-visualization/dog-visualization';

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
    if (this.state.phase === 0) return;

    this.setState({
      phase: this.state.phase - 1
    });
  }

  private nextPhase() {
    if (this.state.phase === phases.length - 1) {
      console.log(`Print dog with properties:`);
      console.log(this.state.selectedPart);
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
          <span>Kies een vacht en druk op de groene knop om de hond te creëeren.</span>
        )}
        
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
