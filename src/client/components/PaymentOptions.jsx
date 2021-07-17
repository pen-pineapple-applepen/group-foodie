import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { useHistory } from 'react-router-dom';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import { Heading } from 'react-bulma-components';
import {OrangeButton} from '../styles/shared.tsx';


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const PaymentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  margin-bottom: 20px;
`;
const Card = styled.div`
  margin-left: 10px;
`;
const CheckoutButton = styled(OrangeButton)`
  margin-top: 200px;
`;
const Checkmark = styled.div`
  margin-left: 50px;
`;

const SelectedPayment = styled.div`
  font-weight: bold;
  font-style: italic;
`;

const SelectedCard = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-style: italic;
`;




const PaymentOptions = (props) => {
  let currentPayments = useAppSelector(state => state.currentPayments.paymentsList);
  const dispatch = useAppDispatch();

  const handlePaymentClick = (event) => {
    dispatch(allActions.changeSelectedPayment(Number(event.target.id)));
  }

  return (
    <MainContainer>
      <Heading size={3}>
        Payment Options
      </Heading>
      <Heading size={5}>
        Payment Method
      </Heading>
      <PaymentsContainer>
      {currentPayments.map((payment, index) => payment.selected === true ? (
        <PaymentContainer key={index} id={payment.id} onClick={handlePaymentClick}>
          <SelectedPayment id={payment.id}>{payment.cardNumber}</SelectedPayment>
          <SelectedCard id={payment.id}>{payment.cardType}</SelectedCard>
        </PaymentContainer> ) : (
          <PaymentContainer key={index} id={payment.id} onClick={handlePaymentClick}>
            <div id={payment.id} >{payment.cardNumber}</div>
            <Card id={payment.id}>{payment.cardType}</Card>
          </PaymentContainer>
        )
      )}
      </PaymentsContainer>
      <Heading size={5}>
        Add Payment Method
      </Heading>
      <CheckoutButton>
        Confirm Payment
      </CheckoutButton>
    </MainContainer>
  )
}

export default PaymentOptions;