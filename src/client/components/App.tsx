import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button, Form } from 'react-bulma-components';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import allActions from '../state/actions/allActions';
import Profile from './Profile';
import styled from 'styled-components';

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
      <OrangeNavbar needBackArrow={true}/>
      <Profile />
    </div>
  );
}

export default App;
