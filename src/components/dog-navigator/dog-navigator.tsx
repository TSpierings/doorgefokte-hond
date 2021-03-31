import * as React from 'react';
import './dog-navigator.scss';
import play from '../../assets/play.png'
import backward from '../../assets/backward.png'
import { dogs } from '../../interfaces/dogs';
import { iconsByPhase } from '../../interfaces/phases';

interface DogNavigatorProps {
  phase: number,
  selected: number,
  onForward: Function,
  onBack: Function,
  onSelect: Function
}

export class DogNavigator extends React.Component<DogNavigatorProps, {}> {

  private select(index: number) {
    this.props.onSelect(index);
  }

  render() {
    return <div className="dog-navigator">
      <button style={{ backgroundImage: `url(${backward})` }} onClick={() => this.props.onBack()} />

      {dogs.map((item, index) => (
        <div key={item} className={`part ${this.props.selected == index ? 'selected' : ''}`} onClick={() => this.select(index)}>
          <div><img src={iconsByPhase[this.props.phase][index]}/></div>
          <span>{item}</span>
        </div>
      ))}

      <button style={{ backgroundImage: `url(${play})` }} onClick={() => this.props.onForward()} />
    </div>
  }
}
