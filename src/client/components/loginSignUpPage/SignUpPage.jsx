import React, { useState } from 'react';
import { Button, Icon, Form } from 'react-bulma-components';
import styled from 'styled-components';
import { OrangeButton } from '/src/client/styles/shared.tsx';
import axios from 'axios';

export default function SignUpPage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {

  }

  const StyledHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

  return (
    <div className="login-signup-background">
      <div className="login-signup-page-container">
        <StyledHeader>New Account</StyledHeader>
        <Form.Field className="login-form">
          <Form.Label>First Name</Form.Label>
          <Form.Control>
            <Form.Input placeholder="First Name" onChange={e => {setFirstName(e.target.value)}}/>
          </Form.Control>
          <Form.Label>Last Name</Form.Label>
          <Form.Control>
            <Form.Input placeholder="Last Name" onChange={e => {setLastName(e.target.value)}}/>
          </Form.Control>
        </Form.Field>
        <Form.Field className="login-form">
          <Form.Label>Email</Form.Label>
          <Form.Control>
            <Form.Input placeholder="Email" onChange={e => {setEmail(e.target.value)}}/>
            <Icon align="left" size="small">
              <i className="fas fa-envelope" />
            </Icon>
          </Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input placeholder="Password" onChange={e => {setPassword(e.target.value)}}/>
            <Icon align="left" size="medium">
              <i className="fas fa-key" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <div className='login-buttons'>
          <OrangeButton>Sign Up</OrangeButton>
        </div>
      </div>
    </div>
  )
};