import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { useHistory } from 'react-router-dom';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import { Heading } from 'react-bulma-components';
import { OrangeButton, OrangeNavbar } from '../styles/shared';
import { Button } from 'react-bulma-components'
import { Table } from 'react-bulma-components';


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
  justify-content: flex-start;
  align-items: flex-start;
`;
const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
`;
const Card = styled.div`
  margin-right: 10px;
`;
const CheckoutButton = styled(OrangeButton)`
  margin-top: 200px;
`;
const Checkmark = styled.div`
  margin-left: 50px;
`;

const SelectedPayment = styled.div`
  font-style: italic;
  margin-right: 10px;
`;

const PaymentButton = styled(Button)`
  font-weight: bold
`




const PaymentOptions = (props) => {
  let currentPayments = useAppSelector(state => state.currentPayments.paymentsList);
  const dispatch = useAppDispatch();

  const handlePaymentClick = (event) => {
    dispatch(allActions.changeSelectedPayment(Number(event.target.id)));
  }

  const history = useHistory();

  return (
    <div>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={() => {history.goBack()}} />
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
            <SelectedPayment id={payment.id}>{payment.cardNumber + '  ' + payment.cardType}</SelectedPayment>
            <img id={payment.id} className='checkbox'src={"./checkmark.png"} />
          </PaymentContainer> ) : (
            <PaymentContainer key={index} id={payment.id} onClick={handlePaymentClick}>
              <Card id={payment.id} >{payment.cardNumber + '  ' + payment.cardType}</Card>
              <img id={payment.id} className='uncheckbox'src={"./checkmark.png"} />
            </PaymentContainer>
          )
        )}
        </PaymentsContainer>
        <PaymentButton size={5} onClick={() => history.push('/NewPaymentPage')}>
          Add Payment Method
        </PaymentButton>
        <CheckoutButton onClick={() => history.goBack('/ShareOrder')}>
          Confirm Payment
        </CheckoutButton>
      </MainContainer>
    </div>
  )
}

export default PaymentOptions;