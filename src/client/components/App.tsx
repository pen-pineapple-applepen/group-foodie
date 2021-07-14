import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button, Form } from 'react-bulma-components';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import allActions from '../state/actions/allActions';
import MainLoginPage from './loginSignUpPage/mainLoginPage';
import SignUpPage from './loginSignUpPage/SignUpPage';
import styled from 'styled-components';

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
      {/* <p>
        my name is
        {name || ''}
      </p>
      <Button color="primary" onClick={handleClick}>add Erik</Button> */}
      <OrangeNavbar needBackArrow={true}/>
      <MainLoginPage />
      {/* <SignUpPage /> */}
    </div>
  );
}

export default App;
