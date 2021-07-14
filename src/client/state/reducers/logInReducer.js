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
      //axios.get here? OR axios.get outside and whatever the result then put into function and then action.payload would become this
    });
    .addCase(logOut, (state, action) => {
      state.loggedIn = false
    })
})