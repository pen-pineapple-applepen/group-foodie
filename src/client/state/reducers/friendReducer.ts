import { createReducer, createAction } from '@reduxjs/toolkit';

export const addFriendName = createAction<string>('ADD_FRIEND_NAME');


let initialState = ''

export const friendReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(addFriendName, (state, action) => {
      return action.payload;
    });
})