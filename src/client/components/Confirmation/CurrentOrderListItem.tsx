import * as React from 'react';
import { useState, useEffect } from 'react';
import { ReactElement } from 'react'
import CountDownTimer from './CountDownTimer';
import { Order } from './ConfirmationPage';
import { ProfileImage } from '../../styles/shared';
import styled from 'styled-components';
import axios from 'axios';

const testOrder = {
  "id": 1,
  "user_id": 5,
  "food": "PIZZA",
  "quantity": 3,
  "price": "3.50",
  "date": "12/20/2020",
  "food_id": 423,
  "group_id": 1,
  "restaurant_id": 32
}

interface CurrentOrderListItemProps {
  userId: number,
  food: string,
  quantity: number,
  price: string,
}

interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  username: string,
  password: string,
  guest: boolean,
}

const ListItemContainer = styled.div`
  width: 85vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 15px;
`
const NameOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  width: 50%;
`
const Name = styled.h3`
  font-weight: bold;
  display: block;
`
const FoodAndOption = styled.div`
  font-size: 10px;
  width: 100%;
`
const Price = styled.div`
  width: 30%;
  padding-left: 15px;
`

function CurrentOrderListItem({userId, food, quantity, price}: CurrentOrderListItemProps): ReactElement {
  const [ ordererName, setOrdererName ] = useState('');

  useEffect(async () => {
    const userData = await axios.get(`/api/users/${userId}`)
    const user: User = userData.data;

    setOrdererName(user.first_name)
  }, [])

  return (
    <ListItemContainer>
      <ProfileImage src="/sleepyNick.png"/>

      <NameOrderContainer>
        <div>
          <Name>
            {ordererName}
          </Name>
        </div>

        <FoodAndOption>
          {quantity} {food}
        </FoodAndOption>
      </NameOrderContainer>

      <Price>
        ${price}
      </Price>

    </ListItemContainer>
  )
}

export default CurrentOrderListItem