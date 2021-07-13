import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';

const MainConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function MenuPage () {

  return (
    <MainConatiner>
      <div>Image</div>
      <h2>Dannys</h2>
      <div></div>
      <button>Checkout</button>
    </MainConatiner>
  )
}