import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import MenuItemContainer from './MenuItemContainer.jsx';
import {OrangeButton} from '../styles/shared.tsx';

const MainConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CheckoutButton = styled(OrangeButton)`
  border-radius: 7px;
`;

export default function MenuPage () {

  return(
    <MainConatiner>
      <img src={'Dannys_bg.png'}/>
      <h2>Dannys</h2>
      <MenuItemContainer></MenuItemContainer>
      <CheckoutButton>Checkout $0.00</CheckoutButton>
    </MainConatiner>
  )
}