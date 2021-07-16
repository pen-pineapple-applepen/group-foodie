import { createReducer, createAction } from '@reduxjs/toolkit';

export const setCurrentUser = createAction('SET_CURRENT_USER');

const initialState = {};

export const currentUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentUser, (state, action) => {
      return action.payload;
    });
});
