import { createReducer, createAction } from '@reduxjs/toolkit'

export const addEmail = createAction('Add_GuestEmail');
export const removeEmail = createAction('Remove_Email');

let initialState= {
  emails : []
};

export const emailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEmail, (state, action) => {
      state.emails.push(action.payload)
    })
    .addCase(removeEmail, (state, action) => {
      state.emails = state.emails.filter(email => email !== action.payload)
    })
})