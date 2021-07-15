import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Icon, Form } from 'react-bulma-components';
import { useHistory } from 'react-router-dom'
import { OrangeNavbar } from '../../styles/shared';
import { OrangeButton } from '/src/client/styles/shared.tsx';

const StyledHeader = styled.h2`
font-size: 20px;
font-weight: bold;
`;

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  }
  const goBack = () => {
    history.goBack()
  }

  const handleSignUp = () => {
    axios.post('/create', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password,
      guest: false
    })
    .then(res => {
      console.log('successfully registered user');
      goBack()
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="login-signup-background">
      < OrangeNavbar needBackArrow={true} onBackArrowClick={goBack}/>
      <div className="login-signup-page-container">
        <StyledHeader>New Account</StyledHeader>
        <Form.Field className="login-form">
          <Form.Label>First Name</Form.Label>
          <Form.Control className="form-spacing">
            <Form.Input placeholder="First Name" onChange={e => {setFirstName(e.target.value)}}/>
          </Form.Control>
          <Form.Label>Last Name</Form.Label>
          <Form.Control className="form-spacing">
            <Form.Input placeholder="Last Name" onChange={e => {setLastName(e.target.value)}}/>
          </Form.Control>
        </Form.Field>
        <Form.Field className="login-form">
          <Form.Label>Email</Form.Label>
          <Form.Control className="form-spacing">
            <Form.Input placeholder="Email" onChange={e => {setEmail(e.target.value)}}/>
            <Icon align="left" size="small">
              <i className="fas fa-envelope" />
            </Icon>
          </Form.Control>
          <Form.Label>Username</Form.Label>
          <Form.Control className="form-spacing">
            <Form.Input placeholder="Username" onChange={e => {setUsername(e.target.value)}}/>
            <Icon align="left" size="small">
              <i className="fas fa-user" />
            </Icon>
          </Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control className="form-spacing">
            <Form.Input placeholder="Password" onChange={e => {setPassword(e.target.value)}}/>
            <Icon align="left" size="medium">
              <i className="fas fa-key" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <div className='login-buttons'>
          <OrangeButton onClick={handleHomeClick}>Sign Up</OrangeButton>
        </div>
      </div>
    </div>
  )
};