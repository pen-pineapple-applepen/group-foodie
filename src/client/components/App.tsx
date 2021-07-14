import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import Profile from './Profile';
import styled from 'styled-components';
import RouterContainer from './RouterContainer';

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
      <RouterContainer />
      <Profile />
    </MobileDiv>
  );
}

export default App;
