import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';
import styled from 'styled-components';
import {OrangeButton, OrangeNavbar, HeaderImage } from '../../styles/shared.tsx';
import MenuItemIncrementor from './MenuItemIncrementor.jsx';
import { useHistory } from 'react-router-dom';

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

const StyledDescription = styled.p`
  margin: 10%;
  font-family: Helvetica-light;
  font-size: 16px;
  text-align: center;
`;

const FoodName = styled.h2`
  font-family: Helvetica;
  font-size: 24px;
  text-align: center;
`;

export default function MenuItemPage () {
  const currentOrder = useAppSelector((state)=>state.currentMenuItem)
  const item = useAppSelector((state)=>state.currentItemQuantityPrice)
  const dispatch = useAppDispatch();
  const totalPrice = item.price*item.count;
  const history = useHistory();


  function clickHandler () {
    if(item.count===0){
      return
    } else {
      dispatch(allActions.addToPriceTotal(totalPrice));//
      dispatch(allActions.addItemToOrders(currentOrder));
      history.push("/Menu");
    }
  }

  React.useEffect(()=>{
    dispatch(allActions.UpdateTotalPrice(totalPrice.toFixed(2)));
  },[item])


  return(
    <MainConatiner>
      <OrangeNavbar needBackArrow={true}/>
      <HeaderImage src ={currentOrder.restaurant_id === 1 ? '/Dannys_bg.png' : '/Bowl.png'}/>
      {/* <img src='Dannys_bg.png'/> */}
      <FoodName>{currentOrder.food}</FoodName>
      <StyledDescription>{item.description}</StyledDescription>
      <p>${item.price}</p>
      <MenuItemIncrementor/>
      <CheckoutButton onClick={()=> clickHandler()}>Add to order{`(${item.count})`} ${totalPrice.toFixed(2)}</CheckoutButton>
    </MainConatiner>
  )
}