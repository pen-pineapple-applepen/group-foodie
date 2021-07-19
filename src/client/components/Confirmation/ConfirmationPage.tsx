import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ReactElement } from 'react'
import CountDownTimer from './CountDownTimer';
import CurrentOrderList from "./CurrentOrderList";
import { OrangeNavbar, HeaderImage, OrangeButton } from '../../styles/shared';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';

interface ConfirmationProps {

}

export interface Order {
  id: number,
  user_id: number,
  food: string,
  quantity: number,
  price: string,
  date: string,
  food_id: number,
  group_id: number,
  restaurant_id: number,
}

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopContainer = styled.div`
  padding-top: 22px;
  width: 90%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  line-height: 44px;
`
const ThankYouMessage = styled.h1`
  font-size: 36px;
  text-align: center;
  padding-bottom: 10px;
`
const FlexEndButton = styled(OrangeButton)`
  width: 70vw;
  color: white;
`
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
`
const CenteredP = styled.p`
  display: flex;
  justify-content: center;
`
const CopyConfirm = styled(motion.div)`
  align-self: center;
`

function Confirmation({}: ConfirmationProps): ReactElement {
  const currentOrders = useAppSelector(state => state.allOrderItems.orders)
  const currentGroupId = useAppSelector(state => state.currentGroup)
  const currentRestaurantId = useAppSelector(state => state.currentRestaurant)
  const [ copied, setCopied ] = useState(false);

  const history = useHistory();

  function copyToClipBoard() {
    navigator.clipboard.writeText(`localhost:4000/Friends/${currentGroupId}/${currentRestaurantId.id}`)
    setCopied(true);
    setTimeout(()=> setCopied(false), 2000);
  }

  return (
    <ConfirmationContainer>
      <OrangeNavbar/>
      <HeaderImage src ={currentRestaurantId === 1 ? '/Dannys_bg.png' : '/Bowl.png'}/>

      <TopContainer>
        <ThankYouMessage>
          Thank you for your order!
        </ThankYouMessage>
        <CenteredP>
          Share this link with your friends:
        </CenteredP>
        <Link
          onClick={copyToClipBoard}
        >
          localhost:4000/Friends/{currentGroupId}/{currentRestaurantId.id}
        </Link>
        <AnimatePresence>
          {copied &&
          <CopyConfirm
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: '100%' }}
            transition={{ duration: 0.2 }}
          >
            Copied to clipboard!
          </CopyConfirm>}
        </AnimatePresence>

      </TopContainer >
      <span>This order will be placed in:</span>
      <CountDownTimer/>

      <CurrentOrderList
        currentOrders={currentOrders}
      />

      <FlexEndButton onClick={() => history.push('/Chat/ChatPage')}>
        Chat
      </FlexEndButton>
    </ConfirmationContainer>
  )
}

export default Confirmation
