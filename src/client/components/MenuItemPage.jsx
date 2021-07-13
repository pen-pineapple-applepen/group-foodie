import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import {OrangeButton} from '../styles/shared.tsx';
import MenuItemIncrementor from './MenuItemIncrementor.jsx';

const MainConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckoutButton = styled(OrangeButton)`
  border-radius: 7px;
  width: 50%;
`;

export default function MenuItemPage () {

  return(
    <MainConatiner>
      <img src='Dannys_bg.png'/>
      <h2>Item Name</h2>
      <p>Item description</p>
      <MenuItemIncrementor/>
      <CheckoutButton>Add to order{`(${0})`} $0.00</CheckoutButton>
    </MainConatiner>
  )
}