import * as React from 'react';
import './dog-creator.scss';
import background from '../../assets/background.png'
import play from '../../assets/play.png'

export class DogCreator extends React.Component<{}, {}> {

  render() {
    return  <div className="content" style={{
      backgroundImage: `url(${background})`
    }}>

    </div>
  }
}
