import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Icon, Form } from 'react-bulma-components';
import { useHistory } from 'react-router-dom'
import { OrangeNavbar, OrangeButton, ButtonContainer, FormControlSignUp, LoginSignUpContainer, StyledFormField } from '../../styles/shared';
import validate from './validationRules.js';
import useForm from './formValidation.js';
import { motion } from 'framer-motion';

const StyledHeader = styled.h2`
font-size: 20px;
font-weight: bold;
margin-bottom: 5px;
`;

export default function SignUpPage() {
  const [username, setUsername] = useState('');

  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  }

  const goBack = () => {
    history.goBack()
  }

  const signUp = () => {
    axios.post('/api/users', {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      username: username,
      password: values.password,
      guest: false
    })
      .then(res => {
        console.log('successfully registered user');
        goBack();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const { values, handleChange, errors, handleSubmit } = useForm(signUp, validate);

  // animation stuff
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '100%',
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: '100%'
    },
  }

  return (
    <>
      <OrangeNavbar needBackArrow={true} />
      <motion.div className="login-signup-background"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <LoginSignUpContainer>
          <StyledHeader>New Account</StyledHeader>
          <StyledFormField>
            <Form.Label>First Name</Form.Label>
            <FormControlSignUp>
              <Form.Input
                name="firstName"
                className={`input ${errors.firstName && "is-danger"}`}
                placeholder="First Name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <Form.Help className="help is-danger">{errors.firstName}</Form.Help>
              )}
            </FormControlSignUp>
            <Form.Label>Last Name</Form.Label>
            <FormControlSignUp>
              <Form.Input
                name="lastName"
                className={`input ${errors.lastName && "is-danger"}`}
                placeholder="Last Name"
                onChange={handleChange} />
              {errors.lastName && (
                <Form.Help className="help is-danger">{errors.lastName}</Form.Help>
              )}
            </FormControlSignUp>
          </StyledFormField>
          <StyledFormField>
            <Form.Label>Email</Form.Label>
            <FormControlSignUp>
              <Form.Input
                name="email"
                className={`input ${errors.email && "is-danger"}`}
                placeholder="Email"
                onChange={handleChange} />
              <Icon align="left" size="small">
                <i className="fas fa-envelope" />
              </Icon>
              {errors.email && (
                <Form.Help className="help is-danger">{errors.email}</Form.Help>
              )}
            </FormControlSignUp>
            <Form.Label>Username (optional)</Form.Label>
            <FormControlSignUp>
              <Form.Input
                name='username'
                placeholder="Username"
                onChange={e => { setUsername(e.target.value) }} />
              <Icon align="left" size="small">
                <i className="fas fa-user" />
              </Icon>
            </FormControlSignUp>
            <Form.Label>Password</Form.Label>
            <FormControlSignUp>
              <Form.Input
                name="password"
                type="password"
                className={`input ${errors.password && "is-danger"}`}
                placeholder="Password"
                onChange={handleChange} />
              <Icon align="left" size="medium">
                <i className="fas fa-key" />
              </Icon>
              {errors.password && (
                <Form.Help className="help is-danger">{errors.password}</Form.Help>
              )}
            </FormControlSignUp>
          </StyledFormField>
          <ButtonContainer>
            <OrangeButton onClick={handleSubmit}>Sign Up</OrangeButton>
          </ButtonContainer>
        </LoginSignUpContainer>
      </motion.div>
    </>
  )
};