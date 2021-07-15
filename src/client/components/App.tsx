import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button, Form } from 'react-bulma-components';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import allActions from '../state/actions/allActions';
import OrderShare from './Order_Share.jsx';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import mainLoginPage from './loginSignUpPage/mainLoginPage'
import SignUpPage from './loginSignUpPage/SignUpPage'
import landingPage from './landingPage/landingPage'
import Testing from './Testing';
import Testing2 from './Testing2';
import Testing4 from './Testing4';
import MenuPage from './MenuPage';
import MenuItemPage from './MenuItemPage';

function App() {

  // these are just some test examples
  return (
    <div className="App">
      <OrangeNavbar needBackArrow={true}/>
      <OrangeButton>
        Orange Button
      </OrangeButton>
      <ProfileImage src='https://media.allure.com/photos/5f5facef647ada9e6a2d1ba8/master/pass/facial%20self-tanner.jpg'/>
      <Router>
        <div className="RouterContainer">
          <Switch>
            <Route exact path="/" component={OrderShare} />
            <Route exact path="/SignUp" component={SignUpPage} />
            <Route exact path="/Menu" component={MenuPage} />
            <Route exact path="/MenuItem" component={MenuItemPage} />
            <Route exact path="/LandingPage" component={landingPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
