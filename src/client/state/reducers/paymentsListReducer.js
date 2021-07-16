import { createReducer, createAction } from '@reduxjs/toolkit';

export const createPayments = createAction('CREATE_PAYMENTS');
export const addPayment = createAction('ADD_PAYMENTS');
export const removePayment = createAction('REMOVE_PAYMENT');

// logIn will only store the UserId in state!

let initialState = {
  paymentsList: []
};

export const paymentsListReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(createPayments, (state, action) => {
      state.paymentsList = action.payload
    })
    .addCase(addPayment, (state, action) => {
      state.paymentsList = [...state.paymentsList, action.payload]
    })
    .addCase(removePayment, (state, action) => {
      state.paymentsList = state.paymentsList.filter(payment => (
        payment.id !== action.payload
      ))
    })
})