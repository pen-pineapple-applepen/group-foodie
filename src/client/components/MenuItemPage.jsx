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
  const currentOrder = useAppSelector((state)=>state.currentMenuItem)
  const item = useAppSelector((state)=>state.currentItemQuantityPrice)
  const dispatch = useAppDispatch();
  const totalPrice = item.price*item.count;

  function clickHandler () {
    dispatch(allActions.UpdateTotalPrice(totalPrice));
    dispatch(allActions.UpdateItemQuantity(item.count));
    dispatch(allActions.addItemToOrders(currentOrder));
    dispatch(allActions.addToPriceTotal(totalPrice));
    //add user id?
  }

  return(
    <MainConatiner>
      <img src='Dannys_bg.png'/>
      <h2>{currentOrder.itemName}</h2>
      <p>{item.description}</p>
      <p>${item.price}.00</p>
      <MenuItemIncrementor/>
      <CheckoutButton onClick={()=> clickHandler()}>Add to order{`(${item.count})`} ${totalPrice}.00</CheckoutButton>
    </MainConatiner>
  )
}