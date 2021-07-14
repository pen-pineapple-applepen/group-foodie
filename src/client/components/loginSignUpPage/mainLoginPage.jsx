import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import allActions from '/src/client/state/actions/allActions.js';
import { useAppDispatch, useAppSelector } from '/src/client/state/hooks.ts';
import { Button, Icon, Form } from 'react-bulma-components';
import { OrangeButton } from '/src/client/styles/shared.tsx';

export default function MainLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const logInStatus = useAppSelector((state) => state.loggedIn);

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(allActions.logIn())
    // what goes into login('will be action payload')
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