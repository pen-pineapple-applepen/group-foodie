import * as React from 'react';
import { useState, useEffect } from 'react';
import { ReactElement } from 'react'
import CountDownTimer from './CountDownTimer';
import CurrentOrderListItem from "./CurrentOrderListItem";
import { Order } from './ConfirmationPage';
import styled from 'styled-components';

interface CurrentOrderListProps {
  currentOrders: Order[]
}

const OrderListContainer = styled.div`
  padding-top: 35px;
`


function CurrentOrderList({currentOrders}: CurrentOrderListProps): ReactElement {

  const orderList = currentOrders.map(order => (
    <CurrentOrderListItem
      key={order.id}
      userId={order.user_id}
      food={order.food}
      quantity={order.quantity}
      price={order.price}
    />
  ))

  return (
    <OrderListContainer>
      {orderList}
    </OrderListContainer>
  )
}

export default CurrentOrderList