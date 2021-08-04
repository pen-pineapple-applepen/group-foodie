import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';
import styled from 'styled-components';
import {OrangeButton} from '../../styles/shared.tsx';

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
  const count = useAppSelector((state)=>state.currentItemQuantityPrice.count)
  const dispatch = useAppDispatch();

  function subtractHandler () {
    dispatch(allActions.subtractItem())
    dispatch(allActions.UpdateItemQuantity(count-1));
  }

  function addHandler () {
    dispatch(allActions.addItem())
    dispatch(allActions.UpdateItemQuantity(count+1));
  }

  return(
    <MainConatiner>
      <CirleButton onClick={()=>subtractHandler()}>-</CirleButton>
      <div>{count}</div>
      <CirleButton onClick={()=>addHandler()}>+</CirleButton>
    </MainConatiner>
  )
}