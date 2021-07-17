import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import mainLoginPage from './loginSignUpPage/mainLoginPage'
import SignUpPage from './loginSignUpPage/SignUpPage'
import FriendNameInputPage from './friendsView/FriendNameInputPage';
import landingPage from './LandingPage/landingPage';
import Profile from './Profile';
import FriendsList from './FriendsList';
import OrderHistory from './OrderHistory';
import MenuPage from './Menu/MenuPage';
import MenuItemPage from './Menu/MenuItemPage';
import RestaurantPage from './RestaurantsPage';
import ChatPage from './ChatPage';
import NewPaymentPage from './NewPaymentPage';
import PaymentOptions from './PaymentOptions';
import Confirmation from './Confirmation/ConfirmationPage';
import FriendMenuPage from './friendsView/FriendMenuPage';
import OrderShare from './OrderShare.jsx';

function App() {

  // these are just some test examples
  return (
    <div className="App">
      <Router>
        <div className="RouterContainer">
          <Switch>
            <Route exact path="/" component={mainLoginPage} />
            <Route exact path="/SignUp" component={SignUpPage} />
            <Route exact path="/Restaurants" component={RestaurantPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/friends" component={FriendsList} />
            <Route exact path="/history" component={OrderHistory} />
            <Route exact path="/Menu" component={MenuPage} />
            <Route exact path="/MenuItem" component={MenuItemPage} />
            <Route exact path="/LandingPage" component={landingPage} />
            <Route exact path="/Friends/:group_id/:restaurant_id" component={FriendNameInputPage} />
            <Route exact path="/ChatPage" component={ChatPage} />
            <Route exact path="/Menu/Friends/" component={FriendMenuPage} />"
            <Route exact path="/ShareOrder" component={OrderShare} />"
            <Route exact path="/Confirmation" component={Confirmation} />"
            <Route exact path="/PaymentOptions" component={PaymentOptions} />"

            <Redirect to="/" />
          </Switch>
          {/* <NewPaymentPage /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;