import { createReducer, createAction, ActionCreator } from '@reduxjs/toolkit';

export const addName = createAction('ADD_NAME')

const initialState = [];

export const namesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addName, (state, action) => {
      state.push(action.payload);
    })
})
