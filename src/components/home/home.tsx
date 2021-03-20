import * as React from 'react';
import './home.scss';

export class Home extends React.Component<{}, {}> {

  render() {
    return <div className="content">
      <header>
        <h1>New app</h1>
      </header>
      <section>
        Blast it
      </section>
      <footer>
        <a href="/">Home</a>
      </footer>
    </div>;
  }
}
