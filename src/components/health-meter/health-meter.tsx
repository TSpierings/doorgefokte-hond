import React from 'react';
import './health-meter.scss';
import i20 from '../../assets/health/20.svg';
import i40 from '../../assets/health/40.svg';
import i60 from '../../assets/health/60.svg';
import i80 from '../../assets/health/80.svg';
import i100 from '../../assets/health/100.svg';
import { partsByPhase } from '../../interfaces/phases';

const healthLevels = [
  i20,
  i40,
  i60,
  i80,
  i100
];
interface HealthMeterProps {
  selectedParts: Array<number>
}

export class HealthMeter extends React.Component<HealthMeterProps, {}> {
  private findOccurences() {
    let counts = [];
    for(let i = 0; i < partsByPhase.length; i++) {
      counts.push(this.props.selectedParts.filter(part => part === i).length);
    }

    return counts.sort().reverse();
  }

  render() {
    const health = this.findOccurences()[0];
    
    return <div className='health-meter'>
      <img alt='gezondheid' src={healthLevels[health - 1]} />
      <span>Gezondheid</span>
    </div>
  }
}
