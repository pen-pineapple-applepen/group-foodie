import { createReducer, createAction } from '@reduxjs/toolkit';

export const logIn = createAction('LOG_IN');
export const logOut = createAction('LOG_OUT');

let initialState = {
  loggedIn: false
};

export const loginReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(logIn, (state, action) => {
      state.loggedIn = true
    });

})