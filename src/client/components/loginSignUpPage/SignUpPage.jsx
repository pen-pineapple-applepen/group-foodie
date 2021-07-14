import React from 'react';
import { Button, Icon, Form } from 'react-bulma-components';
import styled from 'styled-components';
import { OrangeButton } from '/src/client/styles/shared.tsx';

export default function SignUpPage() {

  const StyledHeader = styled.h2`
  font-size: 20px;
`;

  return (
    <div className="login-signup-background">
      <div className="login-signup-page-container">
        <StyledHeader>New Account</StyledHeader>
        <Form.Field className="login-form">
          <Form.Label>First Name</Form.Label>
          <Form.Control>
            <Form.Input placeholder="First Name" />
          </Form.Control>
          <Form.Label>Email</Form.Label>
          <Form.Control>
            <Form.Input type="text" placeholder="Email" />
            <Icon align="left" size="small">
              <i className="fas fa-envelope" />
            </Icon>
          </Form.Control>
          <Form.Label>Email</Form.Label>
          <Form.Control>
            <Form.Input type="text" placeholder="Email" />
            <Icon align="left" size="small">
              <i className="fas fa-envelope" />
            </Icon>
          </Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input type="text" placeholder="Password" />
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