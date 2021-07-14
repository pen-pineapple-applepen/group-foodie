import React, { useState } from 'react';
import { Button, Icon, Form } from 'react-bulma-components';
import styled from 'styled-components'
import { OrangeButton } from '/src/client/styles/shared.tsx';

export default function MainLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //
  }


  return (
    <div className="login-signup-background">
      <div className="login-signup-page-container">
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
            <Form.Input placeholder="Password"onChange={e => {setPassword(e.target.value)}}/>
            <Icon align="left" size="medium">
              <i className="fas fa-key" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <div className='login-buttons'>
          <OrangeButton >Login</OrangeButton>
          <OrangeButton >Sign Up</OrangeButton>
        </div>
      </div>
    </div>
  )
};