import React, { useState } from 'react';
import { Button, Icon, Form } from 'react-bulma-components';
import styled from 'styled-components'
import { OrangeButton } from '/src/client/styles/shared.tsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { OrangeNavbar } from '../../styles/shared';

export default function MainLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  }

  const history = useHistory();

  function handleHomeClick() {
    history.push("/SignUp");
  }

  return (
    <div className="login-signup-background">
      < OrangeNavbar />
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
          <OrangeButton onClick={handleHomeClick}>Sign Up</OrangeButton>
        </div>
      </div>
    </div>
  )
};