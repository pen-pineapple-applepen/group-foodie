import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ReactElement } from 'react'
import CountDownTimer from './CountDownTimer';
import CurrentOrderList from "./CurrentOrderList";
import { OrangeNavbar, HeaderImage } from '../../styles/shared';
import styled from 'styled-components';

interface ConfirmationProps {

}

export interface Order {
  id: number,
  userId: number,
  itemName: string,
  quantity: number,
  price: string,
  date: string,
  food_id: number,
  group_id: number,
  restaurant_id: number,
}

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopContainer = styled.div`
  padding-top: 22px;
  width: 90%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  line-height: 44px;
`
const ThankYouMessage = styled.h1`
  font-size: 36px;
  text-align: center;
`


function Confirmation({}: ConfirmationProps): ReactElement {
  const currentOrders = useAppSelector(state => state.allOrderItems.orders)

  return (
    <ConfirmationContainer>
      <OrangeNavbar/>
      <HeaderImage src ='/Dannys_bg.png'/>

      <TopContainer>
        <ThankYouMessage>
          Thank you for starting a share order!
        </ThankYouMessage>
      </TopContainer>

      <CountDownTimer/>
      <CurrentOrderList
        currentOrders={currentOrders}
      />
    </ConfirmationContainer>
  )
}

export default Confirmation
