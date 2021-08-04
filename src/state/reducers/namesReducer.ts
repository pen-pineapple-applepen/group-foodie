import { createReducer, createAction } from '@reduxjs/toolkit'

export const addName = createAction<string>('ADD_NAME');

const initialState: string[] = [];

export const namesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addName, (state, action) => {
      state.push(action.payload);
    });
});
