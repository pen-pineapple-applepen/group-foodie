import { createReducer, createAction } from '@reduxjs/toolkit';

export const updateCurrentGroup = createAction<number>('UPDATE_CURRENT_GROUP');

type GroupState = number | null

let initialState = <GroupState>null;

export const groupReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(updateCurrentGroup, (state, action) => {
      return action.payload;
    });
})