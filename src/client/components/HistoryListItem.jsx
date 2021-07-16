import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const OrderPic = styled.span`
  margin-right: 20px;
`;

const OrderDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleLine = styled(OrderLine)`
  margin: 10px 0;
`;

const CountText = styled.span`
  margin-right: 20px;
`;

const StatusDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StatusIndicator = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${(props) => props.status === 'Live' ? '#00FF78' : '#919191'};
`;


// helpers
const formatDate = (dateInput) => {
  // DD/MM/YYYY
  let day = dateInput.getDate();
  let month = dateInput.getMonth() + 1;
  const year = dateInput.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${month}/${day}/${year}`;
};


const HistoryListItem = (props) => {
  const { type, order } = props;

  return (
    <ListItem>
      <OrderPic>image</OrderPic>
      <OrderDescription>
        <h3>Restaurant name</h3>
      <MiddleLine>
        <span>{formatDate(order.date)}</span>
        <span>{`$${order.price}`}</span>
      </MiddleLine>
      <OrderLine>
        <CountText># of people</CountText>
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
