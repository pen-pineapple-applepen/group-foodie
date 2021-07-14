import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import RouterContainer from './RouterContainer';

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
      <RouterContainer />
    </div>
  );
}

export default App;
