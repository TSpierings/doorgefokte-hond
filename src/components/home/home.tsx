import * as React from 'react';
import './home.scss';
import background from '../../assets/background.png'
import play from '../../assets/play.png'

export class Home extends React.Component<{}, {}> {

  render() {
    return <div className="home" style={{
      backgroundImage: `url(${background})`
    }}>
      <div>Druk op de groene knop om jouw perfecte hond te creëren</div>
      <a style={{backgroundImage: `url(${play})`}} href='dog-creator'/>
    </div>;
  }
}
