import React from 'react';
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

function RouterContainer() {
  return (
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
  )
}


export default RouterContainer;