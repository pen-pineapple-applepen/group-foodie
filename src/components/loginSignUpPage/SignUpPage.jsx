import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Icon, Form } from 'react-bulma-components';
import { useHistory } from 'react-router-dom'
import { OrangeNavbar, OrangeButton } from '../../styles/shared';
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
      <div className="login-signup-page-container">
        <StyledHeader>New Account</StyledHeader>
        <Form.Field className="login-form">
          <Form.Label>First Name</Form.Label>
          <Form.Control className="form-spacing-signup">
            <Form.Input
              name="firstName"
              className={`input ${errors.firstName && "is-danger"}`}
              placeholder="First Name"
              onChange={handleChange}
            />
            {errors.firstName && (
              <Form.Help className="help is-danger">{errors.firstName}</Form.Help>
            )}
          </Form.Control>
          <Form.Label>Last Name</Form.Label>
          <Form.Control className="form-spacing-signup">
            <Form.Input
              name="lastName"
              className={`input ${errors.lastName && "is-danger"}`}
              placeholder="Last Name"
              onChange={handleChange} />
            {errors.lastName && (
              <Form.Help className="help is-danger">{errors.lastName}</Form.Help>
            )}
          </Form.Control>
        </Form.Field>
        <Form.Field className="login-form">
          <Form.Label>Email</Form.Label>
          <Form.Control className="form-spacing-signup">
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
          </Form.Control>
          <Form.Label>Username (optional)</Form.Label>
          <Form.Control className="form-spacing-signup">
            <Form.Input
              name='username'
              placeholder="Username"
              onChange={e => { setUsername(e.target.value) }} />
            <Icon align="left" size="small">
              <i className="fas fa-user" />
            </Icon>
          </Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control className="form-spacing-signup">
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
          </Form.Control>
        </Form.Field>
        <div className='login-buttons'>
          <OrangeButton onClick={handleSubmit}>Sign Up</OrangeButton>
        </div>
      </div>
    </motion.div>
    </>
  )
};