import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HistoryListItem from './HistoryListItem';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HistoryList = (props) => {
  const { name, orderList } = props;

  return (
    <List>
      {orderList.map((order) => <HistoryListItem type={name} order={order} key={order.id} />)}
    </List>
  );
};

export default HistoryList;
