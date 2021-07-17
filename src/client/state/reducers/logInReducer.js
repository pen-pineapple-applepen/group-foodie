import { createReducer, createAction } from '@reduxjs/toolkit';

export const logIn = createAction('LOG_IN');
export const logOut = createAction('LOG_OUT');
export const setCurrentUserId = createAction('SET_CURRENT_USER_ID');

// logIn will only store the UserId in state!

let initialState = {
  loggedIn: false,
  userId: 0,
};

export const loginReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(logIn, (state, action) => {
      state.loggedIn = true;
      state.userId = action.payload;
    })
    .addCase(logOut, (state, action) => {
      state.loggedIn = false;
      state.userId = 0;
    })
    .addCase(setCurrentUserId, (state, action) => {
      state.userId = action.payload;
    })
})