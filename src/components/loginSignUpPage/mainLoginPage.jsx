import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import allActions from '../../state/actions/allActions.js';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Button, Icon, Form } from 'react-bulma-components';
import { OrangeButton, OrangeNavbar, FormControlLogin, LoginSignUpContainer, ButtonContainer } from '../../styles/shared';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    axios.get('/api/users/login', { params: { email: email, password: password } })
      .then(res => {
        if (res.data.hasCorrectCredentials === true) {
          axios.get(`/api/users/${res.data.id}`)
            .then((results) => {
              dispatch(allActions.setCurrentUser(results.data))
              dispatch(allActions.logIn());
            })
            .catch((err) => {
              console.log(err);
            })
          history.push("/LandingPage");

        } else if (res.data.hasCorrectCredentials === false) {
          alert('Incorrect username or password');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  // animation stuff
  const pageVariants = {
    initial: {
      opacity: 0.5,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'tween',
      }
    },
    out: {
      opacity: 0.5,
      transition: {
        duration: 0.2,
      }
    },
  }

  return (
    <>
      <OrangeNavbar hasBurger={false} />
      <motion.div className="login-signup-background"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <LoginSignUpContainer>
          <Form.Field className="login-form">
            <Form.Label>Email</Form.Label>
            <FormControlLogin>
              <Form.Input
                placeholder="Email"
                onChange={e => { setEmail(e.target.value) }}
              />
              <Icon align="left" size="small">
                <i className="fas fa-envelope" />
              </Icon>
            </FormControlLogin>
            <Form.Label>Password</Form.Label>
            <FormControlLogin>
              <Form.Input
                type="password"
                placeholder="Password"
                onChange={e => { setPassword(e.target.value) }}
              />
              <Icon align="left" size="medium">
                <i className="fas fa-key" />
              </Icon>
            </FormControlLogin>
          </Form.Field>
          <ButtonContainer>
            <OrangeButton onClick={handleLogin}>Login</OrangeButton>
            <OrangeButton onClick={handleHomeClick}>Sign Up</OrangeButton>
          </ButtonContainer>
        </LoginSignUpContainer>
      </motion.div>
    </>
  )
};