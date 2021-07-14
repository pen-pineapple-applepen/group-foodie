import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import RouterContainer from './RouterContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import mainLoginPage from './loginSignUpPage/mainLoginPage'
import SignUpPage from './loginSignUpPage/SignUpPage'
import Testing from './Testing';
import Testing2 from './Testing2';
import Testing4 from './Testing4';


function App() {

  // these are just some test examples
  return (
    <div className="App">
      <Router>
        <div className="RouterContainer">
          <Switch>
            <Route exact path="/" component={mainLoginPage} />
            <Route exact path="/SignUp" component={SignUpPage} />
            <Route exact path="/testing4" component={Testing4} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
