import * as React from 'react';
import './home.scss';
import background from '../../assets/background.png'
import play from '../../assets/play.png'

export class Home extends React.Component<{}, {}> {

  render() {
    return <div className="home" style={{
      backgroundImage: `url(${background})`
    }}>
      <div>Druk op de groene knop en probeer jouw toekomstige hond zo gezond mogelijk te maken.</div>
      <a href='dog-creator' style={{ backgroundImage: `url(${play})` }}>next</a>
    </div>;
  }
}
