import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button, Form } from 'react-bulma-components';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import MenuItemPage from './MenuItemPage';

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
      <OrangeNavbar needBackArrow={true}/>
    </div>
  );
}

export default App;
