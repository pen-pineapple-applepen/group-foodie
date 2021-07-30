import { createReducer, createAction } from '@reduxjs/toolkit';

export const setCurrentUser = createAction('SET_CURRENT_USER');

const initialState = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  guest: false,
};

export const currentUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentUser, (state, action) => {
      return action.payload;
    });
});
