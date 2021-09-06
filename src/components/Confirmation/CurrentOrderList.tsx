import * as React from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';
import CurrentOrderListItem from './CurrentOrderListItem';
import { Order } from './ConfirmationPage';

interface CurrentOrderListProps {
  currentOrders: Order[];
}

const OrderListContainer = styled.div`
  padding-top: 25px;
  overflow: scroll;
  overflow-y: scroll;
  max-height: 300px;
  box-shadow: 4px 4px 8px rgb(0 0 0 / 10%);
`;

function CurrentOrderList({ currentOrders }: CurrentOrderListProps): ReactElement {
  const orderList = currentOrders.map((order, idx) => (
    <CurrentOrderListItem
      key={idx}
      userId={order.user_id}
      food={order.food}
      quantity={order.quantity}
      price={order.price}
    />
  ));

  return <OrderListContainer>{orderList}</OrderListContainer>;
}

export default CurrentOrderList;
