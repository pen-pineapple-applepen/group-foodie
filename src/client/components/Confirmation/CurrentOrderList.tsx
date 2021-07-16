import * as React from 'react';
import { useState, useEffect } from 'react';
import { ReactElement } from 'react'
import CountDownTimer from './CountDownTimer';
import CurrentOrderListItem from "./CurrentOrderListItem";
import { Order } from './ConfirmationPage';

interface CurrentOrderListProps {
  currentOrders: Order[]
}

function CurrentOrderList({currentOrders}: CurrentOrderListProps): ReactElement {

  const orderList = currentOrders.map(order => (
    <CurrentOrderListItem
      key={order.id}
      userId={order.userId}
      food={order.itemName}
      quantity={order.quantity}
      price={order.price}
    />
  ))

  return (
    <div>
      {orderList}
      {/* <CurrentOrderListItem/> */}
    </div>
  )
}

export default CurrentOrderList