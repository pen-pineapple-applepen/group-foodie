import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import { useHistory } from 'react-router-dom';
import HistoryList from './HistoryList';

const OrderHistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  margin-top: 50px;
  margin-bottom: 40px;
`;

const ListSeparator = styled.div`
  width: 50%;
  border-bottom: 1px solid #2d2d2d;
  margin: 30px 0;
`;

// HELPER FUNCTION
const findStatus = (orderObj, due_date) => {
  let status;

  const currentTime = new Date();
  const submittedDate = new Date(orderObj.date + 'Z');
  const dueDate = new Date(due_date + 'Z');

  if (dueDate < currentTime) {
    status = 'Complete';
  } else if (currentTime > submittedDate && currentTime < dueDate) {
    status = 'Live';
  } else {
    status = 'Scheduled';
  }

  return status;
};


const OrderHistory = (props) => {
  const currentUser = useAppSelector((state) => state.currentUser);

  const [orders, setOrders] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);

  const getAllOrders = async () => {
    const allOrders = await axios.get(`/api/orders/${currentUser.id}/user`);
    setOrders(allOrders.data);
  };

  useEffect(() => {
    getAllOrders();
  }, [currentUser]);

  const groupOrders = async () => {
    const liveArr = [];
    const scheduledArr = [];
    const completeArr = [];

    await Promise.all(orders.map(async (order) => {
      const group = await axios.get(`/api/groups/${order.group_id}`);

      const status = findStatus(order, group.data[0].due_date);

      if (status === 'Live') {
        liveArr.push(order);
      } else if (status === 'Scheduled') {
        scheduledArr.push(order);
      } else {
        completeArr.push(order);
      }
    }));

    setLiveOrders(liveArr);
    setScheduledOrders(scheduledArr);
    setCompleteOrders(completeArr);
  };

  useEffect(() => {
    groupOrders();
  }, [orders]);

  return (
    <OrderHistoryDiv>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={useHistory().goBack} />
      <Text>Your Orders</Text>
      {liveOrders.length > 0 && (
        <HistoryList name="Live" orderList={liveOrders} />
      )}
      {(liveOrders.length > 0 && (scheduledOrders.length > 0 || completeOrders.length > 0)) && (
        <ListSeparator />
      )}
      {scheduledOrders.length > 0 && (
        <HistoryList name="Scheduled" orderList={scheduledOrders} />
      )}
      {(scheduledOrders.length > 0 && completeOrders.length > 0) && (
        <ListSeparator />
      )}
      {completeOrders.length > 0 && (
        <HistoryList name="Complete" orderList={completeOrders} />
      )}
    </OrderHistoryDiv>
  );
};

export default OrderHistory;
