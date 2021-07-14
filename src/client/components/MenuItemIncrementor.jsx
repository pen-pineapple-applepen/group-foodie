import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import {OrangeButton} from '../styles/shared.tsx';

const CirleButton = styled(OrangeButton)`
  border-radius: 31.5px;
  opacity: 0.5;
`;

const MainConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function MenuItemIncrementor () {
  const item = useAppSelector((state)=>state.currentItemQuantityPrice)
  const dispatch = useAppDispatch();


  return(
    <MainConatiner>
      <CirleButton onClick={()=>{dispatch(allActions.subtractItem())}}>-</CirleButton>
      <div>{item.count}</div>
      <CirleButton onClick={()=>{dispatch(allActions.addItem())}}>+</CirleButton>
    </MainConatiner>
  )
}