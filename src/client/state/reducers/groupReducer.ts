import { createReducer, createAction } from '@reduxjs/toolkit';

export const updateCurrentGroup = createAction<number>('UPDATE_CURRENT_GROUP');


let initialState = 0;

export const groupReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(updateCurrentGroup, (state, action) => {
      return action.payload;
    });
})