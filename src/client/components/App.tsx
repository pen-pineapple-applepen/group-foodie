import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button, Form } from 'react-bulma-components';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import allActions from '../state/actions/allActions';
<<<<<<< HEAD
import MainLoginPage from './loginSignUpPage/mainLoginPage';
import SignUpPage from './loginSignUpPage/SignUpPage';
=======
import styled from 'styled-components';
>>>>>>> 2ede5c1f78c205110acca4b599194f45f1356ebb

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
<<<<<<< HEAD
      {/* <p>
        my name is
        {name || ''}
      </p>
      <Button color="primary" onClick={handleClick}>add Erik</Button> */}
      {/* <MainLoginPage /> */}
      <SignUpPage />
=======
      <OrangeNavbar needBackArrow={true}/>
>>>>>>> 2ede5c1f78c205110acca4b599194f45f1356ebb
    </div>
  );
}

export default App;
