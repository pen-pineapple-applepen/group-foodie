import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button, Form } from 'react-bulma-components';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';

const MobileDiv = styled.div`

`

function App() {

// these are just some test examples
  return (
    <div className="App">
      <OrangeNavbar needBackArrow={true}/>
      <OrangeButton>
        orange
      </OrangeButton>
      <ProfileImage src='https://media.allure.com/photos/5f5facef647ada9e6a2d1ba8/master/pass/facial%20self-tanner.jpg'/>

    </div>
  );
}

export default App;
