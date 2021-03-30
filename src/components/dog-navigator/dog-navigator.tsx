import * as React from 'react';
import './dog-navigator.scss';
import play from '../../assets/play.png'
import backward from '../../assets/backward.png'
import { Dogs } from '../../interfaces/dogs';
import { headIcons } from '../../interfaces/heads';
import { iconsByPhase } from '../../interfaces/phases';

interface DogNavigatorProps {
  phase: number,
  selected: number,
  onForward: Function,
  onBack: Function,
  onSelect: Function
}

export class DogNavigator extends React.Component<DogNavigatorProps, {}> {
  private selection = [0, 1, 2, 3, 4];

  private select(index: number) {
    this.props.onSelect(index);
  }

  render() {
    return <div className="dog-navigator">
      <button style={{ backgroundImage: `url(${backward})` }} onClick={() => this.props.onBack()} />

      {this.selection.map(item => (
        <div key={item} className={`part ${this.props.selected == item ? 'selected' : ''}`} onClick={() => this.select(item)}>
          <div><img src={iconsByPhase[this.props.phase][item]}/></div>
          <span>{Dogs[item]}</span>
        </div>
      ))}

      <button style={{ backgroundImage: `url(${play})` }} onClick={() => this.props.onForward()} />
    </div>
  }
}
