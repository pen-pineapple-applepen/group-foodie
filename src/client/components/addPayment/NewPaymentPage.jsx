import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '/src/client/state/hooks';
import allActions from '/src/client/state/actions/allActions';
import { OrangeNavbar, OrangeButton } from '/src/client/styles/shared.tsx';
import { Button, Icon, Form } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import useForm from '../loginSignUpPage/formValidation.js';
import validate from './paymentValidationRules.js';
// import CreditCardInput from 'react-credit-card-input';

const NewPaymentContainer = styled.div`
  margin: 10%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddPaymentHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function NewPaymentPage() {
  const [newCCType, setNewCCType] = useState('');
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.currentUser);
  const userId = userInfo.id;

  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  const selectCardType = (e) => {
    setNewCCType(e.target.value)
  };

  const addPayment = () => {
    axios.post(`/api/payments/addPayment`, {params: {
      name: values.cardholderName,
      card_number: Number(values.newCCNumber),
      card_type: newCCType,
      exp_date: values.newCCExpiry,
      cvv: Number(values.newCVV),
      zip_code: Number(values.zipCode),
      user_id: userId
    }})
      .then(res => {
        console.log('successfully added payment!');
        // dispatch(allActions.createPaymentsList(formattedCards))
        // history.goBack();
      })
      .catch(err => {
        console.log(err);
      })
  }


  const { values, handleChange, errors, handleSubmit } = useForm(addPayment, validate);

  return (
    <div>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={goBack} />
      <NewPaymentContainer>
        <AddPaymentHeader>Add a New Credit Card</AddPaymentHeader>
        <Form.Field>
          <Form.Label>Cardholder Name:</Form.Label>
          <Form.Control>
            <Form.Input
              name="cardholderName"
              placeholder="Name"
              className={`input ${errors.cardholderName && "is-danger"}`}
              onChange={handleChange}
            />
            {errors.cardholderName && (
              <Form.Help className="help is-danger">{errors.cardholderName}</Form.Help>
            )}
          </Form.Control>
          <Form.Label>Card Number:</Form.Label>
          <Form.Control>
            <Form.Input
              name="newCCNumber"
              placeholder="Credit Card Number"
              className={`input ${errors.newCCNumber && "is-danger"}`}
              onChange={handleChange}
            />
            <Icon align="left" size="small">
              <i className="fas fa-credit-card" />
            </Icon>
            {errors.newCCNumber && (
              <Form.Help className="help is-danger">{errors.newCCNumber}</Form.Help>
            )}
          </Form.Control>
          <Form.Label>Type:</Form.Label>
          <Form.Select onChange={selectCardType}>
            <option>-</option>
            <option>Visa</option>
            <option>MasterCard</option>
            <option>Discover</option>
            <option>American Express</option>
          </Form.Select>
          <Form.Label>Expiry Date:</Form.Label>
          <Form.Control>
            <Form.Input
              name="newCCExpiry"
              placeholder="MM/YY"
              className={`input ${errors.newCCExpiry && "is-danger"}`}
              onChange={handleChange}
            />
            {errors.newCCExpiry && (
              <Form.Help className="help is-danger">{errors.newCCExpiry}</Form.Help>
            )}
          </Form.Control>
          <Form.Label>CVV:</Form.Label>
          <Form.Control>
            <Form.Input
              name="newCVV"
              placeholder="CVV"
              className={`input ${errors.newCVV && "is-danger"}`}
              onChange={handleChange}
            />
            {errors.newCCV && (
              <Form.Help className="help is-danger">{errors.newCVV}</Form.Help>
            )}
            <Icon align="right" size="small">
              <i className="fas fa-question-circle" />
            </Icon>
          </Form.Control>
            <Form.Label>Billing Zip:</Form.Label>
          <Form.Control>
          {/* <CreditCardInput
            cardNumberInputProps={{onChange: handleChange}}
            fieldStyle = {{size: "large", border: "0.5px solid"}}
          /> */}
            <Form.Input
              name="zipCode"
              placeholder="Zip Code"
              className={`input ${errors.zipCode && "is-danger"}`}
              onChange={handleChange}
            />
            {errors.zipCode && (
              <Form.Help className="help is-danger">{errors.zipCode}</Form.Help>
            )}
          </Form.Control>
        </Form.Field>
        <OrangeButton onClick={handleSubmit}>Add Payment Method</OrangeButton>
      </NewPaymentContainer>
    </div>
  )
}