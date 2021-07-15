import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import allActions from '/src/client/state/actions/allActions.js';
import { useAppDispatch, useAppSelector } from '/src/client/state/hooks.ts';
import { Button, Icon, Form } from 'react-bulma-components';
import { OrangeButton } from '/src/client/styles/shared.tsx';
import { useHistory } from 'react-router-dom';
import { OrangeNavbar } from '../../styles/shared';

export default function MainLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  function handleHomeClick() {
    history.push("/SignUp");
  }

  const logInStatus = useAppSelector((state) => state.loggedIn);

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    axios.get('/users/login', {email, password})
      .then (res => {
        if (res.data === true) {
          //need to get userId to put into action.payload of logIn()
          dispatch(allActions.logIn())
          history.push("/LandingPage");
        }
      })
  }


  return (
    <div className="login-signup-background">
      <div className="login-signup-page-container">
      < OrangeNavbar />
        <Form.Field className="login-form">
          <Form.Label>Email</Form.Label>
          <Form.Control className="form-spacing-login">
            <Form.Input
              placeholder="Email"
              onChange={e => {setEmail(e.target.value)}}
            />
            <Icon align="left" size="small">
              <i className="fas fa-envelope" />
            </Icon>
          </Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control className="form-spacing-login">
            <Form.Input
              type="password"
              placeholder="Password"
              onChange={e => {setPassword(e.target.value)}}
            />
            <Icon align="left" size="medium">
              <i className="fas fa-key" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <div className='login-buttons'>
          <OrangeButton onClick={handleLogin}>Login</OrangeButton>
          <OrangeButton onClick={handleHomeClick}>Sign Up</OrangeButton>
        </div>
      </div>
    </div>
  )
};