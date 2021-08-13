import * as React from 'react';
import './home.scss';
import background from '../../assets/background.png'
import play from '../../assets/play.png'

export class Home extends React.Component<{}, {}> {

  private listener = (event: KeyboardEvent) => {
    switch(event.key) {
      case 'Enter':
      case 'ArrowRight':
        window.location.href = 'dog-creator';
        break;
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.listener);
  }

  render() {
    return <div className="home" style={{
      backgroundImage: `url(${background})`
    }}>
      <div>Druk op de groene knop om jouw perfecte hond te creëren.</div>
      <a href='dog-creator' style={{ backgroundImage: `url(${play})` }}>next</a>
    </div>;
  }
}
