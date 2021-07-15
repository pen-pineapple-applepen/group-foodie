import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import MainLoginPage from './loginSignUpPage/mainLoginPage';
import SignUpPage from './loginSignUpPage/SignUpPage';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import mainLoginPage from './loginSignUpPage/mainLoginPage'
import landingPage from './LandingPage/landingPage';
import Testing from './Testing';
import Testing2 from './Testing2';
import Testing4 from './Testing4';
import Profile from './Profile';
import FriendsList from './FriendsList';
import OrderHistory from './OrderHistory';
import MenuPage from './MenuPage';
import MenuItemPage from './MenuItemPage';
import ChatPage from './ChatPage';


function App() {

  // these are just some test examples
  return (
    <div className="App">
      <Router>
        <div className="RouterContainer">
          <Switch>
            <Route exact path="/" component={mainLoginPage} />
            <Route exact path="/SignUp" component={SignUpPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/friends" component={FriendsList} />
            <Route exact path="/history" component={OrderHistory} />
            <Route exact path="/Menu" component={MenuPage} />
            <Route exact path="/MenuItem" component={MenuItemPage} />
            <Route exact path="/LandingPage" component={landingPage} />
            <Route exact path="/ChatPage" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
