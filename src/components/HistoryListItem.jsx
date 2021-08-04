import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const OrderPic = styled.img.attrs((props) => ({
  src: props.restaurant === 1 ? '/American_Thumb.png' : '/Asian_Thumb.png',
  alt: 'Restaurant picture'
}))`
  margin-right: 20px;
  height: 70px;
  width: 70px;
`;

const OrderDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  width: 100%;
`;

const OrderLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleLine = styled(OrderLine)`
  margin: 10px 0;
`;

const RestaurantName = styled.h3`
  font-weight: 600;
`;

const CountText = styled.span`
  margin-right: 20px;
`;

const StatusDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${(props) => props.status === 'Live' ? '#00FF78' : '#919191'};
`;


// helpers
const formatDate = (dateStr) => {
  const dateInput = new Date(dateStr + 'Z');

  let day = dateInput.getDate();
  let month = dateInput.getMonth() + 1;
  const year = dateInput.getFullYear();
  const hour = dateInput.getHours();
  let displayHour;
  let min = dateInput.getMinutes();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (hour === 0) {
    displayHour = '12';
  } else if (hour > 12 && hour < 24) {
    displayHour = hour - 12;
  } else {
    displayHour = hour;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  return `${month}/${day}/${year} ${displayHour}:${min} ${hour < 12 ? 'AM' : 'PM'}`;
};


const HistoryListItem = (props) => {
  const { type, order } = props;
  const { group_id, restaurant_id, date, price, peopleCount } = order;

  return (
    <ListItem>
      <OrderPic restaurant={restaurant_id} />
      <OrderDescription>
        <RestaurantName>{restaurant_id === 1 ? 'Melody Bar & Grill' : 'Asian Street Eats by Chef Hung'}</RestaurantName>
      <MiddleLine>
        <span>{formatDate(date)}</span>
        <span>{`$${(Math.round(price * 100) / 100).toFixed(2)}`}</span>
      </MiddleLine>
      <OrderLine>
        <CountText>{peopleCount === 1 ? '1 person' : `${peopleCount} people`}</CountText>
        <StatusDiv>
          {type !== 'Complete' && (
            <StatusIndicator status={type}/>
          )}
          <span>{type}</span>
        </StatusDiv>
      </OrderLine>
      </OrderDescription>
    </ListItem>
  );
};

export default HistoryListItem;
