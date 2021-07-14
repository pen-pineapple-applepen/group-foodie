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
  align-items: center;
`;

const CheckoutButton = styled(OrangeButton)`
  border-radius: 7px;
  width: 50%;
`;

export default function MenuPage () {
  const currentItem = useAppSelector((state)=>state.currentMenuItem)
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state)=>state.allOrderItems.ordersTotal)

  function clickHandler (entry) {
    //reroute
    console.log(entry.name)
    console.log(entry.price)
    dispatch(allActions.UpdateItemName(entry.name));
    dispatch(allActions.UpdateItemPrice(entry.price));
    dispatch(allActions.UpdateItemDescription(entry.description));
    dispatch(allActions.UpdateItemId(entry.id));

  }

  //Resets Current Selected Item
  React.useEffect(()=>{
    dispatch(allActions.UpdateItemName(''));
    dispatch(allActions.UpdateItemId(0));
    dispatch(allActions.UpdateItemQuantity(0));
    dispatch(allActions.UpdateTotalPrice(0));
  },[])

  return(
    <MainConatiner>
      <img src={'Dannys_bg.png'}/>
      <h2>Dannys</h2>
      <div onClick={() => clickHandler({name:'BigTop', price: 5, description: 'BigTop Item Description', id:10})}>
        <MenuItemContainer  name={'Big Burger'} price={5}></MenuItemContainer>
      </div>
      <CheckoutButton>Checkout ${totalPrice}.00</CheckoutButton>
    </MainConatiner>
  )
}