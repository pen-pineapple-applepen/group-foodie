import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Testing from './Testing';
import Testing2 from './Testing2';
import Testing4 from './Testing4';
import Profile from './Profile';
import FriendsList from './FriendsList';

function RouterContainer() {
  return (
    <Router>
    <div className="RouterContainer">
      <Switch>
          <Route exact path="/home" component={Testing} />
          <Route exact path="/testing2" component={Testing2} />
          <Route exact path="/testing4" component={Testing4} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/friends" component={FriendsList} />
          <Redirect to="/home" />
      </Switch>
    </div>
  </Router>
  )
}


export default RouterContainer;