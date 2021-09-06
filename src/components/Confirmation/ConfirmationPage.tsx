import * as React from 'react';
import { useState, ReactElement } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import CountDownTimer from './CountDownTimer';
import CurrentOrderList from './CurrentOrderList';
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
const Link = styled.button`
  background: none;
  color: #4646c2;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  justify-content: center;
`;
const CenteredP = styled.p`
  display: flex;
  justify-content: center;
`;
const CopyConfirm = styled(motion.div)`
  align-self: center;
`;

function Confirmation(): ReactElement {
  const currentOrders = useAppSelector((state) => state.orders.allOrders);
  const currentGroupId = useAppSelector((state) => state.currentGroup);
  const currentRestaurantId = useAppSelector((state) => state.currentRestaurant);
  const [copied, setCopied] = useState(false);

  const history = useHistory();

  function copyToClipBoard() {
    navigator.clipboard.writeText(
      `localhost:4000/Friends/${currentGroupId}/${currentRestaurantId.id}/${currentRestaurantId.name}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.8,
        type: 'tween',
      },
    },
  };

  return (
    <>
      <OrangeNavbar />
      <ConfirmationContainer initial="initial" animate="in" exit="out" variants={pageVariants}>
        <HeaderImage src={currentRestaurantId.id === 1 ? '/Dannys_bg.png' : '/Bowl.png'} />

        <TopContainer>
          <ThankYouMessage>Thank you for your order!</ThankYouMessage>
          <CenteredP>Share this link with your friends:</CenteredP>
          <Link onClick={copyToClipBoard}>
            localhost:4000/Friends/{currentGroupId}/{currentRestaurantId.id}/
            {currentRestaurantId.name}
          </Link>
          <AnimatePresence>
            {copied && (
              <CopyConfirm
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: '100%' }}
                transition={{ duration: 0.2 }}
              >
                Copied to clipboard!
              </CopyConfirm>
            )}
          </AnimatePresence>
        </TopContainer>

        <span>This order will be placed in:</span>
        <CountDownTimer />

        <CurrentOrderList currentOrders={currentOrders} />

        <FlexEndButton onClick={() => history.push('/Chat/ChatPage')}>Chat</FlexEndButton>
      </ConfirmationContainer>
    </>
  );
}

export default Confirmation;
