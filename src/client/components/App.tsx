import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import MainLoginPage from './loginSignUpPage/mainLoginPage';
import SignUpPage from './loginSignUpPage/SignUpPage';

function App() {
  const { addName } = allActions;
  const name = useAppSelector((state) => state.names);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addName('Erik'))
  }

  return (
    <div className="App">
      {/* <p>
        my name is
        {name || ''}
      </p>
      <Button color="primary" onClick={handleClick}>add Erik</Button> */}
      {/* <MainLoginPage /> */}
      <SignUpPage />
    </div>
  );
}

export default App;
