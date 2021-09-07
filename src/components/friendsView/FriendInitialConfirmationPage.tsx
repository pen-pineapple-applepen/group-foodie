import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import CountDownTimer from '../Confirmation/CountDownTimer';
import CurrentOrderList from '../Confirmation/CurrentOrderList';
import { OrangeNavbar, HeaderImage, OrangeButton } from '../../styles/shared';

const ConfirmationContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainer = styled.div`
  padding-top: 22px;
  width: 90%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  line-height: 44px;
`;
const ThankYouMessage = styled.h1`
  font-size: 36px;
  text-align: center;
  padding-bottom: 10px;
`;
const FlexEndButton = styled(OrangeButton)`
  width: 70vw;
  color: white;
`;
const WhatYourFriendsOrdered = styled.h3`
  font-size: 13px;
  top: 15px;
  padding-bottom: -15px;
  font-style: italic;
`;

function FriendInitialConfirmation(): ReactElement {
  const currentOrders = useAppSelector((state) => state.orders.allOrders);
  const [currentGroupOrders, setCurrentGroupOrders] = useState([]);
  const currentGroupId = useAppSelector((state) => state.currentGroup);

  const currentRestaurant = useAppSelector((state) => state.currentRestaurant);

  const history = useHistory();

  const handleStartOrder = () => {
    history.push('/Menu/Friends');
  };

  useEffect(async () => {
    const currentOrdersData = await axios.get(`/api/orders?group_id=${currentGroupId}`);
    setCurrentGroupOrders(currentOrdersData.data);
    console.log(currentOrdersData.data);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      // scaleY: 0
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeIn',
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.1,
        type: 'tween',
      },
    },
  };

  return (
    <>
      <OrangeNavbar />
      <HeaderImage src={currentRestaurant.id === 1 ? '/Dannys_bg.png' : '/Bowl.png'} />
      <ConfirmationContainer initial="initial" animate="in" exit="out" variants={pageVariants}>
        <TopContainer>
          <ThankYouMessage>Share Order for {currentRestaurant.name}</ThankYouMessage>
        </TopContainer>
        <span>Time left to put in your order:</span>
        <CountDownTimer />

        <WhatYourFriendsOrdered>what your friends have ordered so far:</WhatYourFriendsOrdered>

        <CurrentOrderList currentOrders={currentGroupOrders} />

        <FlexEndButton onClick={() => history.push('/Chat/ChatPage')}>Chat</FlexEndButton>

        <FlexEndButton onClick={handleStartOrder}>Start Your Order</FlexEndButton>
      </ConfirmationContainer>
    </>
  );
}

export default FriendInitialConfirmation;
