import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HistoryListItem from './HistoryListItem';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const HistoryList = (props) => {
  const { name, orderList } = props;

  const [sortedList, setSortedList] = useState([]);

  const groupItems = () => {
    const groupedObj = {};

    orderList.forEach((order) => {
      if (!groupedObj[order.group_id]) {
        groupedObj[order.group_id] = [];
      }
      groupedObj[order.group_id].push(order);
    });

    const groupedOrders = [];

    for (const [key, value] of Object.entries(groupedObj)) {
      const groupOrder = {};
      groupOrder.group_id = groupedObj[key][0].group_id;
      groupOrder.restaurant_id = groupedObj[key][0].restaurant_id;
      groupOrder.date = groupedObj[key][0].date;
      groupOrder.price = groupedObj[key].reduce((total, currentOrder) => (total + Number(currentOrder.price)), 0);

      const peopleSet = new Set();
      groupedObj[key].forEach((order) => peopleSet.add(order.user_id));
      groupOrder.peopleCount = peopleSet.size;

      groupedOrders.push(groupOrder);
    }

    setSortedList(groupedOrders);
  };

  useEffect(() => {
    groupItems();
  }, []);

  return (
    <List>
      {sortedList.map((groupOrder) => <HistoryListItem type={name} order={groupOrder} key={groupOrder.group_id} />)}
    </List>
  );
};

export default HistoryList;
