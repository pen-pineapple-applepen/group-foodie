import { createReducer, createAction } from '@reduxjs/toolkit';

export const logIn = createAction('LOG_IN');
export const logOut = createAction('LOG_OUT');

// logIn will only store the UserId in state!

let initialState = {
  loggedIn: false,
  userId: '',
};

export const loginReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(logIn, (state, action) => {
      state.loggedIn = true,
      state.userId = action.payload
    })
    .addCase(logOut, (state, action) => {
      state.loggedIn = false,
      state.userId = action.payload
    })
})