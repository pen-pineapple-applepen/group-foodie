import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
<<<<<<< HEAD
import styled from 'styled-components';
import RouterContainer from './RouterContainer';
=======
import MainLoginPage from './loginSignUpPage/mainLoginPage';
import SignUpPage from './loginSignUpPage/SignUpPage';
import styled from 'styled-components';
>>>>>>> added background image to the signup and login page, finished centering and added more styling

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
<<<<<<< HEAD
      <RouterContainer />
=======
      {/* <p>
        my name is
        {name || ''}
      </p>
      <Button color="primary" onClick={handleClick}>add Erik</Button> */}
      <OrangeNavbar needBackArrow={true}/>
      {/* <MainLoginPage /> */}
      <SignUpPage />
>>>>>>> added background image to the signup and login page, finished centering and added more styling
    </div>
  );
}

export default App;
