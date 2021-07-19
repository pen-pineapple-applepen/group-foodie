import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ReactElement } from 'react'
import CountDownTimer from '../Confirmation/CountDownTimer';
import CurrentOrderList from "../Confirmation/CurrentOrderList";
import { OrangeNavbar, HeaderImage, OrangeButton } from '../../styles/shared';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface ConfirmationProps {

}

export interface Order {
  id: number,
  user_id: number,
  food: string,
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
  padding-bottom: 10px;
`
const FlexEndButton = styled(OrangeButton)`
  width: 70vw;
  color: white;
`
const WhatYourFriendsOrdered = styled.h3`
  font-size: 13px;
  top: 15px;
  padding-bottom: -15px;
  font-style: italic;
`


function FriendInitialConfirmation({}: ConfirmationProps): ReactElement {
  const currentOrders = useAppSelector(state => state.allOrderItems.orders)
  const [ currentGroupOrders, setCurrentGroupOrders ] = useState([])
  const currentGroupId = useAppSelector(state => state.currentGroup)
  const currentRestaurant = useAppSelector(state => state.currentRestaurant)

  const history = useHistory();

  const handleStartOrder = () => {
    history.push('/Menu/Friends')
  }

  useEffect( async () => {
    const currentOrdersData = await axios.get(`/api/orders/${currentGroupId}/group`)
    setCurrentGroupOrders(currentOrdersData.data)
    console.log(currentOrdersData.data)
  }, [])

  return (
    <ConfirmationContainer>
      <OrangeNavbar/>
      <HeaderImage src ={currentRestaurant.restaurant_id === 1 ? '/Dannys_bg.png' : '/Bowl.png'}/>

      <TopContainer>
        <ThankYouMessage>
          Share Order for Danny's
        </ThankYouMessage>
      </TopContainer>
      <span>Time left to put in your order:</span>
      <CountDownTimer/>

      <WhatYourFriendsOrdered>
        what your friends have ordered so far:
      </WhatYourFriendsOrdered>

      <CurrentOrderList currentOrders={currentGroupOrders}/>

      <FlexEndButton onClick={() => history.push('/Chat/ChatPage')}>
        Chat
      </FlexEndButton>

      <FlexEndButton onClick={handleStartOrder}>
        Start Your Order
      </FlexEndButton>
    </ConfirmationContainer>
  )
}

export default FriendInitialConfirmation;
