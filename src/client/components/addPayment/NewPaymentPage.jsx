import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {OrangeNavbar, OrangeButton} from '/src/client/styles/shared.tsx';
import {Button, Icon, Form} from 'react-bulma-components';
import { useHistory } from 'react-router-dom';

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

export default function NewPaymentPage () {
  const [newCCType, setNewCCType] = useState('');
  const [newCCNumber, setNewCCNumber] = useState(0);
  const [newCCExpiry, setNewCCExpiry] = useState('');
  const [newCCV, setNewCCV] = useState(0);
  const [cardName, setCardName] = useState('');
  const [zipCode, setZipCode] = useState(0);

  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  // const handleAddPayment () => {
  //   axios.post('/api/payments/')
  // }


  return (
    <div>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={goBack}/>
      <NewPaymentContainer>
        <AddPaymentHeader>Add a new credit card</AddPaymentHeader>
        <Form.Field className="is-small">
          <Form.Label>Cardholder Name:</Form.Label>
          <Form.Control>
            <Form.Input/>
          </Form.Control>
        </Form.Field>
        <Form.Field kind="group">
          <Form.Label>Card Number:</Form.Label>
          <Form.Control>
            <Form.Input/>
            <Icon align="left" size="small">
              <i className="fas fa-credit-card"/>
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
            <Form.Input/>
          </Form.Control>
          <Form.Label>CCV:</Form.Label>
          <Form.Control>
            <Form.Input/>
            <Icon align="right" size="small">
              <i className="fas fa-question-circle"/>
            </Icon>
          </Form.Control>
        </Form.Field>
        <Form.Field kind="group" >
          <Form.Label>Billing Zip:</Form.Label>
          <Form.Control>
            <Form.Input/>
          </Form.Control>
        </Form.Field>
        <OrangeButton>Add Payment Method</OrangeButton>
      </NewPaymentContainer>
    </div>
  )
}