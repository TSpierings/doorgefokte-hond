import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Home } from '../home/home';
import { DogCreator } from '../dog-creator/dog-creator';
import { Printout } from '../printout/printout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/dog-creator">
          <DogCreator />
        </Route>

        <Route exact path="/printout">
          <Printout name='Kwispel' selectedParts={[1, 0, 4, 3, 2]}/>
        </Route>

        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
