import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { OrangeNavbar, OrangeButton } from '/src/client/styles/shared.tsx';
import { Button, Icon, Form } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '/src/client/state/hooks.ts'
import useForm from '../loginSignUpPage/formValidation.js';
import validate from './paymentValidationRules.js';

const NewPaymentContainer = styled.div`
  margin: 10%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddPaymentHeader = styled.h2`
  margin-bottom: 10px;
`;

export default function NewPaymentPage() {
  // const [newCCType, setNewCCType] = useState('');
  // const [newCCNumber, setNewCCNumber] = useState(0);
  // const [newCCExpiry, setNewCCExpiry] = useState('');
  // const [newCCV, setNewCCV] = useState(0);
  // const [cardholderName, setCardholderName] = useState('');
  // const [zipCode, setZipCode] = useState(0);

  const userInfo = useAppSelector((state) => state.currentUser);
  const userId = userInfo.id;

  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  const addPayment = () => {
    console.log('added payment!')
  }

  const { values, handleChange, errors, handleSubmit } = useForm(addPayment, validate);

  return (
    <div>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={goBack} />
      <NewPaymentContainer>
        <AddPaymentHeader>Add a New Credit Card</AddPaymentHeader>
        <Form.Field>
          <Form.Label>Cardholder Name:</Form.Label>
          <Form.Control>
            <Form.Input
              name="cardholderName"
              placeholder="Name"
              className={`input ${errors.cardholderName && "is-danger"}`}
              onChange={handleChange}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Card Details:</Form.Label>
          <Form.Control>
            <Form.Input
              name="newCCNumber"
              placeholder="Credit Card Number"
            />
            <Icon align="left" size="small">
              <i className="fas fa-credit-card" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Type:</Form.Label>
          <Form.Select>
            <option>-</option>
            <option>Visa</option>
            <option>MasterCard</option>
            <option>Discover</option>
            <option>American Express</option>
          </Form.Select>
        </Form.Field>
        <Form.Field>
          <Form.Label>Expiry Date:</Form.Label>
          <Form.Control>
            <Form.Input
              name="newCCExpiry"
              placeholder="MM/YY"
            />
          </Form.Control>
          <Form.Label>CCV:</Form.Label>
          <Form.Control>
            <Form.Input />
            <Icon align="right" size="small">
              <i className="fas fa-question-circle" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Form.Field kind="group" >
          <Form.Label>Billing Zip:</Form.Label>
          <Form.Control>
            <Form.Input
              name="zipCode"
              placeholder="Zip Code"
            />
          </Form.Control>
        </Form.Field>
        <OrangeButton onClick={handleSubmit}>Add Payment Method</OrangeButton>
      </NewPaymentContainer>
    </div>
  )
}