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
} from 'react-router-dom';
import mainLoginPage from './loginSignUpPage/mainLoginPage'
import SignUpPage from './loginSignUpPage/SignUpPage'
import Testing from './Testing';
import Testing2 from './Testing2';
import Testing4 from './Testing4';
import Profile from './Profile';
import FriendsList from './FriendsList';

const MobileDiv = styled.div`
  max-width: 414px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {

  // these are just some test examples
  return (
    <MobileDiv>
      <Router>
        <div className="RouterContainer">
          <Switch>
            {/* Chris: route to test my component using home page */}
            {/* <Route exact path="/" component={Profile} /> */}

            <Route exact path="/" component={mainLoginPage} />
            <Route exact path="/SignUp" component={SignUpPage} />
            <Route exact path="/testing2" component={Testing2} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/friends" component={FriendsList} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </MobileDiv>
  );
}

export default App;
