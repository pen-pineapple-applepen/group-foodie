import React, {useState} from 'react';
import { Button, Icon, Form } from 'react-bulma-components';

export default function MainLoginPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Group Foodie</h2>
      <Form.Field>
        <Form.Label>Email</Form.Label>
        <Form.Control>
          <Form.Input type="text" placeholder="Email"/>
          <Icon align="left" size="small">
            <i className="fas fa-envelope"/>
          </Icon>
        </Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input type="text" placeholder="password"/>
          <Icon align="left" size="medium">
            <i className="fas fa-key"/>
          </Icon>
        </Form.Control>
      </Form.Field>
      <Button align="center">Login</Button>
    </div>
  )
};