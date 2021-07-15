import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
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
  width: 75%;
  border-bottom: 1px solid #2d2d2d;
  margin: 30px 0;
`;

// HELPER FUNCTION
const findStatus = (orderObj, dueDate) => {
  let status;
  const currentTime = new Date();

  if (dueDate < currentTime) {
    status = 'Complete';
  } else if (currentTime > orderObj.date && currentTime < dueDate) {
    status = 'Live';
  } else {
    status = 'Scheduled';
  }

  return status;
};


const OrderHistory = (props) => {
  const currentUser = useAppSelector((state) => state.currentUser);

  const [liveOrders, setLiveOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);

  useEffect(() => {
    // FAKE DATA
    const fakeDueDateLive = new Date(2021, 6, 14, 23); // 7/14/2021 11PM
    const fakeDueDateSched = new Date(2021, 6, 16, 16); // 7/16/2021 4PM
    const fakeDueDateComplete = new Date(2021, 6, 13, 16); // 7/13/2021 4PM

    const fakeDueDates = [fakeDueDateLive, fakeDueDateSched, fakeDueDateComplete];

    const fakeLiveDate = new Date(2021, 6, 14, 22); // 7/14/2021 10PM
    const fakeScheduledDate = new Date(2021, 6, 16, 15); // 7/16/2021 3PM
    const fakeCompleteDate = new Date(2021, 6, 13, 15); // 7/13/2021 3PM

    const fakeLiveOrder = {
      "id": 3,
      "user_id": 5,
      "food": "PIZZA",
      "quantity": 3,
      "price": "3.50",
      "date": fakeLiveDate,
      "food_id": 423,
      "group_id": 1,
      "restaurant_id": 32
    };

    const fakeScheduledOrder = {
      "id": 2,
      "user_id": 5,
      "food": "RAMEN",
      "quantity": 1,
      "price": "10.50",
      "date": fakeScheduledDate,
      "food_id": 426,
      "group_id": 1,
      "restaurant_id": 32
    };

    const fakeCompleteOrder = {
      "id": 1,
      "user_id": 5,
      "food": "WINGS",
      "quantity": 12,
      "price": "33.70",
      "date": fakeCompleteDate,
      "food_id": 400,
      "group_id": 1,
      "restaurant_id": 32
    };

    const fakeOrders = [fakeLiveOrder, fakeScheduledOrder, fakeCompleteOrder];
    // get request to find all orders for the current user (get user id from state)

    const liveArr = [];
    const scheduledArr = [];
    const completeArr = [];

    fakeOrders.forEach((order, index) => {
      // get request for the group using the orderObj's group_id
      // due_date would come from group data
      const status = findStatus(order, fakeDueDates[index]);

      if (status === 'Live') {
        liveArr.push(order);
      } else if (status === 'Scheduled') {
        scheduledArr.push(order);
      } else {
        completeArr.push(order);
      }
    });

    setLiveOrders(liveArr);
    setScheduledOrders(scheduledArr);
    setCompleteOrders(completeArr);
  }, []);

  return (
    <OrderHistoryDiv>
      <OrangeNavbar needBackArrow={true} />
      <Text>Your Orders</Text>
      {liveOrders.length > 0 && (
        <HistoryList name="Live" orderList={liveOrders} />
      )}
      {(liveOrders.length > 0 && scheduledOrders.length > 0) && (
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
