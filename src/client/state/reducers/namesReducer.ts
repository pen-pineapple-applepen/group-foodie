import { createReducer, createAction } from '@reduxjs/toolkit'

export const addName = createAction<string>('ADD_NAME');
export const addEmail = createAction<string>('ADD_EMAIL');

const initialState: string[] = [];

export const namesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addName, (state, action) => {
      state.push(action.payload);
    });
});
