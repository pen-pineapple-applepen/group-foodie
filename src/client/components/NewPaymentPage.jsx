import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {OrangeNavbar} from '../styles/shared.tsx';
import {Button, Icon, Form} from 'react-bulma-components';
import { useHistory } from 'react-router-dom';

export default function NewPaymentPage () {
  const [newCCType, setNewCCType] = useState('');
  const [newCCNumber, setNewCCNumber] = useState('');
  const [newCCExpiry, setNewCCExpiry] = useState('');
  const [newCCV, setNewCCV] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');

  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={goBack}/>
      <Form.Field kind="group">
        <Form.Label>First Name:</Form.Label>
        <Form.Control>
          <Form.Input/>
        </Form.Control>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control>
          <Form.Input/>
        </Form.Control>
      </Form.Field>
      <Form.Field >
        <Form.Label>Card Number:</Form.Label>
        <Form.Control>
          <Form.Input/>
          <Icon align="left" size="small">
            <i className="fas fa-credit-card"/>
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field kind="group">
        <Form.Label>Expiry Date:</Form.Label>
        <Form.Control>
          <Form.Input/>
        </Form.Control>
        <Form.Label>CCV:</Form.Label>
        <Form.Control>
          <Form.Input/>
        </Form.Control>
      </Form.Field>
      <Form.Field >
        <Form.Label>Billing Zip:</Form.Label>
        <Form.Control>
          <Form.Input/>
        </Form.Control>
      </Form.Field>
    </div>
  )
}